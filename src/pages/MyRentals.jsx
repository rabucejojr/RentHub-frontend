import { Link } from 'react-router-dom'

export default function MyRentals() {
  return (
    <div className="space-y-6">
      <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-semibold text-slate-900">My rentals</h1>
            <p className="text-sm text-slate-500">Track your active bookings, upcoming pickups, and recent history.</p>
          </div>
          <Link to="/list-item" className="rounded-3xl bg-orange-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-orange-700">
            List a new item
          </Link>
        </div>
      </div>
      <div className="rounded-3xl border border-slate-200 bg-white p-10 shadow-sm text-center text-slate-500">
        <p className="text-lg font-medium">No active rentals yet.</p>
        <p className="mt-3">Add your first listing or browse the marketplace to start earning and renting.</p>
      </div>
    </div>
  )
}
