import { Award, Users, BookOpen } from "lucide-react"

export function About() {
  return (
    <section id="nosotros" className="py-20 md:py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight text-balance sm:text-4xl md:text-5xl text-foreground mb-4">
            ¿Por qué elegirnos?
          </h2>
          <p className="text-lg text-muted-foreground text-pretty max-w-2xl mx-auto leading-relaxed">
            Más de 10 años compartiendo la pasión por la panadería artesanal
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          <div className="flex flex-col items-center text-center space-y-4 p-6 rounded-lg bg-card border border-border">
            <div className="rounded-full bg-primary/10 p-4">
              <Award className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-xl font-semibold text-card-foreground">Instructores Certificados</h3>
            <p className="text-muted-foreground leading-relaxed">
              Aprende de maestros panaderos con años de experiencia en el arte de la repostería
            </p>
          </div>

          <div className="flex flex-col items-center text-center space-y-4 p-6 rounded-lg bg-card border border-border">
            <div className="rounded-full bg-accent/10 p-4">
              <Users className="h-8 w-8 text-accent" />
            </div>
            <h3 className="text-xl font-semibold text-card-foreground">Comunidad Activa</h3>
            <p className="text-muted-foreground leading-relaxed">
              Únete a miles de estudiantes que comparten su pasión por hornear
            </p>
          </div>

          <div className="flex flex-col items-center text-center space-y-4 p-6 rounded-lg bg-card border border-border">
            <div className="rounded-full bg-primary/10 p-4">
              <BookOpen className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-xl font-semibold text-card-foreground">Contenido Premium</h3>
            <p className="text-muted-foreground leading-relaxed">
              Acceso a recetas exclusivas y técnicas profesionales paso a paso
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
