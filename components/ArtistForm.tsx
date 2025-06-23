"use client"

import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { useState } from 'react'

import { useGlobalState } from '@/context/GlobalStateContext'

const schema = yup.object({
  name: yup.string().required('Name is required'),
  bio: yup.string().required('Bio is required'),
  category: yup.array().of(yup.string()).min(1, 'Select at least one category').required(),
  languages: yup.array().of(yup.string()).min(1, 'Select at least one language').required(),
  feeRange: yup.string().required('Fee range is required'),
  location: yup.string().required('Location is required'),
})



const categories = ['Singer', 'Dancer', 'DJ', 'Speaker']
const languages = ['Hindi', 'English', 'Tamil', 'Punjabi']
const feeOptions = ['₹10k - ₹30k', '₹20k - ₹50k', '₹30k - ₹60k', '₹50k+']

interface ArtistFormData {
  name: string
  bio: string
  category: string[]
  languages: string[]
  feeRange: string
  location: string
}

export default function ArtistForm() {
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const { addArtist } = useGlobalState()
  

  const {
    register,
    handleSubmit,
    control,
     reset,
    formState: { errors },
  } = useForm<ArtistFormData>({   // ✅ Add <ArtistFormData>
  resolver: yupResolver(schema),
  defaultValues: {
    category: [],
    languages: [],
  },
})

  const onSubmit = (data: ArtistFormData) => {
  const newArtist = {
    id: crypto.randomUUID(),
    name: data.name,
    category: data.category[0], // assuming one
    location: data.location,
    priceRange: data.feeRange,
    image: imagePreview || "/default-image.jpg",
    bio: data.bio,
    languages: data.languages,
    approved: false,
  }

  addArtist(newArtist)
  alert('Artist registered successfully!')
  reset()
  setImagePreview(null)
}


  const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-2xl mx-auto bg-white p-8 rounded-xl shadow-md space-y-6 mt-10"
    >
      <h2 className="text-3xl font-extrabold text-yellow-700 text-center">
        Artist Onboarding Form
      </h2>

      {/* Name */}
      <div>
        <label className="block font-semibold mb-1">Name</label>
        <input
          {...register('name')}
          className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-yellow-500"
        />
        <p className="text-red-500 text-sm mt-1">{errors.name?.message}</p>
      </div>

      {/* Bio */}
      <div>
        <label className="block font-semibold mb-1">Bio</label>
        <textarea
          {...register('bio')}
          rows={3}
          className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-yellow-500"
        />
        <p className="text-red-500 text-sm mt-1">{errors.bio?.message}</p>
      </div>

      {/* Category */}
      <div>
        <label className="block font-semibold mb-1">Category</label>
        <Controller
          control={control}
          name="category"
          render={({ field }) => (
            <div className="grid grid-cols-2 gap-3">
              {categories.map((cat) => (
                <label key={cat} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    value={cat}
                    checked={field.value.includes(cat)}
                    onChange={(e) => {
                      const checked = e.target.checked
                      if (checked) field.onChange([...field.value, cat])
                      else field.onChange(field.value.filter((v: string) => v !== cat))
                    }}
                    className="accent-yellow-500"
                  />
                  <span>{cat}</span>
                </label>
              ))}
            </div>
          )}
        />
        <p className="text-red-500 text-sm mt-1">{errors.category?.message}</p>
      </div>

      {/* Languages */}
      <div>
        <label className="block font-semibold mb-1">Languages Spoken</label>
        <Controller
          control={control}
          name="languages"
          render={({ field }) => (
            <div className="grid grid-cols-2 gap-3">
              {languages.map((lang) => (
                <label key={lang} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    value={lang}
                    checked={field.value.includes(lang)}
                    onChange={(e) => {
                      const checked = e.target.checked
                      if (checked) field.onChange([...field.value, lang])
                      else field.onChange(field.value.filter((v: string) => v !== lang))
                    }}
                    className="accent-yellow-500"
                  />
                  <span>{lang}</span>
                </label>
              ))}
            </div>
          )}
        />
        <p className="text-red-500 text-sm mt-1">{errors.languages?.message}</p>
      </div>

      {/* Fee Range */}
      <div>
        <label className="block font-semibold mb-1">Fee Range</label>
        <select
          {...register('feeRange')}
          className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-yellow-500"
        >
          <option value="">Select...</option>
          {feeOptions.map((fee) => (
            <option key={fee} value={fee}>
              {fee}
            </option>
          ))}
        </select>
        <p className="text-red-500 text-sm mt-1">{errors.feeRange?.message}</p>
      </div>

      {/* Location */}
      <div>
        <label className="block font-semibold mb-1">Location</label>
        <input
          {...register('location')}
          className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-yellow-500"
        />
        <p className="text-red-500 text-sm mt-1">{errors.location?.message}</p>
      </div>

      {/* Profile Image */}
      <div>
        <label className="block font-semibold mb-1">Profile Image (optional)</label>
        <input type="file" accept="image/*" onChange={handleImage} />
        {imagePreview && (
          <img
            src={imagePreview}
            alt="Preview"
            className="w-32 h-32 object-cover mt-3 rounded-md border border-yellow-200"
          />
        )}
      </div>

      <button
        type="submit"
        className="w-full bg-yellow-500 text-white font-semibold py-2 rounded-md hover:bg-yellow-600 transition"
      >
        Submit
      </button>
    </form>
  )
}
