'use client'
import type { Artist } from '@/types/artist'

import { useState } from 'react'
import { useGlobalState } from '@/context/GlobalStateContext'



export default function DashboardTable({ data }: { data: Artist[] }) {
  const [selectedArtist, setSelectedArtist] = useState<Artist | null>(null)
  const { approveArtist, deleteArtist } = useGlobalState()

  if (data.length === 0) {
    return <p className="text-center mt-10 text-gray-500 text-lg">No submissions yet.</p>
  }

  const handleApprove = () => {
    if (selectedArtist) {
     approveArtist(String(selectedArtist.id))

      setSelectedArtist(null)
    }
  }

  const handleDelete = () => {
    if (selectedArtist) {
     deleteArtist(String(selectedArtist.id))

      setSelectedArtist(null)
    }
  }

  return (
    <div className="overflow-x-auto mt-10 rounded-xl shadow-sm border border-yellow-200">
      <table className="min-w-full text-sm text-gray-700 bg-white">
        <thead className="bg-yellow-50 border-b border-yellow-200">
          <tr>
            <th className="px-6 py-4 font-semibold text-left text-yellow-700">Name</th>
            <th className="px-6 py-4 font-semibold text-left text-yellow-700">Category</th>
            <th className="px-6 py-4 font-semibold text-left text-yellow-700">Location</th>
            <th className="px-6 py-4 font-semibold text-left text-yellow-700">Fee</th>
            <th className="px-6 py-4 font-semibold text-left text-yellow-700">Action</th>
          </tr>
        </thead>
        <tbody>
          {data.map((artist) => (
            <tr key={artist.id} className="hover:bg-yellow-50 transition-colors duration-200">
              <td className="px-6 py-3">{artist.name}</td>
              <td className="px-6 py-3">{artist.category}</td>
              <td className="px-6 py-3">{artist.location}</td>
              <td className="px-6 py-3">{artist.priceRange}</td>
              <td className="px-6 py-3">
                <button
                  className="bg-yellow-500 text-white px-4 py-1.5 rounded-md text-sm hover:bg-yellow-600 transition"
                  onClick={() => setSelectedArtist(artist)}
                >
                  View
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal */}
      {selectedArtist && (
        <div className="fixed inset-0 z-50 bg-black/10 backdrop-blur-sm flex items-center justify-center">
          <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-xl relative">
            <button
              onClick={() => setSelectedArtist(null)}
              className="absolute top-4 right-4 text-gray-500 hover:text-red-500 text-xl"
            >
              &times;
            </button>
            <h2 className="text-2xl font-bold text-yellow-700 mb-4">{selectedArtist.name}</h2>
            <p><strong>Category:</strong> {selectedArtist.category}</p>
            <p><strong>Location:</strong> {selectedArtist.location}</p>
            <p><strong>Fee Range:</strong> {selectedArtist.priceRange}</p>
            {selectedArtist.bio && <p className="mt-2"><strong>Bio:</strong> {selectedArtist.bio}</p>}
            {selectedArtist.languages && (
              <p className="mt-2">
                <strong>Languages:</strong> {selectedArtist.languages.join(', ')}
              </p>
            )}
            <div className="flex gap-4 mt-6">
              <button
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                onClick={handleApprove}
              >
                Approve
              </button>
              <button
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                onClick={handleDelete}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
