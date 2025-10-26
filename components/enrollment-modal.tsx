"use client"

import type React from "react"

import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

interface EnrollmentModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  courseTitle: string
}

export function EnrollmentModal({ open, onOpenChange, courseTitle }: EnrollmentModalProps) {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    experience: "none",
    expectations: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("[v0] Formulario enviado:", formData)
    // Aquí puedes agregar la lógica para enviar los datos
    alert("¡Inscripción enviada con éxito!")
    onOpenChange(false)
    // Resetear formulario
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      experience: "none",
      expectations: "",
    })
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">Inscripción al Curso</DialogTitle>
          <DialogDescription className="text-pretty leading-relaxed">
            Completa el formulario para inscribirte en{" "}
            <span className="font-semibold text-foreground">{courseTitle}</span>
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6 py-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="firstName">Nombre *</Label>
              <Input
                id="firstName"
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
                required
                value={formData.lastName}
                onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                placeholder="Tu apellido"
              />
            </div>
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

          <div className="space-y-2">
            <Label htmlFor="phone">Número de Teléfono *</Label>
            <Input
              id="phone"
              type="tel"
              required
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              placeholder="+34 600 000 000"
            />
          </div>

          <div className="space-y-3">
            <Label>¿Tienes experiencia previa? *</Label>
            <RadioGroup
              value={formData.experience}
              onValueChange={(value) => setFormData({ ...formData, experience: value })}
            >
              <div className="flex items-center gap-2">
                <RadioGroupItem value="none" id="none" />
                <Label htmlFor="none" className="font-normal cursor-pointer">
                  Sin experiencia
                </Label>
              </div>
              <div className="flex items-center gap-2">
                <RadioGroupItem value="basic" id="basic" />
                <Label htmlFor="basic" className="font-normal cursor-pointer">
                  Experiencia básica
                </Label>
              </div>
              <div className="flex items-center gap-2">
                <RadioGroupItem value="intermediate" id="intermediate" />
                <Label htmlFor="intermediate" className="font-normal cursor-pointer">
                  Experiencia intermedia
                </Label>
              </div>
              <div className="flex items-center gap-2">
                <RadioGroupItem value="advanced" id="advanced" />
                <Label htmlFor="advanced" className="font-normal cursor-pointer">
                  Experiencia avanzada
                </Label>
              </div>
            </RadioGroup>
          </div>

          <div className="space-y-2">
            <Label htmlFor="expectations">¿Qué esperas del curso? *</Label>
            <Textarea
              id="expectations"
              required
              value={formData.expectations}
              onChange={(e) => setFormData({ ...formData, expectations: e.target.value })}
              placeholder="Cuéntanos qué te gustaría aprender y tus objetivos..."
              className="min-h-[100px] resize-none"
            />
          </div>

          <div className="flex gap-3 pt-4">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)} className="flex-1">
              Cancelar
            </Button>
            <Button type="submit" className="flex-1 bg-primary hover:bg-primary/90">
              Enviar Inscripción
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
