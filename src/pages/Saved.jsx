export default function Saved() {
  return (
    <div className="space-y-6">
      <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
        <h1 className="text-3xl font-semibold text-slate-900">Saved listings</h1>
        <p className="mt-2 text-sm text-slate-500">All of your favorite rentals will be saved here for easy access later.</p>
      </div>
      <div className="rounded-3xl border border-dashed border-slate-300 bg-slate-50 p-12 text-center text-slate-500">
        <p className="text-lg font-medium">No saved items yet.</p>
        <p className="mt-3">Browse the marketplace and tap the heart icon to save your favorites.</p>
      </div>
    </div>
  )
}
