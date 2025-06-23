export interface Artist {
  id: string | number
  name: string
  category: string
  priceRange: string
  location: string
  image?: string
  approved: boolean
  bio?: string
  languages?: string[]
}

