import Header from '@/components/Header'
import CategoryCard from '@/components/CategoryCard'
import categories from '@/data/categories.json'

export default function HomePage() {
  return (
    <div>
      <Header />

      <section className="text-center p-10 bg-yellow-50">
        <h1 className="text-5xl font-extrabold mb-4 text-yellow-700">Welcome to Artistly</h1>
        <p className="mb-6 text-lg text-yellow-800">Book top performers for your events!</p>
        <a href="/artists" className="bg-yellow-500 text-white px-6 py-2 rounded hover:bg-yellow-600 transition font-semibold">
          Explore Artists
        </a>
      </section>

      <section className="flex flex-col items-center justify-center p-10 bg-white">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl">
          {categories.map((cat) => (
            <CategoryCard key={cat.id} category={cat} />
          ))}
        </div>
      </section>
    </div>
  )
}
