'use client'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import artistsData from '@/data/artists.json'
import ArtistCard from '@/components/ArtistCard'
import FilterBlock from '@/components/FilterBlock'
import Header from '@/components/Header'
import { useGlobalState } from '@/context/GlobalStateContext'
import type { Artist } from '@/types/artist'


// Utility to get unique values
const unique = (arr: string[]) => Array.from(new Set(arr))

export default function ArtistListingPage() {
  const searchParams = useSearchParams()
  const initialCategory = searchParams.get('category') || ''

  const [category, setCategory] = useState('')
  const [location, setLocation] = useState('')
  const [priceRange, setPriceRange] = useState('')
  
  const { artists } = useGlobalState()
 

const [filtered, setFiltered] = useState<Artist[]>([])


  // Set category from URL (only once on mount)
  useEffect(() => {
    if (initialCategory) {
      setCategory(initialCategory)
    }
  }, [initialCategory])

  // Combine static + dynamic artists
  const allArtists = [...artistsData, ...artists]

  // Filter logic
 useEffect(() => {
  let result = [...allArtists].filter((a) => a.approved) // ✅ Only show approved artists
  if (category) result = result.filter((a) => a.category === category)
  if (location) result = result.filter((a) => a.location === location)
  if (priceRange) result = result.filter((a) => a.priceRange === priceRange)
  setFiltered(result)
}, [category, location, priceRange, artists])


  return (
    <div className="bg-white min-h-screen">
      <Header />
      <main className="max-w-6xl mx-auto px-4 py-10">
        <h1 className="text-4xl font-extrabold text-yellow-700 mb-10 text-center">
          Explore Performing Artists
        </h1>

        <div className="grid md:grid-cols-4 gap-6 mb-6">
          <FilterBlock
            label="Category"
            options={unique(allArtists.map((a) => a.category))}
            value={category}
            onChange={setCategory}
          />
          <FilterBlock
            label="Location"
            options={unique(allArtists.map((a) => a.location))}
            value={location}
            onChange={setLocation}
          />
          <FilterBlock
            label="Price Range"
            options={unique(allArtists.map((a) => a.priceRange))}
            value={priceRange}
            onChange={setPriceRange}
          />
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((artist, index) => (
            <ArtistCard key={artist.id ?? `${artist.name}-${index}`} artist={artist} />
          ))}
          {filtered.length === 0 && <p>No artists found.</p>}
        </div>
      </main>
    </div>
  )
}
