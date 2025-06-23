'use client'

import { createContext, useContext, useState, ReactNode } from 'react'

// ✅ Updated Artist interface
interface Artist {
  id: string
  name: string
  category: string
  location: string
  priceRange: string
  image?: string
  approved: boolean
}

// ✅ Context Type including approve/delete functions
interface GlobalStateContextType {
  artists: Artist[]
  addArtist: (artist: Artist) => void
  approveArtist: (id: string) => void
  deleteArtist: (id: string) => void
}

// ✅ Create context
const GlobalStateContext = createContext<GlobalStateContextType | undefined>(undefined)

export function GlobalStateProvider({ children }: { children: ReactNode }) {
  const [artists, setArtists] = useState<Artist[]>([])

  const addArtist = (artist: Artist) => {
    setArtists((prev) => [...prev, artist])
  }

  const approveArtist = (id: string) => {
    setArtists((prev) =>
      prev.map((artist) =>
        artist.id === id ? { ...artist, approved: true } : artist
      )
    )
  }

  const deleteArtist = (id: string) => {
    setArtists((prev) => prev.filter((artist) => artist.id !== id))
  }

  return (
    <GlobalStateContext.Provider value={{ artists, addArtist, approveArtist, deleteArtist }}>
      {children}
    </GlobalStateContext.Provider>
  )
}

export function useGlobalState() {
  const context = useContext(GlobalStateContext)
  if (!context) throw new Error('useGlobalState must be used within GlobalStateProvider')
  return context
}
