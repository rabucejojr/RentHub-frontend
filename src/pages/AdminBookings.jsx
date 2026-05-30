import { useEffect, useState } from 'react'
import { getAdminBookings, updateAdminBooking } from '../api/client'

export default function AdminBookings() {
  const [bookings, setBookings] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function loadBookings() {
      try {
        setLoading(true)
        const data = await getAdminBookings()
        setBookings(data)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    loadBookings()
  }, [])

  async function handleStatusChange(id, status) {
    try {
      setLoading(true)
      await updateAdminBooking(id, { status })
      const data = await getAdminBookings()
      setBookings(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="rounded-[2rem] bg-white p-6 shadow-sm shadow-slate-200">
        <h1 className="text-2xl font-semibold text-slate-900">Booking management</h1>
        <p className="mt-2 text-slate-600">Review and update booking status for rental reservations.</p>
      </div>

      {error && (
        <div className="rounded-3xl border border-red-200 bg-red-50 p-6 text-red-700">{error}</div>
      )}

      <div className="overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-sm">
        <table className="min-w-full divide-y divide-slate-200">
          <thead className="bg-slate-50">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-semibold text-slate-600">Booking</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-slate-600">Renter</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-slate-600">Item</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-slate-600">Status</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-slate-600">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 bg-white">
            {loading ? (
              Array.from({ length: 5 }).map((_, index) => (
                <tr key={index} className="animate-pulse">
                  <td className="px-6 py-4 h-12 bg-slate-100" colSpan="5"></td>
                </tr>
              ))
            ) : bookings.length > 0 ? (
              bookings.map((booking) => (
                <tr key={booking.id}>
                  <td className="px-6 py-4 text-sm text-slate-900">#{booking.id}</td>
                  <td className="px-6 py-4 text-sm text-slate-900">{booking.renter?.email}</td>
                  <td className="px-6 py-4 text-sm text-slate-900">{booking.item?.title}</td>
                  <td className="px-6 py-4 text-sm text-slate-900">{booking.status}</td>
                  <td className="px-6 py-4 text-sm">
                    <div className="flex flex-wrap gap-2">
                      {['confirmed', 'completed', 'cancelled'].map((status) => (
                        <button
                          key={status}
                          type="button"
                          disabled={booking.status === status}
                          onClick={() => handleStatusChange(booking.id, status)}
                          className="rounded-2xl bg-slate-800 px-3 py-2 text-white transition hover:bg-slate-900 disabled:opacity-50"
                        >
                          {status}
                        </button>
                      ))}
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td className="px-6 py-8 text-center text-sm text-slate-500" colSpan="5">
                  No bookings found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
