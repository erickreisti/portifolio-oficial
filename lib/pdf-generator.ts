// lib/pdf-generator.ts
import {
  STATIC_SKILLS_DATA,
  calculateSkillStats,
  getTopSkills,
} from "./skills-data";
import { getFeaturedProjects } from "../lib/project-data";

// Dados da timeline para o PDF
const TIMELINE_DATA = [
  {
    year: "2024",
    title: "Tech Lead & Arquitetura Cloud",
    company: "Projetos Freelance",
    description:
      "Liderança técnica em projetos de grande escala, arquitetura microservices e implementação de soluções AWS",
    projects: ["Sistema de E-commerce", "Plataforma SaaS", "App Mobile"],
    skills: ["AWS", "Microservices", "Node.js", "React Native"],
  },
  {
    year: "2022-2023",
    title: "Desenvolvedor FullStack Sênior",
    company: "Startups & Empresas",
    description:
      "Desenvolvimento de aplicações web e mobile com foco em performance e escalabilidade",
    projects: ["Dashboard Analytics", "API REST", "PWA"],
    skills: ["Next.js", "TypeScript", "PostgreSQL", "Docker"],
  },
  {
    year: "2020-2021",
    title: "Desenvolvedor FullStack Pleno",
    company: "Agências & Clientes",
    description:
      "Implementação de sistemas completos e mentoria de desenvolvedores juniores",
    projects: ["Sites Institucionais", "E-commerce", "Sistemas Internos"],
    skills: ["React", "Node.js", "MongoDB", "Express"],
  },
];

export interface PDFOptions {
  fileName?: string;
  openInNewTab?: boolean;
  trackingEvent?: string;
  onProgress?: (progress: number) => void;
  preview?: boolean;
}

// Helper para não bloquear o thread principal
const waitForFrame = (): Promise<void> =>
  new Promise((resolve) => {
    requestAnimationFrame(() => resolve());
  });

const delay = (ms: number): Promise<void> =>
  new Promise((resolve) => setTimeout(resolve, ms));

export const generatePortfolioPDF = async (
  options: PDFOptions = {}
): Promise<{ blob: Blob; url: string } | void> => {
  const {
    fileName = "Erick-Reis-Curriculo.pdf",
    openInNewTab = false,
    trackingEvent = "portfolio_download",
    onProgress,
    preview = false,
  } = options;

  try {
    onProgress?.(10);
    await waitForFrame();

    const pdfBlob = await generateDynamicPDF(onProgress);
    const pdfUrl = URL.createObjectURL(pdfBlob);

    if (preview) {
      onProgress?.(100);
      console.log("📄 Portfolio PDF generated for preview");
      return { blob: pdfBlob, url: pdfUrl };
    }

    onProgress?.(90);
    await waitForFrame();

    onProgress?.(95);

    // Criar link e disparar download
    const link = document.createElement("a");
    link.href = pdfUrl;
    link.download = fileName;
    link.style.display = "none";

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // Cleanup
    setTimeout(() => {
      URL.revokeObjectURL(pdfUrl);
    }, 1000);

    onProgress?.(100);
    console.log("📄 Portfolio PDF downloaded successfully");

    if (trackingEvent) {
      console.log(`📊 Tracking event: ${trackingEvent}`);
    }
  } catch (error) {
    console.error("❌ Error generating portfolio PDF:", error);
    if (!preview) {
      await downloadSimplePDF(fileName);
    }
    throw error;
  }
};

const generateDynamicPDF = async (
  onProgress?: (progress: number) => void
): Promise<Blob> => {
  onProgress?.(5);

  let iframe: HTMLIFrameElement | null = null;

  try {
    onProgress?.(15);
    const pdfContent = generatePDFContent();
    await waitForFrame();

    console.log("🔄 Criando iframe isolado para PDF...");

    // Criar iframe COMPLETAMENTE ISOLADO
    iframe = document.createElement("iframe");
    iframe.style.cssText = `
      position: fixed !important;
      left: -100vw !important;
      top: -100vh !important;
      width: 210mm !important;
      height: 297mm !important;
      border: none !important;
      opacity: 0 !important;
      pointer-events: none !important;
      z-index: -9999 !important;
      visibility: hidden !important;
    `;

    document.body.appendChild(iframe);

    // Esperar o iframe carregar
    await new Promise<void>((resolve) => {
      iframe!.onload = () => resolve();
      iframe!.src = "about:blank";
    });

    // Escrever o conteúdo no iframe
    iframe.contentDocument!.open();
    iframe.contentDocument!.write(pdfContent);
    iframe.contentDocument!.close();

    onProgress?.(25);

    // Dar tempo para renderização completa
    await waitForFrame();
    await delay(800); // Mais tempo para garantir renderização

    onProgress?.(35);

    // Importar bibliotecas
    const [html2canvasModule, jsPDFModule] = await Promise.all([
      import("html2canvas"),
      import("jspdf"),
    ]);

    const html2canvas = html2canvasModule.default;
    const jsPDF = jsPDFModule.default;

    onProgress?.(45);
    await waitForFrame();

    console.log("📸 Capturando screenshot do conteúdo do iframe...");

    // Capturar screenshot do body do iframe
    const iframeBody = iframe.contentDocument!.body;
    const canvas = await html2canvas(iframeBody, {
      scale: 2,
      useCORS: true,
      logging: false,
      width: iframeBody.scrollWidth,
      height: iframeBody.scrollHeight,
      scrollX: 0,
      scrollY: 0,
      backgroundColor: "#ffffff",
      removeContainer: false,
      allowTaint: false,
      foreignObjectRendering: false,
      imageTimeout: 15000,
    });

    console.log("✅ Screenshot capturado com sucesso");
    onProgress?.(65);

    // Limpar iframe IMEDIATAMENTE após captura
    if (iframe && iframe.parentNode) {
      document.body.removeChild(iframe);
    }

    await waitForFrame();

    onProgress?.(75);

    console.log("📄 Criando PDF...");

    // Criar PDF
    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4",
      compress: true,
    });

    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();

    // Converter canvas para imagem
    const imgData = canvas.toDataURL("image/jpeg", 0.9);
    const imgWidth = pdfWidth;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    console.log(
      `📏 Dimensões: PDF=${pdfWidth}x${pdfHeight}mm, Imagem=${imgWidth}x${imgHeight}mm`
    );

    let position = 0;
    let heightLeft = imgHeight;

    // Adicionar primeira página
    pdf.addImage(imgData, "JPEG", 0, position, imgWidth, imgHeight);
    heightLeft -= pdfHeight;

    onProgress?.(85);

    // Adicionar páginas adicionais se necessário
    let pageCount = 1;
    while (heightLeft > 0) {
      await waitForFrame();

      position = heightLeft - imgHeight;
      pdf.addPage();
      pdf.addImage(imgData, "JPEG", 0, position, imgWidth, imgHeight);
      heightLeft -= pdfHeight;
      pageCount++;
    }

    console.log(`📑 PDF criado com ${pageCount} páginas`);

    // Gerar blob do PDF
    const pdfBlob = pdf.output("blob");
    console.log("✅ PDF gerado com sucesso:", pdfBlob.size, "bytes");

    return pdfBlob;
  } catch (error) {
    console.error("❌ Erro na geração do PDF:", error);
    // Limpar iframe em caso de erro
    if (iframe && iframe.parentNode) {
      document.body.removeChild(iframe);
    }
    throw error;
  }
};

export const generatePDFForPreview = async (
  onProgress?: (progress: number) => void
): Promise<{ blob: Blob; url: string }> => {
  const pdfBlob = await generateDynamicPDF(onProgress);
  const pdfUrl = URL.createObjectURL(pdfBlob);
  return { blob: pdfBlob, url: pdfUrl };
};

const generatePDFContent = (): string => {
  const currentDate = new Date().toLocaleDateString("pt-BR");
  const stats = calculateSkillStats();
  const featuredProjects = getFeaturedProjects().slice(0, 3);

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <title>Érick Reis - FullStack Developer & Tech Leader</title>
      <style>
        * { 
          margin: 0; 
          padding: 0; 
          box-sizing: border-box; 
        }
        
        body { 
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          line-height: 1.5; 
          color: #1a202c; 
          background: #ffffff;
          font-size: 12px;
          padding: 0;
          width: 210mm;
          margin: 0;
          overflow: hidden;
        }
        
        .container {
          width: 210mm;
          padding: 0;
          margin: 0;
        }
        
        /* Header */
        .header { 
          text-align: center; 
          border-bottom: 3px solid #06b6d4; 
          padding: 20px 0 15px 0;
          margin-bottom: 20px;
          background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
          border-radius: 8px;
        }
        
        .name { 
          font-size: 28px; 
          font-weight: 800; 
          color: #06b6d4; 
          margin: 8px 0 4px 0;
          letter-spacing: -0.5px;
        }
        
        .title { 
          font-size: 16px; 
          color: #4a5568; 
          font-weight: 600;
          margin-bottom: 8px;
        }
        
        .contact-info { 
          display: flex; 
          justify-content: center; 
          gap: 15px; 
          margin: 10px 0; 
          flex-wrap: wrap;
          font-size: 11px;
        }
        
        .contact-item {
          display: flex;
          align-items: center;
          gap: 6px;
          color: #4a5568;
        }
        
        /* Sections */
        .section { 
          margin: 18px 0; 
          padding: 16px;
          background: #f8fafc;
          border-radius: 8px;
          border-left: 3px solid #06b6d4;
        }
        
        .section-title { 
          font-size: 18px; 
          color: #06b6d4; 
          border-bottom: 2px solid #06b6d4; 
          padding-bottom: 6px; 
          margin-bottom: 12px;
          font-weight: 700;
        }
        
        /* Skills */
        .skill-grid { 
          display: grid; 
          grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); 
          gap: 10px; 
          margin: 12px 0;
        }
        
        .skill-item { 
          background: #ffffff; 
          padding: 10px; 
          border-radius: 6px; 
          border-left: 3px solid #06b6d4;
          box-shadow: 0 1px 3px rgba(0,0,0,0.1);
        }
        
        .skill-name {
          font-weight: 600;
          color: #2d3748;
          margin-bottom: 4px;
          font-size: 12px;
        }
        
        .skill-level {
          background: #e2e8f0;
          height: 6px;
          border-radius: 3px;
          overflow: hidden;
          margin: 4px 0;
        }
        
        .skill-level-bar {
          height: 100%;
          background: linear-gradient(90deg, #06b6d4, #3b82f6);
          border-radius: 3px;
        }
        
        .skill-description {
          font-size: 10px;
          color: #718096;
          font-style: italic;
          margin-top: 4px;
        }
        
        /* Projects */
        .project { 
          margin: 12px 0; 
          padding: 12px; 
          background: #ffffff; 
          border-radius: 6px;
          box-shadow: 0 1px 4px rgba(0,0,0,0.1);
          border: 1px solid #e2e8f0;
        }
        
        .project-title {
          font-size: 14px;
          font-weight: 700;
          color: #2d3748;
          margin-bottom: 4px;
        }
        
        .project-description {
          color: #4a5568;
          margin-bottom: 8px;
          line-height: 1.4;
          font-size: 11px;
        }
        
        .project-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 4px;
          margin-top: 6px;
        }
        
        .tag {
          background: #06b6d4;
          color: white;
          padding: 2px 6px;
          border-radius: 8px;
          font-size: 9px;
          font-weight: 500;
        }
        
        /* Stats */
        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
          gap: 10px;
          margin: 12px 0;
        }
        
        .stat-item {
          text-align: center;
          padding: 10px;
          background: white;
          border-radius: 6px;
          box-shadow: 0 1px 3px rgba(0,0,0,0.1);
        }
        
        .stat-number {
          font-size: 18px;
          font-weight: 700;
          color: #06b6d4;
          margin-bottom: 2px;
        }
        
        .stat-label {
          font-size: 10px;
          color: #718096;
          font-weight: 500;
        }
        
        /* Timeline */
        .timeline {
          margin: 15px 0;
        }
        
        .timeline-item {
          margin: 10px 0;
          padding: 12px;
          background: white;
          border-radius: 6px;
          border-left: 3px solid #06b6d4;
          box-shadow: 0 1px 3px rgba(0,0,0,0.1);
        }
        
        .timeline-year {
          font-weight: 700;
          color: #06b6d4;
          font-size: 12px;
          margin-bottom: 4px;
        }
        
        .timeline-title {
          font-weight: 600;
          color: #2d3748;
          font-size: 12px;
          margin-bottom: 2px;
        }
        
        .timeline-company {
          color: #4a5568;
          font-size: 10px;
          margin-bottom: 4px;
          font-style: italic;
        }
        
        .timeline-description {
          color: #4a5568;
          font-size: 10px;
          margin-bottom: 6px;
          line-height: 1.4;
        }
        
        .timeline-skills {
          display: flex;
          flex-wrap: wrap;
          gap: 4px;
          margin-top: 6px;
        }
        
        .timeline-skill {
          background: #e2e8f0;
          color: #4a5568;
          padding: 2px 6px;
          border-radius: 8px;
          font-size: 9px;
        }
        
        /* Footer */
        .footer { 
          text-align: center; 
          margin-top: 25px; 
          padding-top: 12px; 
          border-top: 1px solid #e2e8f0; 
          color: #718096; 
          font-size: 10px;
        }
        
        /* Text spacing */
        p {
          margin-bottom: 8px;
        }
        
        .mb-2 { margin-bottom: 8px; }
        .mb-3 { margin-bottom: 12px; }
        .mb-4 { margin-bottom: 16px; }
        .mt-2 { margin-top: 8px; }
        .mt-3 { margin-top: 12px; }
        
        .text-sm { font-size: 11px; }
        .text-xs { font-size: 10px; }
      </style>
    </head>
    <body>
      <div class="container">
        <!-- Header -->
        <div class="header">
          <div class="name">ÉRICK REIS</div>
          <div class="title">FULLSTACK ENGINEER & TECH LEADER</div>
          <div class="contact-info">
            <div class="contact-item">📧 erickreisti@gmail.com</div>
            <div class="contact-item">📍 Rio de Janeiro, Brasil</div>
            <div class="contact-item">🌐 github.com/erickreisti</div>
          </div>
          <div class="text-sm" style="color: #718096; margin-top: 6px;">
            Desenvolvedor FullStack especializado em React, Next.js, Node.js e Arquitetura Cloud
          </div>
        </div>

        <!-- Sobre -->
        <div class="section">
          <div class="section-title">SOBRE MIM</div>
          <p class="mb-2">
            Desenvolvedor FullStack & Arquiteto de Sistemas apaixonado por transformar ideias em 
            soluções digitais robustas e escaláveis com mais de 5 anos de experiência.
          </p>
          <p class="mb-3">
            Especialista em desenvolvimento de aplicações web modernas utilizando React, Next.js, 
            TypeScript e Node.js. Experiência sólida em arquitetura de sistemas escaláveis, 
            performance optimization e melhores práticas de desenvolvimento.
          </p>
          
          <div class="stats-grid">
            <div class="stat-item">
              <div class="stat-number">50+</div>
              <div class="stat-label">Projetos Entregues</div>
            </div>
            <div class="stat-item">
              <div class="stat-number">5+</div>
              <div class="stat-label">Anos de Experiência</div>
            </div>
            <div class="stat-item">
              <div class="stat-number">${stats.totalSkills}+</div>
              <div class="stat-label">Tecnologias</div>
            </div>
            <div class="stat-item">
              <div class="stat-number">${stats.averageLevel}%</div>
              <div class="stat-label">Proficiência</div>
            </div>
          </div>
        </div>

        <!-- Timeline -->
        <div class="section">
          <div class="section-title">EXPERIÊNCIA PROFISSIONAL</div>
          <div class="timeline">
            ${TIMELINE_DATA.map(
              (item) => `
              <div class="timeline-item">
                <div class="timeline-year">${item.year}</div>
                <div class="timeline-title">${item.title}</div>
                <div class="timeline-company">${item.company}</div>
                <div class="timeline-description">${item.description}</div>
                <div class="timeline-skills">
                  ${item.skills
                    .map(
                      (skill) => `
                    <span class="timeline-skill">${skill}</span>
                  `
                    )
                    .join("")}
                </div>
              </div>
            `
            ).join("")}
          </div>
        </div>

        <!-- Habilidades -->
        <div class="section">
          <div class="section-title">HABILIDADES TÉCNICAS</div>
          <p class="text-sm mb-3" style="color: #718096;">
            Domínio em ${stats.totalSkills} tecnologias com ${
    stats.averageLevel
  }% de proficiência média
          </p>
          
          <div class="skill-grid">
            ${STATIC_SKILLS_DATA.map(
              (category) => `
              ${category.skills
                .map(
                  (skill) => `
                <div class="skill-item">
                  <div class="skill-name">${skill.name}</div>
                  <div class="skill-level">
                    <div class="skill-level-bar" style="width: ${skill.level}%"></div>
                  </div>
                  <div class="skill-description">${skill.description}</div>
                  <div class="text-xs" style="color: #718096; margin-top: 2px;">Nível: ${skill.level}%</div>
                </div>
              `
                )
                .join("")}
            `
            ).join("")}
          </div>
        </div>

        <!-- Projetos -->
        <div class="section">
          <div class="section-title">PROJETOS DESTAQUE</div>
          
          ${featuredProjects
            .map(
              (project) => `
            <div class="project">
              <div class="project-title">${project.title}</div>
              <div class="project-description">${project.description}</div>
              <div class="project-tags">
                ${project.tags
                  .slice(0, 6)
                  .map(
                    (tag) => `
                  <span class="tag">${tag}</span>
                `
                  )
                  .join("")}
              </div>
              <div class="text-xs mt-2" style="color: #718096;">
                ${
                  project.liveUrl
                    ? `🔗 <strong>Live Demo:</strong> ${project.liveUrl}<br>`
                    : ""
                }
                ${
                  project.githubUrl
                    ? `<strong>GitHub:</strong> ${project.githubUrl}`
                    : ""
                }
              </div>
            </div>
          `
            )
            .join("")}
        </div>

        <!-- Contato -->
        <div class="section">
          <div class="section-title">CONTATO</div>
          <p class="mb-3">
            Estou sempre disponível para discutir novos projetos, oportunidades criativas 
            e parcerias inovadoras. Vamos transformar sua visão em realidade!
          </p>
          <div class="contact-info">
            <div class="contact-item">📧 <strong>Email:</strong> erickreisti@gmail.com</div>
            <div class="contact-item">📍 <strong>Localização:</strong> Rio de Janeiro, Brasil</div>
            <div class="contact-item">💼 <strong>Disponibilidade:</strong> Flexível & Comprometido</div>
          </div>
        </div>

        <!-- Footer -->
        <div class="footer">
          <p><strong>Érick Reis - FullStack Developer & Tech Leader</strong></p>
          <p>Gerado em ${currentDate} | Portfolio atualizado regularmente</p>
          <p class="mt-2">🚀 Transformando ideias em soluções digitais extraordinárias</p>
        </div>
      </div>
    </body>
    </html>
  `;
};

const downloadSimplePDF = async (fileName: string): Promise<void> => {
  console.log("📄 Usando fallback para PDF simples...");
  const pdfContent = generateSimplePDFContent();
  const blob = new Blob([pdfContent], { type: "text/plain" });
  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.download = fileName.replace(".pdf", ".txt");
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  setTimeout(() => URL.revokeObjectURL(url), 100);
  console.log("✅ Fallback PDF baixado");
};

const generateSimplePDFContent = (): string => {
  const stats = calculateSkillStats();
  const topSkills = getTopSkills(10);
  const featuredProjects = getFeaturedProjects().slice(0, 3);

  return `
ÉRICK REIS - FULLSTACK DEVELOPER & TECH LEADER
================================================

SOBRE MIM
---------
Desenvolvedor FullStack & Arquiteto de Sistemas apaixonado por transformar ideias em soluções digitais robustas e escaláveis.

EXPERIÊNCIA PROFISSIONAL
-----------------------
${TIMELINE_DATA.map(
  (item) => `
${item.year} - ${item.title}
${item.company}
${item.description}
Tecnologias: ${item.skills.join(", ")}
`
).join("\n")}

ESTATÍSTICAS
------------
• 50+ Projetos Entregues
• 5+ Anos de Experiência  
• ${stats.totalSkills}+ Tecnologias Dominadas
• ${stats.averageLevel}% Proficiência Média

HABILIDADES TÉCNICAS
-------------------
${STATIC_SKILLS_DATA.map(
  (category) => `
${category.category}:
${category.skills
  .map((skill) => `• ${skill.name} - ${skill.level}% (${skill.description})`)
  .join("\n")}
`
).join("\n")}

PROJETOS DESTAQUE
-----------------
${featuredProjects
  .map(
    (project) => `
${project.title}
${project.description}
Tecnologias: ${project.tags.slice(0, 6).join(", ")}
${project.liveUrl ? `Live: ${project.liveUrl}` : ""}
${project.githubUrl ? `GitHub: ${project.githubUrl}` : ""}
`
  )
  .join("\n")}

CONTATO
-------
📧 Email: erickreisti@gmail.com
📍 Localização: Rio de Janeiro, Brasil
💼 Disponibilidade: Flexível & Comprometido
🌐 GitHub: github.com/erickreisti

"Transformando ideias em soluções digitais extraordinárias"

Gerado em ${new Date().toLocaleDateString("pt-BR")}
  `;
};

export const PDFDownloads = {
  portfolio: () =>
    generatePortfolioPDF({
      fileName: "Erick-Reis-Portfolio.pdf",
      trackingEvent: "portfolio_download",
    }),

  resume: () =>
    generatePortfolioPDF({
      fileName: "Erick-Reis-Curriculo.pdf",
      trackingEvent: "resume_download",
    }),
};
