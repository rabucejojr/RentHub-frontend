import { useEffect, useState } from 'react'
import {
  getAdminCategories,
  createAdminCategory,
  updateAdminCategory,
  getAdminItems,
  updateAdminItem,
} from '../api/client'

export default function AdminMarketplace() {
  const [categories, setCategories] = useState([])
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [newCategory, setNewCategory] = useState({
    name: '',
    slug: '',
    description: '',
    icon: '',
    display_order: 0,
    is_active: true,
  })

  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true)
        const [categoryData, itemData] = await Promise.all([getAdminCategories(), getAdminItems()])
        setCategories(categoryData)
        setItems(itemData)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [])

  async function refreshData() {
    try {
      const [categoryData, itemData] = await Promise.all([getAdminCategories(), getAdminItems()])
      setCategories(categoryData)
      setItems(itemData)
    } catch (err) {
      setError(err.message)
    }
  }

  const handleCategoryChange = (event) => {
    const { name, value, type, checked } = event.target
    setNewCategory((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }))
  }

  const handleCreateCategory = async (event) => {
    event.preventDefault()
    try {
      setLoading(true)
      await createAdminCategory(newCategory)
      setNewCategory({ name: '', slug: '', description: '', icon: '', display_order: 0, is_active: true })
      await refreshData()
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  async function handleToggleCategory(category) {
    try {
      setLoading(true)
      await updateAdminCategory(category.id, { is_active: !category.is_active })
      await refreshData()
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  async function handleToggleAvailability(item) {
    try {
      setLoading(true)
      await updateAdminItem(item.id, { is_available: !item.is_available })
      await refreshData()
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-8">
      <div className="rounded-[2rem] bg-white p-6 shadow-sm shadow-slate-200">
        <h1 className="text-2xl font-semibold text-slate-900">Marketplace admin</h1>
        <p className="mt-2 text-slate-600">Manage categories and rental items from the admin interface.</p>
      </div>

      {error && (
        <div className="rounded-3xl border border-red-200 bg-red-50 p-6 text-red-700">{error}</div>
      )}

      <div className="grid gap-6 xl:grid-cols-2">
        <section className="rounded-[2rem] bg-white p-6 shadow-sm shadow-slate-200">
          <h2 className="text-xl font-semibold text-slate-900">Categories</h2>
          <form onSubmit={handleCreateCategory} className="mt-6 space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="block">
                <span className="text-sm font-medium text-slate-700">Name</span>
                <input
                  name="name"
                  value={newCategory.name}
                  onChange={handleCategoryChange}
                  required
                  className="mt-2 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
                />
              </label>
              <label className="block">
                <span className="text-sm font-medium text-slate-700">Slug</span>
                <input
                  name="slug"
                  value={newCategory.slug}
                  onChange={handleCategoryChange}
                  className="mt-2 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
                />
              </label>
            </div>
            <label className="block">
              <span className="text-sm font-medium text-slate-700">Icon</span>
              <input
                name="icon"
                value={newCategory.icon}
                onChange={handleCategoryChange}
                className="mt-2 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
              />
            </label>
            <label className="block">
              <span className="text-sm font-medium text-slate-700">Description</span>
              <textarea
                name="description"
                value={newCategory.description}
                onChange={handleCategoryChange}
                className="mt-2 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
              />
            </label>
            <div className="flex flex-wrap items-center gap-4">
              <label className="flex items-center gap-3 text-sm text-slate-700">
                <input
                  type="checkbox"
                  name="is_active"
                  checked={newCategory.is_active}
                  onChange={handleCategoryChange}
                  className="h-4 w-4 rounded border-slate-300 text-orange-600"
                />
                Active
              </label>
              <button
                type="submit"
                className="rounded-3xl bg-orange-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-orange-700"
              >
                Add category
              </button>
            </div>
          </form>

          <div className="mt-8 overflow-hidden rounded-[2rem] border border-slate-200 bg-slate-50">
            <table className="min-w-full divide-y divide-slate-200">
              <thead className="bg-slate-100">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-600">Name</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-600">Slug</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-600">Active</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-600">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 bg-white">
                {loading ? (
                  Array.from({ length: 4 }).map((_, index) => (
                    <tr key={index} className="animate-pulse">
                      <td className="px-6 py-4 h-12 bg-slate-100" colSpan="4"></td>
                    </tr>
                  ))
                ) : categories.length > 0 ? (
                  categories.map((category) => (
                    <tr key={category.id}>
                      <td className="px-6 py-4 text-sm text-slate-900">{category.name}</td>
                      <td className="px-6 py-4 text-sm text-slate-500">{category.slug}</td>
                      <td className="px-6 py-4 text-sm text-slate-900">{category.is_active ? 'Yes' : 'No'}</td>
                      <td className="px-6 py-4 text-sm">
                        <button
                          type="button"
                          onClick={() => handleToggleCategory(category)}
                          className="rounded-2xl bg-slate-800 px-4 py-2 text-white transition hover:bg-slate-900"
                        >
                          Toggle
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td className="px-6 py-8 text-center text-sm text-slate-500" colSpan="4">
                      No categories available.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>

        <section className="rounded-[2rem] bg-white p-6 shadow-sm shadow-slate-200">
          <h2 className="text-xl font-semibold text-slate-900">Rental items</h2>
          <div className="mt-6 overflow-hidden rounded-[2rem] border border-slate-200 bg-slate-50">
            <table className="min-w-full divide-y divide-slate-200">
              <thead className="bg-slate-100">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-600">Title</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-600">Owner</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-600">Category</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-600">Available</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-600">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 bg-white">
                {loading ? (
                  Array.from({ length: 5 }).map((_, index) => (
                    <tr key={index} className="animate-pulse">
                      <td className="px-6 py-4 h-12 bg-slate-100" colSpan="5"></td>
                    </tr>
                  ))
                ) : items.length > 0 ? (
                  items.map((item) => (
                    <tr key={item.id}>
                      <td className="px-6 py-4 text-sm text-slate-900">{item.title}</td>
                      <td className="px-6 py-4 text-sm text-slate-900">{item.owner?.email}</td>
                      <td className="px-6 py-4 text-sm text-slate-500">{item.category?.name}</td>
                      <td className="px-6 py-4 text-sm text-slate-900">{item.is_available ? 'Yes' : 'No'}</td>
                      <td className="px-6 py-4 text-sm">
                        <button
                          type="button"
                          onClick={() => handleToggleAvailability(item)}
                          className="rounded-2xl bg-slate-800 px-4 py-2 text-white transition hover:bg-slate-900"
                        >
                          Toggle
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td className="px-6 py-8 text-center text-sm text-slate-500" colSpan="5">
                      No rental items found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  )
}
