"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export function Hero() {
  const scrollToCourses = () => {
    const coursesSection = document.getElementById("cursos")
    if (coursesSection) {
      coursesSection.scrollIntoView({ behavior: "smooth", block: "start" })
    }
  }

  const scrollToRecipes = () => {
    const recipesSection = document.getElementById("recetas")
    if (recipesSection) {
      recipesSection.scrollIntoView({ behavior: "smooth", block: "start" })
    }
  }

  return (
    <section id="inicio" className="relative overflow-hidden bg-secondary py-20 md:py-32">
      <div className="container mx-auto px-4">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-8 items-center">
          <div className="flex flex-col justify-center space-y-6">
            <div className="space-y-4">
              <h1 className="text-4xl font-bold tracking-tight text-balance sm:text-5xl md:text-6xl lg:text-7xl text-foreground">
                Aprende el arte de la panadería artesanal
              </h1>
              <p className="text-lg text-muted-foreground text-pretty md:text-xl leading-relaxed">
                Descubre los secretos de la repostería profesional con nuestros cursos en línea y recetas exclusivas.
                Desde principiantes hasta expertos.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Button
                size="lg"
                className="bg-primary hover:bg-primary/90 text-primary-foreground"
                onClick={scrollToCourses}
              >
                Ver Cursos
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button size="lg" variant="outline" onClick={scrollToRecipes}>
                Explorar Recetas
              </Button>
            </div>
          </div>

          <div className="relative h-[400px] lg:h-[500px]">
            <img
              src="/artisan-bread-baking-fresh-loaves-on-wooden-table-.jpg"
              alt="Pan artesanal recién horneado"
              className="rounded-lg object-cover w-full h-full shadow-2xl"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
