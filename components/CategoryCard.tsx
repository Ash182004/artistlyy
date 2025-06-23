'use client'

import { useRouter } from 'next/navigation'

interface Category {
  id: number
  label: string
  value: string
  image: string
}

export default function CategoryCard({ category }: { category: Category }) {
  const router = useRouter()

  const handleClick = () => {
    router.push(`/artists?category=${encodeURIComponent(category.value)}`)
  }

  return (
    <div
      onClick={handleClick}
      className="cursor-pointer bg-white shadow-lg rounded-xl overflow-hidden hover:scale-105 transition-transform border-2 border-yellow-400"
    >
      <img
        src={category.image}
        alt={category.label}
        className="w-full h-48 object-cover"
      />
      <div className="p-6 text-center">
        <h3 className="text-2xl font-semibold text-yellow-700">{category.label}</h3>
        <p className="text-sm text-gray-500 mt-1">
          Explore {category.label.toLowerCase()} artists
        </p>
      </div>
    </div>
  )
}
