import { Link } from 'react-router-dom'

export default function ListingCard({ item }) {
  return (
    <Link to={`/items/${item.id}`} className="group block overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
      <div className="relative h-56 bg-slate-100">
        {item.main_image ? (
          <img src={item.main_image} alt={item.title} className="h-full w-full object-cover transition duration-300 group-hover:scale-105" />
        ) : (
          <div className="flex h-full items-center justify-center text-slate-400">No image</div>
        )}
        <span className={`absolute top-3 right-3 rounded-full px-3 py-1 text-xs font-semibold ${item.is_available ? 'bg-emerald-600/90 text-white' : 'bg-slate-900/80 text-white'}`}>
          {item.is_available ? 'Available' : 'Unavailable'}
        </span>
      </div>
      <div className="space-y-2 p-5">
        <div className="text-xs uppercase tracking-[0.2em] text-orange-500">{item.category?.name || 'General'}</div>
        <h3 className="text-lg font-semibold text-slate-900">{item.title || 'Untitled listing'}</h3>
        <p className="text-sm leading-6 text-slate-600 overflow-hidden text-ellipsis" style={{ display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>
          {item.description || 'No description provided.'}
        </p>
        <div className="flex items-center justify-between pt-3 text-sm text-slate-700">
          <span>${item.price_per_day ?? 'N/A'}/day</span>
          <span>{item.city || 'Unknown'}</span>
        </div>
      </div>
    </Link>
  )
}
