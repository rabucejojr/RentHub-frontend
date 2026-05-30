export function SkeletonCard() {
  return (
    <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
      <div className="h-56 bg-slate-200 animate-pulse" />
      <div className="space-y-3 p-5">
        <div className="h-3 w-16 rounded bg-slate-200 animate-pulse" />
        <div className="h-6 w-3/4 rounded bg-slate-200 animate-pulse" />
        <div className="space-y-2">
          <div className="h-4 rounded bg-slate-200 animate-pulse" />
          <div className="h-4 w-5/6 rounded bg-slate-200 animate-pulse" />
        </div>
        <div className="flex justify-between pt-3">
          <div className="h-4 w-12 rounded bg-slate-200 animate-pulse" />
          <div className="h-4 w-20 rounded bg-slate-200 animate-pulse" />
        </div>
      </div>
    </div>
  )
}

export function SkeletonCategoryGrid() {
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
      {[1, 2, 3, 4, 5, 6].map((i) => (
        <div key={i} className="space-y-3 rounded-3xl border border-slate-200 bg-white p-4 shadow-sm">
          <div className="h-12 rounded bg-slate-200 animate-pulse" />
          <div className="h-4 w-full rounded bg-slate-200 animate-pulse" />
        </div>
      ))}
    </div>
  )
}

export function SkeletonStats() {
  return (
    <div className="grid grid-cols-3 gap-4 sm:gap-6">
      {[1, 2, 3].map((i) => (
        <div key={i} className="space-y-3 rounded-3xl border border-slate-200 bg-white p-6 text-center shadow-sm">
          <div className="h-10 w-24 rounded bg-slate-200 animate-pulse mx-auto" />
          <div className="h-4 w-20 rounded bg-slate-200 animate-pulse mx-auto" />
        </div>
      ))}
    </div>
  )
}

export function SkeletonHero() {
  return (
    <div className="space-y-4 rounded-3xl bg-slate-200 px-6 py-12 animate-pulse sm:px-8 sm:py-16">
      <div className="mx-auto max-w-2xl space-y-4">
        <div className="h-12 w-3/4 rounded bg-slate-300 mx-auto" />
        <div className="h-6 w-full rounded bg-slate-300" />
        <div className="h-6 w-5/6 rounded bg-slate-300 mx-auto" />
        <div className="mt-8 flex gap-3 flex-col sm:flex-row">
          <div className="h-12 flex-1 rounded-2xl bg-slate-300" />
          <div className="h-12 w-24 rounded-2xl bg-slate-300" />
        </div>
      </div>
    </div>
  )
}

export function SkeletonListingGrid() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {[1, 2, 3, 4, 5, 6].map((i) => (
        <SkeletonCard key={i} />
      ))}
    </div>
  )
}
