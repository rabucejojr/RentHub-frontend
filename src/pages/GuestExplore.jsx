import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { GuestLayout } from '../components/GuestLayout'
import { SkeletonListingGrid } from '../components/SkeletonLoaders'
import { getCategories, getItems } from '../api/client'
import ListingCard from '../components/ListingCard'

export default function GuestExplore() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [items, setItems] = useState([])
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || '')
  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '')
  const [sortBy, setSortBy] = useState('newest')

  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true)
        const [categoriesData, itemsData] = await Promise.all([
          getCategories(),
          getItems({
            category: selectedCategory,
            q: searchQuery,
            sort: sortBy === 'newest' ? '-created_at' : 'price_per_day',
          }),
        ])
        setCategories(categoriesData)
        setItems(itemsData)
      } catch (error) {
        console.error('Failed to load data:', error)
      } finally {
        setLoading(false)
      }
    }
    loadData()
  }, [selectedCategory, searchQuery, sortBy])

  return (
    <GuestLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Browse Items</h1>
          <p className="mt-2 text-slate-600">
            Explore {items.length} items available for rent
          </p>
        </div>

        {/* Filters */}
        <div className="space-y-4 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div>
            <label className="block text-sm font-medium text-slate-900 mb-2">Search</label>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value)
                setSearchParams({ ...Object.fromEntries(searchParams), q: e.target.value })
              }}
              placeholder="Search items..."
              className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-2 text-slate-900 outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-slate-900 mb-2">Category</label>
              <select
                value={selectedCategory}
                onChange={(e) => {
                  setSelectedCategory(e.target.value)
                  const params = { ...Object.fromEntries(searchParams), category: e.target.value }
                  if (!params.category) delete params.category
                  setSearchParams(params)
                }}
                className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-2 text-slate-900 outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
              >
                <option value="">All Categories</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.slug}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-900 mb-2">Sort By</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-2 text-slate-900 outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
              >
                <option value="newest">Newest</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>
            </div>
          </div>
        </div>

        {/* Items Grid */}
        {loading ? (
          <SkeletonListingGrid />
        ) : items.length > 0 ? (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((item) => (
              <ListingCard key={item.id} item={item} isGuest={true} />
            ))}
          </div>
        ) : (
          <div className="rounded-3xl border border-slate-200 bg-white p-12 text-center shadow-sm">
            <p className="text-slate-600">No items found. Try adjusting your filters.</p>
          </div>
        )}
      </div>
    </GuestLayout>
  )
}
