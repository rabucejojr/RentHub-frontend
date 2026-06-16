import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Package } from 'lucide-react'
import { GuestLayout } from '../components/GuestLayout'
import { SkeletonHero, SkeletonStats, SkeletonCategoryGrid, SkeletonListingGrid } from '../components/SkeletonLoaders'
import { getCategories, getItems } from '../api/client'
import { MOCK_STATS } from '../api/mockData'
import ListingCard from '../components/ListingCard'

export default function GuestHome() {
  const [categories, setCategories] = useState([])
  const [trendingItems, setTrendingItems] = useState([])
  const [stats, setStats] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [searchQuery, setSearchQuery] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true)
        setError(null)
        const [categoriesData, itemsData] = await Promise.all([getCategories(), getItems({ limit: 6 })])
        const cats = Array.isArray(categoriesData) ? categoriesData : categoriesData.categories || categoriesData.results || []
        const items = Array.isArray(itemsData) ? itemsData : itemsData.items || itemsData.results || []
        setCategories(cats)
        setTrendingItems(items)
        setStats({ totalListings: items.length })
      } catch (err) {
        setError(err.message || 'Failed to load data.')
        setStats({ totalListings: MOCK_STATS.total_listings })
      } finally {
        setLoading(false)
      }
    }
    loadData()
  }, [])

  function handleSearch() {
    if (searchQuery.trim()) {
      navigate(`/browse?q=${encodeURIComponent(searchQuery)}`)
    }
  }

  return (
    <GuestLayout>
      <div className="space-y-12">
        {loading ? (
          <SkeletonHero />
        ) : (
          <section className="rounded-3xl bg-gradient-to-r from-orange-500 to-orange-600 px-6 py-12 text-white sm:px-8 sm:py-16">
            <div className="mx-auto max-w-2xl text-center">
              <h1 className="text-4xl font-bold sm:text-5xl">Rent Anything, From Anyone</h1>
              <p className="mt-4 text-lg text-orange-100">
                Discover thousands of items available for rent in your area. Save money, share resources, and build community.
              </p>
              <div className="mt-8 flex gap-3 sm:flex-row flex-col">
                <input
                  type="text"
                  placeholder="Search for items..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                  className="flex-1 rounded-2xl border-0 bg-white/20 px-4 py-3 placeholder-white/70 text-white outline-none backdrop-blur-sm focus:ring-2 focus:ring-white"
                />
                <button
                  onClick={handleSearch}
                  className="rounded-2xl bg-white px-6 py-3 font-semibold text-orange-600 shadow-lg transition hover:bg-orange-50"
                >
                  Search
                </button>
              </div>
            </div>
          </section>
        )}

        {error && (
          <div className="rounded-3xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
            {error}
          </div>
        )}

        {loading ? (
          <SkeletonStats />
        ) : stats ? (
          <section className="grid grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-6">
            <div className="rounded-3xl border border-slate-200 bg-white p-6 text-center shadow-sm">
              <p className="text-3xl font-bold text-orange-600 sm:text-4xl">{stats.totalListings}+</p>
              <p className="mt-2 text-sm text-slate-600">Active Listings</p>
            </div>
            <div className="rounded-3xl border border-slate-200 bg-white p-6 text-center shadow-sm">
              <p className="text-3xl font-bold text-orange-600 sm:text-4xl">{MOCK_STATS.total_users.toLocaleString()}</p>
              <p className="mt-2 text-sm text-slate-600">Active Users</p>
            </div>
            <div className="rounded-3xl border border-slate-200 bg-white p-6 text-center shadow-sm">
              <p className="text-3xl font-bold text-orange-600 sm:text-4xl">{MOCK_STATS.total_rentals.toLocaleString()}+</p>
              <p className="mt-2 text-sm text-slate-600">Successful Rentals</p>
            </div>
          </section>
        ) : null}

        {loading ? (
          <div>
            <div className="mb-6 h-8 w-48 rounded bg-slate-200 animate-pulse" />
            <SkeletonCategoryGrid />
          </div>
        ) : categories.length > 0 ? (
          <section>
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-slate-900">Shop by Category</h2>
            </div>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
              {categories.slice(0, 6).map((category) => (
                <button
                  key={category.id}
                  onClick={() => navigate(`/browse?category=${category.slug}`)}
                  className="group rounded-3xl border border-slate-200 bg-white p-4 text-center shadow-sm transition hover:border-orange-300 hover:bg-orange-50"
                >
                  <div className="flex justify-center text-orange-500">
                    <Package size={28} />
                  </div>
                  <p className="mt-2 text-sm font-medium text-slate-900">{category.name}</p>
                </button>
              ))}
            </div>
          </section>
        ) : null}

        {loading ? (
          <div>
            <div className="mb-6 h-8 w-48 rounded bg-slate-200 animate-pulse" />
            <SkeletonListingGrid />
          </div>
        ) : trendingItems.length > 0 ? (
          <section>
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-slate-900">Trending Now</h2>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {trendingItems.map((item) => (
                <ListingCard key={item.id} item={item} />
              ))}
            </div>
          </section>
        ) : null}

        {!loading && (
          <section className="rounded-3xl bg-slate-900 px-6 py-12 text-center text-white sm:px-8 sm:py-16">
            <h2 className="text-3xl font-bold sm:text-4xl">Ready to explore?</h2>
            <p className="mt-4 text-lg text-slate-300">
              Sign up to create your first listing or browse more items today.
            </p>
            <div className="mt-8 flex gap-4 justify-center flex-wrap">
              <a
                href="/signup"
                className="rounded-2xl bg-orange-600 px-8 py-3 font-semibold text-white shadow-lg transition hover:bg-orange-700"
              >
                Create Account
              </a>
              <a
                href="/browse"
                className="rounded-2xl border border-white px-8 py-3 font-semibold text-white transition hover:bg-white/10"
              >
                Continue Browsing
              </a>
            </div>
          </section>
        )}
      </div>
    </GuestLayout>
  )
}
