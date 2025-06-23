interface FilterBlockProps {
  label: string
  options: string[]
  value: string
  onChange: (val: string) => void
}

export default function FilterBlock({ label, options, value, onChange }: FilterBlockProps) {
  return (
    <div className="mb-4">
      <label className="block font-semibold mb-1">{label}</label>
      <select
        className="w-full border rounded px-3 py-2"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        <option value="">All</option>
        {options.map((opt) => (
          <option key={opt} value={opt}>{opt}</option>
        ))}
      </select>
    </div>
  )
}
