import { useEffect, useState } from 'react'
import {
  getAdminVerificationRequests,
  approveVerificationRequest,
  rejectVerificationRequest,
} from '../api/client'

export default function AdminVerification() {
  const [requests, setRequests] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function loadRequests() {
      try {
        setLoading(true)
        const data = await getAdminVerificationRequests()
        setRequests(data)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    loadRequests()
  }, [])

  async function handleAction(id, action) {
    try {
      setLoading(true)
      if (action === 'approve') {
        await approveVerificationRequest(id)
      } else {
        await rejectVerificationRequest(id)
      }
      const data = await getAdminVerificationRequests()
      setRequests(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="rounded-[2rem] bg-white p-6 shadow-sm shadow-slate-200">
        <h1 className="text-2xl font-semibold text-slate-900">Verification requests</h1>
        <p className="mt-2 text-slate-600">Review identity verification uploads and approve or reject them.</p>
      </div>

      {error && (
        <div className="rounded-3xl border border-red-200 bg-red-50 p-6 text-red-700">{error}</div>
      )}

      <div className="overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-sm">
        <table className="min-w-full divide-y divide-slate-200">
          <thead className="bg-slate-50">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-semibold text-slate-600">User</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-slate-600">Status</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-slate-600">Submitted</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-slate-600">Review</th>
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
            ) : requests.length > 0 ? (
              requests.map((request) => (
                <tr key={request.id}>
                  <td className="px-6 py-4 text-sm text-slate-900">{request.user?.email}</td>
                  <td className="px-6 py-4 text-sm text-slate-900">{request.status}</td>
                  <td className="px-6 py-4 text-sm text-slate-500">{new Date(request.submitted_at).toLocaleString()}</td>
                  <td className="px-6 py-4 text-sm text-slate-900">
                    {request.reviewed_by ? request.reviewed_by.email : 'Pending'}
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <div className="flex flex-wrap gap-2">
                      <button
                        type="button"
                        onClick={() => handleAction(request.id, 'approve')}
                        className="rounded-2xl bg-emerald-600 px-4 py-2 text-white transition hover:bg-emerald-700"
                      >
                        Approve
                      </button>
                      <button
                        type="button"
                        onClick={() => handleAction(request.id, 'reject')}
                        className="rounded-2xl bg-rose-600 px-4 py-2 text-white transition hover:bg-rose-700"
                      >
                        Reject
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td className="px-6 py-8 text-center text-sm text-slate-500" colSpan="5">
                  No verification requests found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
