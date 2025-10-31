// components/pdf/PDFContent.tsx
import { STATIC_SKILLS_DATA } from "@/lib/skills-data";
import { getFeaturedProjects } from "@/lib/project-data";

const TIMELINE_DATA = [
  {
    year: "Atual",
    title: "Desenvolvedor FullStack",
    company: "Projetos Freelance",
    description:
      "Desenvolvimento de aplicativos web e websites de diferentes segmentos",
  },
  {
    year: "2017-2018",
    title: "Suporte em Tecnologia da Informação",
    company: "EMERJ - Escola da Magistratura do Estado do Rio de Janeiro",
    description:
      "Auxiliar no encaminhamento de documentos, elaboração de relatórios, controle de arquivos, desenvolvimento de planilhas, identificação de pontos de rede, verificação de equipamentos de sala de aula e suporte aos usuários",
  },
  {
    year: "2014-2016",
    title: "Suporte em Tecnologia da Informação",
    company: "PRODERJ - Centro de Tecnologia do Estado do Rio de Janeiro",
    description:
      "Suporte entre as partes, configuração de rede e impressora em Linux, instalação de impressoras e atendimento remoto via SHELL",
  },
];

export const PDFContent = () => {
  const currentDate = new Date().toLocaleDateString("pt-BR");
  const featuredProjects = getFeaturedProjects().slice(0, 2);

  return (
    <div className="curriculo-abnt">
      <style>{`
        .curriculo-abnt {
          font-family: 'Times New Roman', Times, serif;
          line-height: 1.6;
          color: #000000;
          background: #ffffff;
          font-size: 13pt;
          width: 210mm;
          padding: 25mm;
          margin: 0;
        }
        
        /* Cabeçalho ABNT */
        .cabecalho {
          text-align: center;
          margin-bottom: 25pt;
          border-bottom: 2pt solid #06b6d4;
          padding-bottom: 15pt;
        }
        
        .nome {
          font-size: 20pt;
          font-weight: bold;
          color: #06b6d4;
          margin: 0;
          text-transform: uppercase;
          letter-spacing: 1pt;
        }
        
        .titulo-profissional {
          font-size: 14pt;
          color: #1a202c;
          font-weight: normal;
          margin: 8pt 0;
        }
        
        .contato {
          font-size: 11pt;
          color: #4a5568;
          margin: 4pt 0;
        }
        
        /* Seções ABNT */
        .secao {
          margin: 18pt 0;
        }
        
        .titulo-secao {
          font-size: 14pt;
          font-weight: bold;
          color: #06b6d4;
          margin-bottom: 10pt;
          border-bottom: 1.5pt solid #06b6d4;
          padding-bottom: 5pt;
          text-transform: uppercase;
        }
        
        /* Experiência Profissional */
        .experiencia {
          margin: 12pt 0;
          padding: 8pt;
          background: #f8fafc;
          border-radius: 4pt;
        }
        
        .periodo {
          font-weight: bold;
          color: #1a202c;
          font-size: 11pt;
        }
        
        .cargo {
          font-weight: bold;
          color: #2d3748;
          font-size: 12pt;
          margin: 3pt 0;
        }
        
        .empresa {
          color: #4a5568;
          font-style: italic;
          font-size: 11pt;
          margin-bottom: 5pt;
        }
        
        .descricao-experiencia {
          color: #4a5568;
          font-size: 11pt;
          line-height: 1.4;
        }
        
        /* Habilidades */
        .habilidades-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 12pt;
          margin: 12pt 0;
        }
        
        .categoria-habilidade {
          margin: 6pt 0;
          padding: 8pt;
          background: #f8fafc;
          border-radius: 4pt;
        }
        
        .titulo-categoria {
          font-weight: bold;
          color: #06b6d4;
          font-size: 12pt;
          margin-bottom: 4pt;
        }
        
        .lista-habilidades {
          font-size: 11pt;
          color: #4a5568;
          margin-left: 12pt;
        }
        
        /* Formação */
        .formacao {
          margin: 12pt 0;
          padding: 8pt;
          background: #f8fafc;
          border-radius: 4pt;
        }
        
        .curso {
          font-weight: bold;
          color: #2d3748;
          font-size: 12pt;
        }
        
        .instituicao {
          color: #4a5568;
          font-size: 11pt;
          margin: 3pt 0;
        }
        
        .ano-conclusao {
          color: #06b6d4;
          font-weight: bold;
          font-size: 11pt;
        }
        
        /* Projetos */
        .projeto {
          margin: 12pt 0;
          padding: 12pt;
          border-left: 3pt solid #06b6d4;
          background: #f8fafc;
        }
        
        .titulo-projeto {
          font-weight: bold;
          color: #2d3748;
          font-size: 12pt;
        }
        
        .descricao-projeto {
          color: #4a5568;
          font-size: 11pt;
          margin: 5pt 0;
          line-height: 1.4;
        }
        
        .tecnologias {
          display: flex;
          flex-wrap: wrap;
          gap: 4pt;
          margin-top: 5pt;
        }
        
        .tecnologia {
          background: #06b6d4;
          color: white;
          padding: 2pt 6pt;
          border-radius: 4pt;
          font-size: 9pt;
        }
        
        /* Listas */
        .lista-item {
          margin: 8pt 0;
          padding-left: 15pt;
          font-size: 11pt;
        }
        
        /* Rodapé ABNT */
        .rodape {
          text-align: center;
          margin-top: 25pt;
          padding-top: 12pt;
          border-top: 1pt solid #06b6d4;
          color: #718096;
          font-size: 10pt;
        }
        
        p {
          margin: 6pt 0;
          text-align: justify;
          font-size: 11pt;
        }
        
        .quebra-pagina {
          page-break-before: always;
        }
      `}</style>

      {/* Página 1 */}
      <div className="cabecalho">
        <div className="nome">Erick Reis Lima de Arruda</div>
        <div className="titulo-profissional">
          Desenvolvedor FullStack Júnior
        </div>
        <div className="contato">
          erickreisti@gmail.com • Rio de Janeiro, RJ
        </div>
        <div className="contato">GitHub: github.com/erickreisti</div>
      </div>

      <div className="secao">
        <div className="titulo-secao">Resumo Profissional</div>
        <p>
          Desenvolvedor FullStack em início de carreira com formação sólida em
          tecnologia da informação. Experiência em suporte técnico e
          desenvolvimento web, com conhecimentos em React, Next.js, TypeScript e
          Node.js. Comprometido com aprendizado contínuo e qualidade no
          desenvolvimento de soluções tecnológicas.
        </p>
      </div>

      <div className="secao">
        <div className="titulo-secao">Experiência Profissional</div>
        {TIMELINE_DATA.map((exp, index) => (
          <div key={index} className="experiencia">
            <div className="periodo">{exp.year}</div>
            <div className="cargo">{exp.title}</div>
            <div className="empresa">{exp.company}</div>
            <div className="descricao-experiencia">{exp.description}</div>
          </div>
        ))}
      </div>

      <div className="secao">
        <div className="titulo-secao">Formação Acadêmica</div>
        <div className="formacao">
          <div className="curso">Pós-Graduação em Redes de Computadores</div>
          <div className="instituicao">Anhanguera</div>
          <div className="ano-conclusao">Conclusão: 2024</div>
        </div>
        <div className="formacao">
          <div className="curso">Graduação em Sistemas de Informação</div>
          <div className="instituicao">Universidade Estácio de Sá</div>
          <div className="ano-conclusao">Conclusão: 2020</div>
        </div>
        <div className="formacao">
          <div className="curso">Técnico em Tecnologia da Informação</div>
          <div className="instituicao">Senai de Artes Gráficas</div>
          <div className="ano-conclusao">Conclusão: 2012</div>
        </div>
      </div>

      {/* Página 2 */}
      <div className="quebra-pagina"></div>

      <div className="secao">
        <div className="titulo-secao">Habilidades Técnicas</div>
        <div className="habilidades-grid">
          {STATIC_SKILLS_DATA.map((categoria) => (
            <div key={categoria.id} className="categoria-habilidade">
              <div className="titulo-categoria">{categoria.name}</div>
              <div className="lista-habilidades">
                {categoria.skills.map((skill) => (
                  <div key={skill.name}>• {skill.name}</div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="secao">
        <div className="titulo-secao">Projetos Destacados</div>
        {featuredProjects.map((projeto, index) => (
          <div key={index} className="projeto">
            <div className="titulo-projeto">{projeto.title}</div>
            <div className="descricao-projeto">{projeto.description}</div>
            <div className="tecnologias">
              {projeto.tags.slice(0, 5).map((tag, i) => (
                <span key={i} className="tecnologia">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="secao">
        <div className="titulo-secao">Idiomas</div>
        <div className="lista-item">
          <strong>Português:</strong> Nativo
        </div>
        <div className="lista-item">
          <strong>Inglês:</strong> Técnico (Leitura e escrita para documentação
          técnica)
        </div>
      </div>

      <div className="rodape">
        <div>Currículo atualizado em {currentDate}</div>
        <div>Erick Reis Lima de Arruda • Desenvolvedor FullStack Júnior</div>
      </div>
    </div>
  );
};
