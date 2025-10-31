"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Clock, Users, Star } from "lucide-react"
import { EnrollmentModal } from "./enrollment-modal"

interface Course {
  title: string
  description?: string
  image?: string
  price?: string
  duration?: string
  students?: string
  rating?: string
  level?: string
}

interface RawCourse {
  Nombre?: string
  Descripcion?: string
  Categoria?: string
  Dificultad?: string
  Experiencia?: string
  "Link de foto"?: string
  Duracion?: string
  Precio?: string
  "Link de pago"?: string
  "Es visible"?: string
  [key: string]: any
}

const allowedCourseTitles = [
  "Panadería para Principiantes",
  "Repostería Avanzada",
  "Pan Artesanal y Masa Madre",
]

export function Courses() {
  const [courses, setCourses] = useState<Course[]>([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedCourse, setSelectedCourse] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const handleEnrollClick = (courseTitle: string) => {
    setSelectedCourse(courseTitle)
    setIsModalOpen(true)
  }

  useEffect(() => {
    const controller = new AbortController()

    async function loadCourses() {
      setIsLoading(true)
      setError(null)
      try {
        const res = await fetch("https://script.google.com/macros/s/AKfycbz120fqiDRbI9CFpG5WSRZOh7K4l4oxUX1kQraGKnEPGeLjuacPqs_V2GxS4iatcOpP/exec?hoja=Cursos", { signal: controller.signal })
        if (!res.ok) throw new Error(`Error ${res.status}`)
        const raw = await res.json()
        console.log("GET raw response:", raw)

        // Asegurar que tenemos un array
        const data: RawCourse[] = Array.isArray(raw) ? raw : []

        // Debug: mostrar cada item y el valor bruto de "Es visible"
        data.forEach((it, i) =>
          console.log(i, "Nombre:", it?.Nombre, "| Es visible raw:", JSON.stringify(it?.["Es visible"]))
        )

        // Filtrar por visibilidad con normalización (trim + lower)
        const filteredRaw = data.filter((item) => {
          const vis = String(item?.["Es visible"] ?? "").trim().toLowerCase()
          return vis === "si"
        })

        console.log("filteredRaw (visibles):", filteredRaw)

        const mapped: Course[] = filteredRaw.map((item) => {
          const rawLink = String(item?.["Link de foto"] ?? "").trim()
          const image =
            rawLink === ""
              ? undefined
              : rawLink.startsWith("http")
              ? rawLink
              : rawLink.startsWith("drive.google.com")
              ? `https://${rawLink}`
              : `https://${rawLink}`

          // level puede venir como "Experiencia" o "Dificultad"
          const level = item?.Experiencia ?? item?.Dificultad ?? item?.Categoria

          return {
            title: String(item?.Nombre ?? ""),
            description: item?.Descripcion,
            image,
            price: item?.Precio,
            duration: item?.Duracion,
            students: undefined,
            rating: undefined,
            level,
          }
        })

        console.log("mapped courses:", mapped)
        setCourses(mapped)
      } catch (err: any) {
        if (err?.name !== "AbortError") {
          setError("No se pudieron cargar los cursos.")
          console.error(err)
        }
      } finally {
        setIsLoading(false)
      }
    }

    loadCourses()
    return () => controller.abort()
  }, [])

  return (
    <>
      <section id="cursos" className="py-20 md:py-24 bg-secondary">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight text-balance sm:text-4xl md:text-5xl text-foreground mb-4">
              Nuestros Cursos
            </h2>
            <p className="text-lg text-muted-foreground text-pretty max-w-2xl mx-auto leading-relaxed">
              Programas diseñados para todos los niveles, desde principiantes hasta profesionales
            </p>
          </div>

          {isLoading ? (
            <div className="text-center">Cargando cursos...</div>
          ) : error ? (
            <div className="text-center text-destructive">{error}</div>
          ) : courses.length === 0 ? (
            <div className="text-center">No hay cursos disponibles.</div>
          ) : (
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {courses.map((course, index) => (
                <Card key={index} className="flex flex-col overflow-hidden bg-card border-border">
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={course.image || "/placeholder.svg"}
                      alt={course.title}
                      className="object-cover w-full h-full transition-transform hover:scale-105 duration-300"
                    />
                    <Badge className="absolute top-4 right-4 bg-accent text-accent-foreground">{course.level}</Badge>
                  </div>
                  <CardHeader>
                    <CardTitle className="text-card-foreground">{course.title}</CardTitle>
                    <CardDescription className="leading-relaxed">{course.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="flex-1">
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        <span>{course.duration}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="h-4 w-4" />
                        <span>{course.students}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-accent text-accent" />
                        <span>{course.rating}</span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-primary">{course.price}</span>
                    <Button
                      onClick={() => handleEnrollClick(course.title)}
                      className="bg-primary hover:bg-primary/90 text-primary-foreground"
                    >
                      Inscribirse
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>

      <EnrollmentModal open={isModalOpen} onOpenChange={setIsModalOpen} courseTitle={selectedCourse} />
    </>
  )
}
