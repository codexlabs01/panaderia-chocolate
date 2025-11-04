"use client"

import type React from "react"

import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { json } from "stream/consumers"

interface PurchaseModalProps {
  isOpen: boolean
  onClose: () => void
  recipeName: string
  recipePrice: string
  paymentLink?: string  // Add this prop
}

export function PurchaseModal({ 
  isOpen, 
  onClose, 
  recipeName, 
  recipePrice,
  paymentLink = "https://mpago.la/2s63Lr2" // Default fallback URL
}: PurchaseModalProps) {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      const payload = {
        nombre: formData.firstName || " ",
        apellido: formData.lastName || " ",
        email: formData.email || "edgar@example.com",
        receta: recipeName,
        precio: recipePrice,
        tipo: "receta"
      }

      const res = await fetch("/.netlify/functions/enviarCorreo", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      })

      if (!res.ok) throw new Error('Error al enviar el formulario')

      // Use the provided paymentLink or fall back to default
      try {
        window.open(paymentLink, "_blank", "noopener,noreferrer")
      } catch (err) {
        window.location.href = paymentLink
      }

      onClose()
      setFormData({ firstName: "", lastName: "", email: "" })
    } catch (error) {
      console.error('Error:', error)
      alert('Hubo un error al enviar el formulario')
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-2xl">Comprar Receta</DialogTitle>
          <DialogDescription className="text-base">
            Completa tus datos para adquirir <span className="font-semibold text-foreground">{recipeName}</span> por{" "}
            <span className="font-bold text-primary">{recipePrice}</span>
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6 mt-4">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="firstName">Nombre *</Label>
              <Input
                id="firstName"
                type="text"
                required
                value={formData.firstName}
                onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                placeholder="Tu nombre"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="lastName">Apellido *</Label>
              <Input
                id="lastName"
                type="text"
                required
                value={formData.lastName}
                onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                placeholder="Tu apellido"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email *</Label>
              <Input
                id="email"
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="tu@email.com"
              />
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <Button type="button" variant="outline" onClick={onClose} className="flex-1 bg-transparent">
              Cancelar
            </Button>
            <Button type="submit" className="flex-1">
              Confirmar Compra
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
