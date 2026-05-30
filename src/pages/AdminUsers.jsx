import { useEffect, useState } from 'react'
import { getAdminUsers } from '../api/client'

export default function AdminUsers() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function loadUsers() {
      try {
        setLoading(true)
        const data = await getAdminUsers()
        setUsers(data)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    loadUsers()
  }, [])

  return (
    <div className="space-y-6">
      <div className="rounded-[2rem] bg-white p-6 shadow-sm shadow-slate-200">
        <h1 className="text-2xl font-semibold text-slate-900">User management</h1>
        <p className="mt-2 text-slate-600">View all registered users and staff status from the admin interface.</p>
      </div>

      {error && (
        <div className="rounded-3xl border border-red-200 bg-red-50 p-6 text-red-700">{error}</div>
      )}

      <div className="overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-sm">
        <table className="min-w-full divide-y divide-slate-200">
          <thead className="bg-slate-50">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-semibold text-slate-600">Email</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-slate-600">Name</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-slate-600">Verified</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-slate-600">Staff</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-slate-600">Joined</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 bg-white">
            {loading ? (
              Array.from({ length: 5 }).map((_, index) => (
                <tr key={index} className="animate-pulse">
                  <td className="px-6 py-4 h-12 bg-slate-100" colSpan="5"></td>
                </tr>
              ))
            ) : users.length > 0 ? (
              users.map((user) => (
                <tr key={user.id}>
                  <td className="px-6 py-4 text-sm text-slate-900">{user.email}</td>
                  <td className="px-6 py-4 text-sm text-slate-900">{user.first_name} {user.last_name}</td>
                  <td className="px-6 py-4 text-sm text-slate-900">{user.is_verified ? 'Yes' : 'No'}</td>
                  <td className="px-6 py-4 text-sm text-slate-900">{user.is_staff ? 'Admin' : 'Renter'}</td>
                  <td className="px-6 py-4 text-sm text-slate-500">{new Date(user.date_joined).toLocaleDateString()}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td className="px-6 py-8 text-center text-sm text-slate-500" colSpan="5">
                  No users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
