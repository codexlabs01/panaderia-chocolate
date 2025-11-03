"use client"

import type React from "react"

import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface PurchaseModalProps {
  isOpen: boolean
  onClose: () => void
  recipeName: string
  recipePrice: string
}

export function PurchaseModal({ isOpen, onClose, recipeName, recipePrice }: PurchaseModalProps) {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
  })

  const PAYMENT_URL = "https://mpago.la/2s63Lr2"
  const POST_URL = "https://script.google.com/macros/s/AKfycbz120fqiDRbI9CFpG5WSRZOh7K4l4oxUX1kQraGKnEPGeLjuacPqs_V2GxS4iatcOpP/exec" // reemplaza con tu URL real

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // crear objeto solicitado
    const payload = {
      solicitud_de_compra: {
        nombre: formData.firstName || "Edgar",
        apellido: formData.lastName || "Gómez",
        mail: formData.email || "edgar@example.com",
        confirmada: true,
      },
    }

    console.log("Compra de receta (local):", { ...payload, recipeName, recipePrice })

    const res = await fetch("/.netlify/functions/enviarCorreo",{
      method: "POST",
      headers: { 
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })

    //funcion para enviar mail

    // Abrir link de pago y cerrar modal
    try {
      window.open(PAYMENT_URL, "_blank", "noopener,noreferrer")
    } catch (err) {
      window.location.href = PAYMENT_URL
    }

    onClose()
    setFormData({ firstName: "", lastName: "", email: "" })
  
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
