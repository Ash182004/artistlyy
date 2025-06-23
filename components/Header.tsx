"use client"
import Link from "next/link"
import { useState } from "react"
import { Menu, X } from "lucide-react"

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="text-2xl font-extrabold text-yellow-600">
          Artistly
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex space-x-8 text-yellow-800 font-medium">
          <Link href="/" className="hover:text-yellow-600 transition">Home</Link>
          <Link href="/artists" className="hover:text-yellow-600 transition">Artists</Link>
          <Link href="/onboard" className="hover:text-yellow-600 transition">Onboard Artist</Link>
          <Link href="/dashboard" className="hover:text-yellow-600 transition">Dashboard</Link>
        </nav>

        {/* Mobile Toggle */}
        <button onClick={() => setIsOpen(!isOpen)} className="md:hidden text-yellow-700">
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white shadow-md px-4 pb-4 space-y-2 text-yellow-800 font-medium">
          <Link href="/" onClick={() => setIsOpen(false)} className="block hover:text-yellow-600">Home</Link>
          <Link href="/artists" onClick={() => setIsOpen(false)} className="block hover:text-yellow-600">Artists</Link>
          <Link href="/onboard" onClick={() => setIsOpen(false)} className="block hover:text-yellow-600">Onboard Artist</Link>
          <Link href="/dashboard" onClick={() => setIsOpen(false)} className="block hover:text-yellow-600">Dashboard</Link>
        </div>
      )}
    </header>
  )
}
