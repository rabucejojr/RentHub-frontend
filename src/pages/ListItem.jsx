import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Tag, MapPin, DollarSign, FileText, CheckCircle, Image as ImageIcon } from 'lucide-react'
import { getCategories, createItem } from '../api/client'

const CONDITIONS = ['Excellent', 'Good', 'Fair']

function Field({ label, icon: Icon, children }) {
  return (
    <div>
      <label className="mb-2 flex items-center gap-2 text-sm font-medium text-slate-900">
        {Icon && <Icon size={14} className="text-slate-400" />}
        {label}
      </label>
      {children}
    </div>
  )
}

const inputCls =
  'w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-900 outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-100'

export default function ListItem() {
  const navigate = useNavigate()
  const [categories, setCategories] = useState([])
  const [title, setTitle] = useState('')
  const [categoryId, setCategoryId] = useState('')
  const [description, setDescription] = useState('')
  const [condition, setCondition] = useState('')
  const [pricePerDay, setPricePerDay] = useState('')
  const [city, setCity] = useState('')
  const [imageUrl, setImageUrl] = useState('')
  const [available, setAvailable] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(false)

  useEffect(() => {
    getCategories().then((data) => {
      setCategories(Array.isArray(data) ? data : data.categories || data.results || [])
    })
  }, [])

  function resetForm() {
    setTitle('')
    setCategoryId('')
    setDescription('')
    setCondition('')
    setPricePerDay('')
    setCity('')
    setImageUrl('')
    setAvailable(true)
    setError(null)
  }

  async function handleSubmit(e) {
    e.preventDefault()
    if (!title.trim() || !categoryId || !description.trim() || !condition || !pricePerDay || !city.trim()) {
      return setError('Please fill in all required fields.')
    }
    if (Number(pricePerDay) < 1) return setError('Price must be at least ₱1 per day.')
    setSubmitting(true)
    setError(null)
    try {
      await createItem({
        title: title.trim(),
        category_id: Number(categoryId),
        description: description.trim(),
        condition,
        price_per_day: Number(pricePerDay),
        city: city.trim(),
        image_url: imageUrl.trim() || null,
        is_available: available,
      })
      setSuccess(true)
    } catch (err) {
      setError(err.message || 'Failed to create listing.')
    } finally {
      setSubmitting(false)
    }
  }

  if (success) {
    return (
      <div className="space-y-6">
        <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
          <h1 className="text-3xl font-semibold text-slate-900">List an item</h1>
          <p className="mt-2 text-sm text-slate-500">Create a new listing so others can rent your gear, tools, or vehicles.</p>
        </div>
        <div className="rounded-3xl border border-emerald-200 bg-emerald-50 p-12 text-center shadow-sm">
          <CheckCircle size={48} className="mx-auto mb-4 text-emerald-500" />
          <h2 className="text-2xl font-semibold text-slate-900">Listing created!</h2>
          <p className="mt-2 text-slate-500">Your item is now available for others to rent.</p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <button
              onClick={() => navigate('/explore')}
              className="rounded-3xl bg-orange-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-orange-700"
            >
              Browse listings
            </button>
            <button
              onClick={() => { setSuccess(false); resetForm() }}
              className="rounded-3xl border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
            >
              Create another
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
        <h1 className="text-3xl font-semibold text-slate-900">List an item</h1>
        <p className="mt-2 text-sm text-slate-500">Create a new listing so others can rent your gear, tools, or vehicles.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6" noValidate>
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="mb-5 text-lg font-semibold text-slate-900">Item details</h2>
            <div className="space-y-4">
              <Field label="Title *" icon={Tag}>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => { setTitle(e.target.value); setError(null) }}
                  placeholder="e.g. Power Drill, DSLR Camera"
                  maxLength={120}
                  className={inputCls}
                />
              </Field>

              <Field label="Category *" icon={Tag}>
                <select
                  value={categoryId}
                  onChange={(e) => { setCategoryId(e.target.value); setError(null) }}
                  className={inputCls}
                >
                  <option value="">Select a category</option>
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                  ))}
                </select>
              </Field>

              <Field label="Description *" icon={FileText}>
                <textarea
                  value={description}
                  onChange={(e) => { setDescription(e.target.value); setError(null) }}
                  placeholder="Describe your item — condition, what's included, any restrictions."
                  rows={4}
                  className={`${inputCls} resize-none`}
                />
              </Field>

              <Field label="Image URL (optional)" icon={ImageIcon}>
                <input
                  type="url"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  placeholder="https://example.com/photo.jpg"
                  className={inputCls}
                />
              </Field>
            </div>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="mb-5 text-lg font-semibold text-slate-900">Pricing & availability</h2>
            <div className="space-y-4">
              <Field label="Price per day (₱) *" icon={DollarSign}>
                <input
                  type="number"
                  value={pricePerDay}
                  onChange={(e) => { setPricePerDay(e.target.value); setError(null) }}
                  placeholder="0"
                  min={1}
                  className={inputCls}
                />
              </Field>

              <Field label="City *" icon={MapPin}>
                <input
                  type="text"
                  value={city}
                  onChange={(e) => { setCity(e.target.value); setError(null) }}
                  placeholder="e.g. Manila, Quezon City"
                  className={inputCls}
                />
              </Field>

              <Field label="Condition *" icon={Tag}>
                <select
                  value={condition}
                  onChange={(e) => { setCondition(e.target.value); setError(null) }}
                  className={inputCls}
                >
                  <option value="">Select condition</option>
                  {CONDITIONS.map((c) => (
                    <option key={c} value={c.toLowerCase()}>{c}</option>
                  ))}
                </select>
              </Field>

              <div className="flex items-center justify-between rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
                <span className="text-sm font-medium text-slate-900">Available now</span>
                <button
                  type="button"
                  onClick={() => setAvailable((v) => !v)}
                  className={`relative h-6 w-11 rounded-full transition-colors ${available ? 'bg-orange-500' : 'bg-slate-300'}`}
                  aria-label="Toggle availability"
                >
                  <span
                    className={`absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform ${available ? 'translate-x-5' : 'translate-x-0'}`}
                  />
                </button>
              </div>
            </div>
          </div>
        </div>

        {error && (
          <div className="rounded-3xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
            {error}
          </div>
        )}

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={submitting}
            className="rounded-3xl bg-orange-600 px-8 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-orange-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {submitting ? 'Creating listing…' : 'Create listing'}
          </button>
        </div>
      </form>
    </div>
  )
}
