import { Menu } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <div className="text-2xl font-bold text-primary">🥖 Panadería Artesanal</div>
        </div>

        <nav className="hidden md:flex items-center gap-6">
          <a href="#inicio" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
            Inicio
          </a>
          <a href="#nosotros" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
            Nosotros
          </a>
          <a href="#cursos" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
            Cursos
          </a>
          <a href="#recetas" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
            Recetas
          </a>
        </nav>

        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-5 w-5" />
        </Button>
      </div>
    </header>
  )
}
