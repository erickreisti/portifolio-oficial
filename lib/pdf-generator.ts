// lib/pdf-generator.ts
import {
  STATIC_SKILLS_DATA,
  calculateSkillStats,
  getTopSkills,
} from "./skills-data";
import { getFeaturedProjects } from "../lib/project-data";

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

  try {
    onProgress?.(15);
    const pdfContent = generatePDFContent();
    await waitForFrame();

    // Criar elemento temporário para renderização
    const tempContainer = document.createElement("div");
    tempContainer.style.cssText = `
      position: fixed;
      left: 0;
      top: 0;
      width: 210mm;
      min-height: 297mm;
      background: white;
      color: black;
      padding: 20px;
      margin: 0;
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      font-size: 13px;
      line-height: 1.6;
      z-index: 9999;
      opacity: 1;
      pointer-events: none;
    `;

    tempContainer.innerHTML = pdfContent;
    document.body.appendChild(tempContainer);

    onProgress?.(25);

    // Dar tempo para renderização
    await waitForFrame();
    await delay(200);

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

    console.log("📸 Capturando screenshot do conteúdo...");

    // Capturar screenshot com configurações otimizadas
    const canvas = await html2canvas(tempContainer, {
      scale: 2,
      useCORS: true,
      logging: false,
      width: tempContainer.scrollWidth,
      height: tempContainer.scrollHeight,
      scrollX: 0,
      scrollY: 0,
      backgroundColor: "#ffffff",
      removeContainer: true,
      allowTaint: false,
      foreignObjectRendering: false,
      imageTimeout: 10000,
    });

    console.log("✅ Screenshot capturado com sucesso");
    onProgress?.(65);

    // Limpar elemento temporário
    if (tempContainer.parentNode) {
      document.body.removeChild(tempContainer);
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
    const imgData = canvas.toDataURL("image/jpeg", 1.0);
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
  const topSkills = getTopSkills(8);
  const featuredProjects = getFeaturedProjects().slice(0, 2);

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
          line-height: 1.6; 
          color: #1a202c; 
          background: #ffffff;
          font-size: 14px;
          padding: 20px;
          width: 210mm;
          min-height: 297mm;
        }
        
        .container {
          max-width: 100%;
          margin: 0 auto;
        }
        
        .header { 
          text-align: center; 
          border-bottom: 3px solid #06b6d4; 
          padding-bottom: 20px; 
          margin-bottom: 25px;
          background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
          padding: 25px 15px;
          border-radius: 8px;
          margin-top: 5px;
        }
        
        .name { 
          font-size: 32px; 
          font-weight: 800; 
          color: #06b6d4; 
          margin: 8px 0;
          letter-spacing: -0.5px;
        }
        
        .title { 
          font-size: 18px; 
          color: #4a5568; 
          font-weight: 600;
          margin-bottom: 12px;
        }
        
        .contact-info { 
          display: flex; 
          justify-content: center; 
          gap: 20px; 
          margin: 12px 0; 
          flex-wrap: wrap;
          font-size: 13px;
        }
        
        .contact-item {
          display: flex;
          align-items: center;
          gap: 6px;
          color: #4a5568;
        }
        
        .section { 
          margin: 25px 0; 
          padding: 20px;
          background: #f8fafc;
          border-radius: 8px;
          border-left: 3px solid #06b6d4;
        }
        
        .section-title { 
          font-size: 22px; 
          color: #06b6d4; 
          border-bottom: 2px solid #06b6d4; 
          padding-bottom: 6px; 
          margin-bottom: 15px;
          font-weight: 700;
        }
        
        .skill-grid { 
          display: grid; 
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); 
          gap: 12px; 
          margin: 12px 0;
        }
        
        .skill-item { 
          background: #ffffff; 
          padding: 12px; 
          border-radius: 6px; 
          border-left: 3px solid #06b6d4;
          box-shadow: 0 1px 3px rgba(0,0,0,0.1);
        }
        
        .skill-name {
          font-weight: 600;
          color: #2d3748;
          margin-bottom: 4px;
          font-size: 14px;
        }
        
        .skill-level {
          background: #e2e8f0;
          height: 8px;
          border-radius: 4px;
          overflow: hidden;
          margin: 6px 0;
        }
        
        .skill-level-bar {
          height: 100%;
          background: linear-gradient(90deg, #06b6d4, #3b82f6);
          border-radius: 4px;
        }
        
        .skill-description {
          font-size: 12px;
          color: #718096;
          font-style: italic;
          margin-top: 4px;
        }
        
        .project { 
          margin: 15px 0; 
          padding: 15px; 
          background: #ffffff; 
          border-radius: 6px;
          box-shadow: 0 1px 4px rgba(0,0,0,0.1);
          border: 1px solid #e2e8f0;
        }
        
        .project-title {
          font-size: 18px;
          font-weight: 700;
          color: #2d3748;
          margin-bottom: 6px;
        }
        
        .project-description {
          color: #4a5568;
          margin-bottom: 10px;
          line-height: 1.4;
          font-size: 13px;
        }
        
        .project-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 5px;
          margin-top: 8px;
        }
        
        .tag {
          background: #06b6d4;
          color: white;
          padding: 4px 8px;
          border-radius: 10px;
          font-size: 11px;
          font-weight: 500;
        }
        
        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
          gap: 12px;
          margin: 15px 0;
        }
        
        .stat-item {
          text-align: center;
          padding: 12px;
          background: white;
          border-radius: 6px;
          box-shadow: 0 1px 3px rgba(0,0,0,0.1);
        }
        
        .stat-number {
          font-size: 22px;
          font-weight: 700;
          color: #06b6d4;
          margin-bottom: 4px;
        }
        
        .stat-label {
          font-size: 12px;
          color: #718096;
          font-weight: 500;
        }
        
        .footer { 
          text-align: center; 
          margin-top: 30px; 
          padding-top: 15px; 
          border-top: 1px solid #e2e8f0; 
          color: #718096; 
          font-size: 12px;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <div class="name">ÉRICK REIS</div>
          <div class="title">FULLSTACK ENGINEER & TECH LEADER</div>
          <div class="contact-info">
            <div class="contact-item">📧 erickreisti@gmail.com</div>
            <div class="contact-item">📍 Rio de Janeiro, Brasil</div>
            <div class="contact-item">🌐 github.com/erickreisti</div>
          </div>
          <div style="font-size: 13px; color: #718096; margin-top: 8px;">
            Desenvolvedor FullStack especializado em React, Next.js, Node.js e Arquitetura Cloud
          </div>
        </div>

        <div class="section">
          <div class="section-title">SOBRE MIM</div>
          <p style="margin-bottom: 12px;">
            Desenvolvedor FullStack & Arquiteto de Sistemas apaixonado por transformar ideias em 
            soluções digitais robustas e escaláveis com mais de 5 anos de experiência.
          </p>
          <p>
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
              <div class="stat-number">100%</div>
              <div class="stat-label">Satisfação do Cliente</div>
            </div>
            <div class="stat-item">
              <div class="stat-number">24/7</div>
              <div class="stat-label">Suporte Técnico</div>
            </div>
          </div>
        </div>

        <div class="section">
          <div class="section-title">HABILIDADES TÉCNICAS</div>
          <div style="font-size: 13px; color: #718096; margin-bottom: 12px;">
            Domínio em ${stats.totalSkills} tecnologias com ${
    stats.averageLevel
  }% de proficiência média
          </div>
          
          <div class="skill-grid">
            ${topSkills
              .map(
                (skill) => `
              <div class="skill-item">
                <div class="skill-name">${skill.name}</div>
                <div class="skill-level">
                  <div class="skill-level-bar" style="width: ${skill.level}%"></div>
                </div>
                <div class="skill-description">${skill.description}</div>
                <div style="font-size: 11px; color: #718096; margin-top: 4px;">Nível: ${skill.level}%</div>
              </div>
            `
              )
              .join("")}
          </div>
        </div>

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
                  .slice(0, 4)
                  .map(
                    (tag) => `
                  <span class="tag">${tag}</span>
                `
                  )
                  .join("")}
              </div>
              <div style="font-size: 11px; color: #718096; margin-top: 8px;">
                ${
                  project.liveUrl
                    ? `🔗 <strong>Live Demo:</strong> ${project.liveUrl}<br>`
                    : ""
                }
                <strong>GitHub:</strong> ${project.githubUrl}
              </div>
            </div>
          `
            )
            .join("")}
        </div>

        <div class="section">
          <div class="section-title">CONTATO</div>
          <p style="margin-bottom: 12px;">
            Estou sempre disponível para discutir novos projetos, oportunidades criativas 
            e parcerias inovadoras. Vamos transformar sua visão em realidade!
          </p>
          <div class="contact-info">
            <div class="contact-item">📧 <strong>Email:</strong> erickreisti@gmail.com</div>
            <div class="contact-item">📍 <strong>Localização:</strong> Rio de Janeiro, Brasil</div>
            <div class="contact-item">💼 <strong>Disponibilidade:</strong> Flexível & Comprometido</div>
          </div>
        </div>

        <div class="footer">
          <p><strong>Érick Reis - FullStack Developer & Tech Leader</strong></p>
          <p>Gerado em ${currentDate} | Portfolio atualizado regularmente</p>
          <p style="margin-top: 8px;">🚀 Transformando ideias em soluções digitais extraordinárias</p>
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
  const topSkills = getTopSkills(6);
  const featuredProjects = getFeaturedProjects().slice(0, 2);

  return `
ÉRICK REIS - FULLSTACK DEVELOPER & TECH LEADER
================================================

SOBRE MIM
---------
Desenvolvedor FullStack & Arquiteto de Sistemas apaixonado por transformar ideias em soluções digitais robustas e escaláveis.

ESTATÍSTICAS
------------
• 50+ Projetos Entregues
• 5+ Anos de Experiência  
• 100% Satisfação do Cliente
• ${stats.totalSkills} Tecnologias Dominadas
• ${stats.averageLevel}% Proficiência Média

HABILIDADES PRINCIPAIS
----------------------
${topSkills
  .map((skill) => `• ${skill.name} - ${skill.level}% (${skill.description})`)
  .join("\n")}

PROJETOS DESTAQUE
-----------------
${featuredProjects
  .map(
    (project) => `
${project.title}
${project.description}
Tecnologias: ${project.tags.slice(0, 4).join(", ")}
${project.liveUrl ? `Live: ${project.liveUrl}` : ""}
GitHub: ${project.githubUrl}
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
