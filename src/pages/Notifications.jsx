export default function Notifications() {
  return (
    <div className="space-y-6">
      <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
        <h1 className="text-3xl font-semibold text-slate-900">Notifications</h1>
        <p className="mt-2 text-sm text-slate-500">Stay informed about booking requests, messages, and listing activity.</p>
      </div>
      <div className="rounded-3xl border border-dashed border-slate-300 bg-slate-50 p-12 text-center text-slate-500">
        <p className="text-lg font-medium">No notifications yet.</p>
        <p className="mt-3">Bookings and messages will appear here when you have new activity.</p>
      </div>
    </div>
  )
}
