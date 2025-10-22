import NextLink from "next/link";
import { Link as LinkIcon, Github } from "lucide-react";

import MotionDiv from "@/components/ui/MotionDiv";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Project, projects } from "@/lib/project-data";

// Componente para um único card de Projeto
const ProjectCard: React.FC<{ project: Project }> = ({ project }) => {
  return (
    <MotionDiv
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: project.id * 0.1 }}
      viewport={{ once: true, amount: 0.5 }}
    >
      <Card className="flex h-full flex-col overflow-hidden transition-all duration-300 hover:border-primary-default/50 hover:shadow-primary-default/20 shadow-xl">
        {/* Placeholder de Imagem */}
        <div className="h-48 w-full bg-primary-default/20 flex items-center justify-center">
          <span className="text-foreground/70 font-semibold">
            Imagem do Projeto ({project.title})
          </span>
        </div>

        <CardHeader className="flex-grow">
          <CardTitle className="text-2xl text-primary-default">
            {project.title}
          </CardTitle>
          <CardDescription className="text-base text-foreground/80">
            {project.description}
          </CardDescription>
        </CardHeader>

        <CardContent>
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <Badge
                key={tag}
                variant="secondary"
                className="text-sm font-medium"
              >
                {tag}
              </Badge>
            ))}
          </div>
        </CardContent>

        <CardFooter className="mt-auto pt-4 border-t border-card/50">
          <div className="flex space-x-3">
            <Button asChild variant="default" size="sm">
              <NextLink href={project.githubUrl} target="_blank">
                <Github className="mr-2 h-4 w-4" />
                Código
              </NextLink>
            </Button>
            {project.liveUrl && (
              <Button asChild variant="outline" size="sm">
                <NextLink href={project.liveUrl} target="_blank">
                  <LinkIcon className="mr-2 h-4 w-4" />
                  Demo
                </NextLink>
              </Button>
            )}
          </div>
        </CardFooter>
      </Card>
    </MotionDiv>
  );
};

export const Projects = () => {
  return (
    <section
      id="projects"
      className="py-20 lg:py-32 bg-card/50 border-t border-b border-card"
    >
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-extrabold text-foreground sm:text-5xl text-center mb-16">
          Projetos em <span className="text-primary-default">Destaque</span>
        </h2>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
};
