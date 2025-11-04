"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ChefHat, Clock, Flame } from "lucide-react"
import { PurchaseModal } from "./purchase-modal"

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

interface Recipe {
  title: string
  description?: string
  image?: string
  time?: string
  difficulty?: string
  category?: string
  price?: string
  paymentLink?: string
}

export function Recipes() {
  const [recipes, setRecipes] = useState<Recipe[]>([])
  const [isPurchaseModalOpen, setIsPurchaseModalOpen] = useState(false)
  const [selectedRecipe, setSelectedRecipe] = useState<{ name: string; price: string } | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const DATA_URL = "https://script.google.com/macros/s/AKfycby6RnikJ74ubins3zLaLrF3cJcdiYkCLhVsr6W2_KOCaWMS-Yj_O0pIlphWjtEwujbJ/exec?hoja=Recetas"
    // ajusta la URL a tu endpoint real
    // ejemplo alternativo (descomenta si usas el Google Script que mencionaste antes)
    

  const handlePurchaseClick = (recipeName: string, recipePrice: string) => {
    setSelectedRecipe({ name: recipeName, price: recipePrice })
    setIsPurchaseModalOpen(true)
  }

  useEffect(() => {
    const controller = new AbortController()

    async function load() {
      setIsLoading(true)
      setError(null)
      try {
        const res = await fetch(DATA_URL, { signal: controller.signal })
        if (!res.ok) throw new Error(`Error ${res.status}`)
        const raw = await res.json()
        console.log("GET raw response:", raw)

        const arr: RawCourse[] = Array.isArray(raw) ? raw : []

        // debug: muestra valores de 'Es visible' por elemento
        arr.forEach((it, i) =>
          console.log(i, "Nombre:", it?.Nombre, "| Es visible raw:", JSON.stringify(it?.["Es visible"]))
        )

        const visibles = arr.filter((it) => {
          const v = String(it?.["Es visible"] ?? "").trim().toLowerCase()
          return v === "si"
        })

        console.log("visible items:", visibles.length)

        const mapped: Recipe[] = visibles.map((it) => {
          const rawLink = String(it?.["Link de foto"] ?? "").trim()
          const image =
            rawLink === ""
              ? undefined
              : rawLink.startsWith("http")
              ? rawLink
              : rawLink.startsWith("drive.google.com")
              ? `https://${rawLink}`
              : `https://${rawLink}`

          const difficulty = it?.Experiencia ?? it?.Dificultad ?? undefined

          return {
            title: String(it?.Nombre ?? ""),
            description: it?.Descripcion,
            image,
            time: it?.Duracion,
            difficulty,
            category: it?.Categoria,
            price: it?.Precio,
            paymentLink: it?.["Link de pago"],
          }
        })

        console.log("mapped recipes:", mapped)
        setRecipes(mapped)
      } catch (err: any) {
        if (err?.name !== "AbortError") {
          console.error(err)
          setError("No se pudieron cargar las recetas.")
        }
      } finally {
        setIsLoading(false)
      }
    }

    load()
    return () => controller.abort()
  }, [])

  return (
    <section id="recetas" className="py-20 md:py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight text-balance sm:text-4xl md:text-5xl text-foreground mb-4">
            Recetas
          </h2>
          <p className="text-lg text-muted-foreground text-pretty max-w-2xl mx-auto leading-relaxed">
            Explora nuestra colección de recetas probadas y aprobadas por expertos
          </p>
        </div>

        {isLoading ? (
          <div className="text-center">Cargando recetas...</div>
        ) : error ? (
          <div className="text-center text-destructive">{error}</div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {recipes.length === 0 ? (
              <div className="col-span-full text-center text-muted-foreground">No hay recetas visibles.</div>
            ) : (
              recipes.map((recipe, index) => (
                <Card key={index} className="group overflow-hidden bg-card border-border hover:shadow-lg transition-shadow">
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={recipe.image || "/placeholder.svg"}
                      alt={recipe.title}
                      className="object-cover w-full h-full transition-transform group-hover:scale-110 duration-300"
                    />
                    <Badge className="absolute top-4 left-4 bg-primary text-primary-foreground">{recipe.category}</Badge>
                  </div>
                  <CardHeader>
                    <CardTitle className="text-card-foreground">{recipe.title}</CardTitle>
                    <CardDescription className="leading-relaxed">{recipe.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        <span>{recipe.time}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Flame className="h-4 w-4" />
                        <span>{recipe.difficulty}</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between gap-4">
                      <span className="text-2xl font-bold text-primary">{recipe.price}</span>
                      <Button
                        variant="outline"
                        onClick={() => handlePurchaseClick(recipe.title, recipe.price ?? "")}
                        className="flex-1 group-hover:bg-primary group-hover:text-primary-foreground transition-colors bg-transparent"
                      >
                        <ChefHat className="mr-2 h-4 w-4" />
                        Comprar Receta
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        )}

        <div className="text-center mt-12"></div>
      </div>

      {selectedRecipe && (
        <PurchaseModal
          isOpen={isPurchaseModalOpen}
          onClose={() => setIsPurchaseModalOpen(false)}
          recipeName={selectedRecipe.name}
          recipePrice={selectedRecipe.price}
        />
      )}
    </section>
  )
}
