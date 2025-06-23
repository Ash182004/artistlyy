import ArtistForm from '@/components/ArtistForm'
import Header from '@/components/Header'

export default function OnboardPage() {
  return (
    <div>
      <Header />
      <main className="p-6 bg-gray-50 min-h-screen">
        <ArtistForm />
      </main>
    </div>
  )
}
