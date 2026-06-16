import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import ListingCard from '../components/ListingCard'
import { SkeletonListingGrid } from '../components/SkeletonLoaders'
import { getCategories, getItems } from '../api/client'

export default function Explore() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [items, setItems] = useState([])
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [query, setQuery] = useState(searchParams.get('q') || '')
  const [category, setCategory] = useState(searchParams.get('category') || '')

  useEffect(() => {
    setQuery(searchParams.get('q') || '')
    setCategory(searchParams.get('category') || '')
  }, [searchParams])

  useEffect(() => {
    async function loadExplore() {
      try {
        setLoading(true)
        setError(null)
        const [categoryData, itemData] = await Promise.all([
          getCategories(),
          getItems({ q: searchParams.get('q') || '', category: searchParams.get('category') || '', page_size: 9 }),
        ])
        setCategories(Array.isArray(categoryData) ? categoryData : categoryData.results || categoryData.categories || [])
        setItems(Array.isArray(itemData) ? itemData : itemData.results || itemData.items || [])
      } catch (err) {
        setError(err.message)
        setItems([])
      } finally {
        setLoading(false)
      }
    }

    loadExplore()
  }, [searchParams])

  const handleSearch = (event) => {
    event.preventDefault()
    const params = new URLSearchParams()
    if (query) params.set('q', query)
    if (category) params.set('category', category)
    setSearchParams(params)
  }

  return (
    <div className="space-y-8">
      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-semibold">Explore rentals</h1>
            <p className="text-sm text-slate-500">Filter and browse available items from hosts near you.</p>
          </div>
          <form onSubmit={handleSearch} className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search rentals"
              className="min-w-[220px] rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
            />
            <select
              value={category}
              onChange={(event) => setCategory(event.target.value)}
              className="rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
            >
              <option value="">All categories</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.slug}>
                  {cat.name}
                </option>
              ))}
            </select>
            <button type="submit" className="rounded-3xl bg-orange-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-orange-700">
              Search
            </button>
          </form>
        </div>
      </div>

      {error ? (
        <div className="rounded-3xl border border-red-200 bg-red-50 p-8 text-red-700">Unable to load rentals: {error}</div>
      ) : loading ? (
        <SkeletonListingGrid />
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {items.length ? (
            items.map((item) => <ListingCard key={item.id} item={item} />)
          ) : (
            <div className="col-span-full rounded-3xl border border-slate-200 bg-slate-50 p-10 text-center text-slate-500">No rentals found.</div>
          )}
        </div>
      )}
    </div>
  )
}
