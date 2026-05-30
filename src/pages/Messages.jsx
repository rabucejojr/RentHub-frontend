export default function Messages() {
  return (
    <div className="space-y-6">
      <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
        <h1 className="text-3xl font-semibold text-slate-900">Messages</h1>
        <p className="mt-2 text-sm text-slate-500">View conversations with renters and hosts, and keep your booking chat organized.</p>
      </div>
      <div className="rounded-3xl border border-dashed border-slate-300 bg-slate-50 p-12 text-center text-slate-500">
        <p className="text-lg font-medium">No messages yet.</p>
        <p className="mt-3">Messages will appear here when someone contacts you about a listing.</p>
      </div>
    </div>
  )
}
