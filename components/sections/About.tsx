import { Briefcase, Heart, Lightbulb, TrendingUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// Dados da sua biografia
const bioData = {
  paragraph1:
    "Minha jornada na programação começou há 5 anos, focando inicialmente em Back-end com Node.js e Python. Rapidamente, percebi a necessidade de dominar o Front-end para construir experiências completas, migrando para o ecossistema moderno de React e, mais recentemente, Next.js.",
  paragraph2:
    "Sou um profissional orientado a resultados, apaixonado por arquitetura limpa, performance de código e design system. Meu objetivo é sempre entregar soluções que sejam robustas, escaláveis e que superem as expectativas do cliente ou usuário final.",
  passions: [
    { icon: Lightbulb, text: "Arquitetura de Sistemas (DDD/Clean Code)" },
    { icon: TrendingUp, text: "Otimização de Performance Web (Lighthouse)" },
    { icon: Heart, text: "Comunidades e Mentoria Técnica" },
    { icon: Briefcase, text: "Novas Tecnologias (Ex: Rust e Serverless)" },
  ],
};

export const About = () => {
  return (
    <section
      id="about"
      className="py-20 lg:py-32 bg-card/50 border-t border-b border-card"
    >
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Título da Seção */}
        <h2 className="text-4xl font-extrabold text-foreground sm:text-5xl text-center mb-16">
          Sobre <span className="text-primary-default">Mim</span>
        </h2>

        <div className="flex flex-col lg:flex-row lg:space-x-12">
          {/* Coluna de Texto e História */}
          <div className="lg:w-7/12 space-y-6 text-lg text-foreground/70">
            <p className="font-semibold text-foreground">
              {bioData.paragraph1}
            </p>
            <p>{bioData.paragraph2}</p>

            {/* CTA Subtil */}
            <div className="mt-8 pt-4">
              <span className="text-xl font-bold text-primary-default block">
                Pronto para o próximo desafio.
              </span>
            </div>
          </div>

          {/* Coluna de Cards (Paixões/Foco) */}
          <div className="lg:w-5/12 mt-12 lg:mt-0">
            <Card className="h-full bg-background border-2 border-primary-default/10 shadow-xl">
              <CardHeader>
                <CardTitle className="text-2xl text-primary-default">
                  Foco & Paixões
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {bioData.passions.map((item, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <item.icon className="h-6 w-6 text-primary-default flex-shrink-0 mt-1" />
                    <p className="text-base text-foreground/80">{item.text}</p>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};
