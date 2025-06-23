'use client'

import Header from '@/components/Header'
import DashboardTable from '@/components/DashboardTable'
import { useGlobalState } from '@/context/GlobalStateContext'

export default function DashboardPage() {
  const { artists } = useGlobalState() // ✅ Get all dynamic artists from global state

  return (
    <div>
      <Header />

      <main className="max-w-6xl mx-auto px-4 py-10">
        <h1 className="text-4xl font-extrabold text-yellow-700 mb-6 text-center">
          Manager Dashboard
        </h1>

        <p className="text-center text-gray-600 mb-8">
          View all artist submissions and manage their details.
        </p>

        <DashboardTable data={artists} /> {/* ✅ Show dynamic artists */}
      </main>
    </div>
  )
}
