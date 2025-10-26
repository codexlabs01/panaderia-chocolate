"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ChefHat, Clock, Flame } from "lucide-react"
import { PurchaseModal } from "./purchase-modal"

const recipes = [
  {
    title: "Croissants Franceses",
    description: "Aprende a hacer croissants hojaldrados perfectos con esta receta paso a paso.",
    image: "/french-croissants-golden-flaky-pastry.jpg",
    time: "3 horas",
    difficulty: "Difícil",
    category: "Repostería",
    price: "$15.99",
  },
  {
    title: "Pan de Campo Rústico",
    description: "Un pan tradicional con corteza crujiente y miga esponjosa.",
    image: "/rustic-country-bread-crusty-loaf.jpg",
    time: "4 horas",
    difficulty: "Media",
    category: "Pan",
    price: "$12.99",
  },
  {
    title: "Galletas de Mantequilla",
    description: "Galletas clásicas perfectas para cualquier ocasión.",
    image: "/butter-cookies-homemade-golden.jpg",
    time: "45 min",
    difficulty: "Fácil",
    category: "Galletas",
    price: "$8.99",
  },
  {
    title: "Focaccia Italiana",
    description: "Pan plano italiano con aceite de oliva y hierbas aromáticas.",
    image: "/italian-focaccia-bread-olive-oil-herbs.jpg",
    time: "2 horas",
    difficulty: "Media",
    category: "Pan",
    price: "$10.99",
  },
  {
    title: "Tarta de Manzana",
    description: "Tarta clásica con manzanas caramelizadas y masa quebrada.",
    image: "/apple-pie-tart-caramelized-apples.jpg",
    time: "1.5 horas",
    difficulty: "Media",
    category: "Tartas",
    price: "$13.99",
  },
  {
    title: "Baguette Tradicional",
    description: "El pan francés por excelencia con corteza dorada y crujiente.",
    image: "/french-baguette-traditional-golden-crust.jpg",
    time: "5 horas",
    difficulty: "Difícil",
    category: "Pan",
    price: "$14.99",
  },
]

export function Recipes() {
  const [isPurchaseModalOpen, setIsPurchaseModalOpen] = useState(false)
  const [selectedRecipe, setSelectedRecipe] = useState<{ name: string; price: string } | null>(null)

  const handlePurchaseClick = (recipeName: string, recipePrice: string) => {
    setSelectedRecipe({ name: recipeName, price: recipePrice })
    setIsPurchaseModalOpen(true)
  }

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

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {recipes.map((recipe, index) => (
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
                    onClick={() => handlePurchaseClick(recipe.title, recipe.price)}
                    className="flex-1 group-hover:bg-primary group-hover:text-primary-foreground transition-colors bg-transparent"
                  >
                    <ChefHat className="mr-2 h-4 w-4" />
                    Comprar Receta
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

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
