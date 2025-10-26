"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Clock, Users, Star } from "lucide-react"
import { EnrollmentModal } from "./enrollment-modal"

const courses = [
  {
    title: "Panadería para Principiantes",
    description: "Aprende los fundamentos de la panadería desde cero. Perfecto para quienes están comenzando.",
    image: "/beginner-bread-making-class-hands-kneading-dough.jpg",
    price: "$49",
    duration: "6 semanas",
    students: "1,234",
    rating: "4.9",
    level: "Principiante",
  },
  {
    title: "Repostería Avanzada",
    description: "Domina técnicas profesionales de repostería y crea postres dignos de una pastelería.",
    image: "/advanced-pastry-making-elegant-desserts-profession.jpg",
    price: "$89",
    duration: "8 semanas",
    students: "856",
    rating: "4.8",
    level: "Avanzado",
  },
  {
    title: "Pan Artesanal y Masa Madre",
    description: "Descubre el arte del pan con masa madre y técnicas de fermentación natural.",
    image: "/sourdough-bread-artisan-loaves-rustic.jpg",
    price: "$69",
    duration: "7 semanas",
    students: "2,103",
    rating: "5.0",
    level: "Intermedio",
  },
]

export function Courses() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedCourse, setSelectedCourse] = useState("")

  const handleEnrollClick = (courseTitle: string) => {
    setSelectedCourse(courseTitle)
    setIsModalOpen(true)
  }

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
        </div>
      </section>

      <EnrollmentModal open={isModalOpen} onOpenChange={setIsModalOpen} courseTitle={selectedCourse} />
    </>
  )
}
