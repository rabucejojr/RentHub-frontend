import { Link } from 'react-router-dom'

export default function ListItem() {
  return (
    <div className="space-y-6">
      <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
        <h1 className="text-3xl font-semibold text-slate-900">List an item</h1>
        <p className="mt-2 text-sm text-slate-500">Create a new listing so others can rent your gear, tools, or vehicles.</p>
      </div>
      <div className="rounded-3xl border border-dashed border-slate-300 bg-slate-50 p-12 text-center text-slate-500">
        <p className="text-lg font-medium">Listing flow coming soon.</p>
        <p className="mt-3">You can start by adding item details, pricing, and availability.</p>
        <Link to="/settings" className="mt-6 inline-flex rounded-3xl bg-orange-600 px-5 py-3 text-sm font-semibold text-white hover:bg-orange-700">
          Manage listing settings
        </Link>
      </div>
    </div>
  )
}
