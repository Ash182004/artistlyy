'use client'

import { useState } from 'react'

interface Artist {
  name: string
  category: string
  priceRange: string
  location: string
  image: string
}

export default function ArtistCard({ artist }: { artist: Artist }) {
  const [showPopup, setShowPopup] = useState(false)

  return (
    <>
      <div className="bg-white border border-yellow-200 rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300">
        <img
          src={artist.image}
          alt={artist.name}
          className="w-full h-48 object-cover"
        />

        <div className="p-4 space-y-1">
          <h3 className="text-xl font-semibold text-yellow-700">{artist.name}</h3>
          <p className="text-sm text-gray-600">{artist.category} • {artist.location}</p>
          <p className="text-sm text-yellow-600 font-medium">{artist.priceRange}</p>

          <button
            onClick={() => setShowPopup(true)}
            className="mt-3 w-full bg-yellow-500 text-white py-2 rounded-md font-medium hover:bg-yellow-600 transition"
          >
            Ask for Quote
          </button>
        </div>
      </div>

      {showPopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-white/30">
          <div className="relative w-full max-w-2xl mx-4 bg-white rounded-lg shadow-2xl p-8">
            {/* Close Button */}
            <button
              onClick={() => setShowPopup(false)}
              className="absolute top-4 right-5 text-gray-500 hover:text-red-500 text-xl font-bold"
            >
              &times;
            </button>

            <h2 className="text-2xl font-bold mb-2 text-yellow-700">Request a Quote</h2>
            <p className="mb-6 text-gray-700">
              Interested in booking <strong>{artist.name}</strong>? Fill out your details and we’ll get back to you.
            </p>

            <form
              onSubmit={(e) => {
                e.preventDefault()
                alert(`Booking request sent for ${artist.name}`)
                setShowPopup(false)
              }}
              className="grid gap-4"
            >
              <input
                type="text"
                placeholder="Your Name"
                className="w-full border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
                required
              />
              <input
                type="email"
                placeholder="Your Email"
                className="w-full border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
                required
              />
              <textarea
                placeholder="Your Message"
                className="w-full border border-gray-300 px-4 py-2 rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-yellow-400"
                rows={4}
              />
              <button
                type="submit"
                className="bg-yellow-500 w-full py-2 rounded-md text-white font-semibold hover:bg-yellow-600 transition"
              >
                Submit Request
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  )
}
