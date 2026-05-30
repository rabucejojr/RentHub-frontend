import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { getItem } from '../api/client'

export default function ItemDetail() {
  const { id } = useParams()
  const [item, setItem] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function loadItem() {
      try {
        setLoading(true)
        setError(null)
        const data = await getItem(id)
        setItem(data)
      } catch (err) {
        setError(err.message)
        setItem(null)
      } finally {
        setLoading(false)
      }
    }

    loadItem()
  }, [id])

  if (loading) {
    return (
      <div className="space-y-8">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="grid gap-8 lg:grid-cols-[1.4fr_1fr] lg:items-start lg:gap-8">
            <div className="min-h-[320px] rounded-3xl bg-slate-200 animate-pulse" />
            <div className="space-y-4">
              <div className="h-5 w-1/4 rounded bg-slate-200 animate-pulse" />
              <div className="h-10 w-full rounded bg-slate-200 animate-pulse" />
              <div className="h-4 w-full rounded bg-slate-200 animate-pulse" />
              <div className="h-4 w-5/6 rounded bg-slate-200 animate-pulse" />
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="h-24 rounded-3xl bg-slate-200 animate-pulse" />
                <div className="h-24 rounded-3xl bg-slate-200 animate-pulse" />
              </div>
            </div>
          </div>
        </div>
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="h-6 w-1/4 rounded bg-slate-200 animate-pulse" />
          <div className="mt-4 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {Array.from({ length: 3 }).map((_, index) => (
              <div key={index} className="h-56 rounded-3xl bg-slate-200 animate-pulse" />
            ))}
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return <div className="rounded-3xl border border-red-200 bg-red-50 p-12 text-center shadow-sm">{error}</div>
  }

  if (!item) {
    return <div className="rounded-3xl border border-slate-200 bg-white p-12 text-center shadow-sm">Item not found.</div>
  }

  const condition = item.condition ? item.condition.replace(/_/g, ' ') : 'Unknown'

  return (
    <div className="space-y-8">
      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:gap-8">
          <div className="min-h-[320px] flex-1 overflow-hidden rounded-3xl bg-slate-100">
            {item.main_image ? (
              <img src={item.main_image} alt={item.title} className="h-full w-full object-cover" />
            ) : (
              <div className="flex h-full items-center justify-center text-slate-400">No image available</div>
            )}
          </div>
          <div className="flex-1">
            <p className="text-sm uppercase tracking-[0.24em] text-orange-600">{item.category?.name || 'Category'}</p>
            <h1 className="mt-3 text-4xl font-semibold text-slate-900">{item.title}</h1>
            <p className="mt-4 text-slate-600">{item.description || 'No description provided.'}</p>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
                <p className="text-sm text-slate-500">Price</p>
                <p className="mt-2 text-2xl font-semibold text-slate-900">${item.price_per_day ?? 'N/A'}/day</p>
              </div>
              <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
                <p className="text-sm text-slate-500">Location</p>
                <p className="mt-2 text-lg font-semibold text-slate-900">{item.city || 'Unknown'},{' '}{item.state || 'Anywhere'}</p>
              </div>
            </div>
            <div className="mt-6 flex flex-wrap gap-3">
              <span className="rounded-3xl bg-orange-50 px-4 py-2 text-sm font-semibold text-orange-700">{condition}</span>
              <span className={`rounded-3xl px-4 py-2 text-sm ${item.is_available ? 'bg-emerald-50 text-emerald-700' : 'bg-slate-100 text-slate-600'}`}>
                {item.is_available ? 'Available' : 'Unavailable'}
              </span>
            </div>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <button className="rounded-3xl bg-orange-600 px-6 py-3 text-white transition hover:bg-orange-700">Request rental</button>
              <Link to="/explore" className="text-sm font-semibold text-orange-600 hover:text-orange-700">Back to browse</Link>
            </div>
          </div>
        </div>
      </div>
      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-2xl font-semibold">More photos</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {item.images?.length ? (
            item.images.map((src) => (
              <img key={src} src={src} alt={item.title} className="h-56 w-full rounded-3xl object-cover" />
            ))
          ) : (
            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-8 text-slate-500">No additional photos available.</div>
          )}
        </div>
      </div>
    </div>
  )
}
