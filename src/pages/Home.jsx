import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Package } from 'lucide-react'
import ListingCard from '../components/ListingCard'
import { SkeletonCard } from '../components/SkeletonLoaders'
import { getCategories, getItems } from '../api/client'

export default function Home() {
  const navigate = useNavigate()
  const [searchQuery, setSearchQuery] = useState('')
  const [categories, setCategories] = useState([])
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function loadDashboard() {
      try {
        setLoading(true)
        const [categoryData, itemData] = await Promise.all([
          getCategories(),
          getItems({ sort: '-total_bookings', page_size: 8 }),
        ])
        setCategories(Array.isArray(categoryData) ? categoryData : categoryData.results || categoryData.categories || [])
        setItems(Array.isArray(itemData) ? itemData : itemData.results || itemData.items || [])
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    loadDashboard()
  }, [])

  const handleSearch = (event) => {
    event.preventDefault()
    navigate(`/explore?q=${encodeURIComponent(searchQuery)}`)
  }

  return (
    <div className="space-y-8">
      <section className="rounded-[2rem] bg-gradient-to-r from-orange-500 to-orange-600 p-8 text-white shadow-xl shadow-orange-200/40 sm:p-12">
        <div className="grid gap-8 lg:grid-cols-[1.4fr_1fr] lg:items-center">
          <div>
            <p className="text-sm uppercase tracking-[0.35em] text-orange-100/80">Welcome back</p>
            <h2 className="mt-4 text-4xl font-semibold leading-tight sm:text-5xl">Rent anything, from anyone, anywhere.</h2>
            <p className="mt-5 max-w-2xl text-lg text-orange-100/90">Tools, cars, cameras, homes, gear — borrow what you need from people nearby and earn on the side.</p>
            <form onSubmit={handleSearch} className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <label className="sr-only" htmlFor="hero-search">
                Search rentals
              </label>
              <input
                id="hero-search"
                type="search"
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                placeholder="Search by item, location, or category"
                className="min-w-0 flex-1 rounded-3xl border border-white/30 bg-white/15 px-5 py-4 text-orange-900 outline-none placeholder:text-orange-200 focus:border-white focus:ring-2 focus:ring-white/40"
              />
              <button type="submit" className="rounded-3xl bg-white px-6 py-4 font-semibold text-orange-600 transition hover:bg-orange-100">
                Search
              </button>
            </form>
          </div>

          <div className="grid gap-4">
            <div className="rounded-[2rem] border border-white/20 bg-white/10 p-6 text-white shadow-lg shadow-orange-200/20">
              <p className="text-sm uppercase tracking-[0.3em] text-orange-100/80">Popular categories</p>
              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                {categories.slice(0, 4).map((category) => (
                  <span key={category.id} className="rounded-3xl bg-white/15 px-4 py-3 text-sm font-medium">
                    {category.name}
                  </span>
                ))}
              </div>
            </div>
            <div className="rounded-[2rem] border border-white/20 bg-white/10 p-6 shadow-lg shadow-orange-200/20">
              <p className="text-sm uppercase tracking-[0.3em] text-orange-100/80">RentHub in numbers</p>
              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                <div className="rounded-3xl bg-white/10 p-4">
                  <p className="text-3xl font-semibold">{categories.length}</p>
                  <p className="text-sm text-orange-100/80">Categories</p>
                </div>
                <div className="rounded-3xl bg-white/10 p-4">
                  <p className="text-3xl font-semibold">{items.length}</p>
                  <p className="text-sm text-orange-100/80">Featured listings</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="rounded-[2rem] bg-white p-6 shadow-sm shadow-slate-200/50 sm:p-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h3 className="text-2xl font-semibold text-slate-900">Browse categories</h3>
            <p className="mt-1 text-sm text-slate-500">Whatever you need — someone nearby has it.</p>
          </div>
          <button
            onClick={() => navigate('/explore')}
            className="rounded-full bg-orange-600 px-5 py-2 text-sm font-semibold text-white transition hover:bg-orange-700"
          >
            View all categories
          </button>
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {loading ? (
            Array.from({ length: 4 }).map((_, index) => (
              <div key={index} className="rounded-3xl border border-slate-200 bg-slate-50 p-5 shadow-sm">
                <div className="mb-4 h-12 w-12 rounded-2xl bg-slate-200 animate-pulse" />
                <div className="h-5 w-3/4 rounded bg-slate-200 animate-pulse" />
                <div className="mt-3 h-4 w-full rounded bg-slate-200 animate-pulse" />
                <div className="mt-2 h-4 w-5/6 rounded bg-slate-200 animate-pulse" />
              </div>
            ))
          ) : categories.length ? (
            categories.map((category) => (
              <div key={category.id} className="rounded-3xl border border-slate-200 bg-slate-50 p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-50 text-orange-600"><Package size={24} /></div>
                <h4 className="text-lg font-semibold text-slate-900">{category.name}</h4>
                <p className="mt-2 text-sm text-slate-500 overflow-hidden text-ellipsis" style={{ display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical' }}>
                  {category.description || 'Popular rentals in this category.'}
                </p>
              </div>
            ))
          ) : (
            <div className="col-span-full rounded-3xl border border-slate-200 bg-slate-50 p-8 text-center text-slate-500">No categories available.</div>
          )}
        </div>
      </section>

      <section>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h3 className="text-2xl font-semibold text-slate-900">Your recent rentals</h3>
            <p className="text-sm text-slate-500">Recommended for you based on trending listings.</p>
          </div>
          <Link to="/explore" className="text-sm font-semibold text-orange-600 hover:text-orange-700">
            Browse all
          </Link>
        </div>

        {error ? (
          <div className="mt-6 rounded-3xl border border-red-200 bg-red-50 p-8 text-red-700">Unable to load dashboard data: {error}</div>
        ) : (
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {loading ? (
              Array.from({ length: 4 }).map((_, index) => <SkeletonCard key={index} />)
            ) : items.length ? (
              items.map((item) => <ListingCard key={item.id} item={item} />)
            ) : (
              <p className="col-span-full text-center py-8 text-slate-500">No items available.</p>
            )}
          </div>
        )}
      </section>
    </div>
  )
}
