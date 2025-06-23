// app/artists/page.tsx
import { Suspense } from 'react'
import ArtistListingPage from '@/components/ArtistListingPage'

export default function ArtistsPage() {
  return (
    <Suspense fallback={<div>Loading artists...</div>}>
      <ArtistListingPage />
    </Suspense>
  )
}
