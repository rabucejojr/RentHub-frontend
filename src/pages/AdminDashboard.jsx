import { Link } from 'react-router-dom'

export default function AdminDashboard() {
  return (
    <div className="space-y-8">
      <section className="rounded-[2rem] bg-white p-8 shadow-sm shadow-slate-200">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.32em] text-orange-500">Admin dashboard</p>
            <h1 className="mt-4 text-3xl font-semibold text-slate-900">Manage RentHub from one place</h1>
            <p className="mt-3 text-slate-600">Review users, verification requests, marketplace listings, and bookings with staff controls.</p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
            <Link to="/admin/users" className="rounded-3xl bg-orange-600 px-5 py-4 text-center font-semibold text-white transition hover:bg-orange-700">
              Manage users
            </Link>
            <Link to="/admin/verification" className="rounded-3xl bg-slate-100 px-5 py-4 text-center font-semibold text-slate-900 transition hover:bg-slate-200">
              Verification requests
            </Link>
          </div>
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-3">
        <Link to="/admin/marketplace" className="rounded-[2rem] border border-slate-200 bg-slate-50 p-8 transition hover:border-orange-300 hover:shadow-lg">
          <div className="text-sm uppercase tracking-[0.32em] text-slate-500">Marketplace</div>
          <h2 className="mt-4 text-2xl font-semibold text-slate-900">Categories & items</h2>
          <p className="mt-3 text-slate-600">Review active listings and manage categories across the marketplace.</p>
        </Link>

        <Link to="/admin/bookings" className="rounded-[2rem] border border-slate-200 bg-slate-50 p-8 transition hover:border-orange-300 hover:shadow-lg">
          <div className="text-sm uppercase tracking-[0.32em] text-slate-500">Bookings</div>
          <h2 className="mt-4 text-2xl font-semibold text-slate-900">Manage reservations</h2>
          <p className="mt-3 text-slate-600">Approve, confirm, or complete bookings and see the latest reservation activity.</p>
        </Link>

        <div className="rounded-[2rem] border border-slate-200 bg-slate-50 p-8">
          <div className="text-sm uppercase tracking-[0.32em] text-slate-500">Admin tools</div>
          <h2 className="mt-4 text-2xl font-semibold text-slate-900">Staff controls</h2>
          <p className="mt-3 text-slate-600">Only staff users can access the admin pages in this app.</p>
        </div>
      </section>
    </div>
  )
}
