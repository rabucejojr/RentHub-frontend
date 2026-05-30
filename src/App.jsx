import { useState } from 'react'
import { NavLink, Routes, Route } from 'react-router-dom'
import { AuthProvider, useAuth } from './context/AuthContext'
import { ProtectedRoute } from './components/ProtectedRoute'
import { AdminRoute } from './components/AdminRoute'
import Login from './pages/Login'
import Signup from './pages/Signup'
import GuestHome from './pages/GuestHome'
import GuestExplore from './pages/GuestExplore'
import Home from './pages/Home'
import Explore from './pages/Explore'
import ItemDetail from './pages/ItemDetail'
import ListItem from './pages/ListItem'
import MyRentals from './pages/MyRentals'
import Messages from './pages/Messages'
import Saved from './pages/Saved'
import Notifications from './pages/Notifications'
import Settings from './pages/Settings'
import AdminDashboard from './pages/AdminDashboard'
import AdminUsers from './pages/AdminUsers'
import AdminVerification from './pages/AdminVerification'
import AdminMarketplace from './pages/AdminMarketplace'
import AdminBookings from './pages/AdminBookings'

const navItems = [
  { label: 'Home', to: '/', icon: '🏠' },
  { label: 'Browse', to: '/explore', icon: '🔍' },
  { label: 'List an item', to: '/list-item', icon: '➕' },
  { label: 'My rentals', to: '/my-rentals', icon: '📦' },
  { label: 'Messages', to: '/messages', icon: '💬' },
  { label: 'Saved', to: '/saved', icon: '❤️' },
  { label: 'Notifications', to: '/notifications', icon: '🔔' },
  { label: 'Settings', to: '/settings', icon: '⚙️' },
]

function AppLayout() {
  const [isCollapsed, setIsCollapsed] = useState(true)
  const { user, logout } = useAuth()

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900">
      <div className={`grid h-screen overflow-hidden gap-6 ${isCollapsed ? 'grid-cols-[70px_minmax(0,1fr)]' : 'grid-cols-[280px_minmax(0,1fr)]'}`}>
        <aside className={`flex flex-col border-r border-orange-200 bg-orange-600 text-white transition-all duration-300 ${isCollapsed ? 'w-[70px]' : 'w-full'}`}>
          <div className="flex h-24 items-center justify-center border-b border-orange-500 px-4">
            <button
              type="button"
              onClick={() => setIsCollapsed((prev) => !prev)}
              className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-white/15 text-white transition hover:bg-white/20"
              aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            >
              <span className="text-lg">☰</span>
            </button>
          </div>

          {!isCollapsed && (
            <div className="flex min-h-0 flex-1 flex-col overflow-y-auto px-3 py-6">
              <div className="mb-6 flex items-center gap-3 px-2">
                <div className="flex h-12 w-12 items-center justify-center rounded-3xl bg-white/15 text-lg font-semibold text-white">RH</div>
                <div>
                  <p className="text-sm uppercase tracking-[0.32em] text-orange-100">RentHub</p>
                </div>
              </div>
              <nav className="flex flex-1 flex-col gap-2">
                {navItems.map((item) => (
                  <NavLink
                    key={item.label}
                    to={item.to}
                    className={({ isActive }) =>
                      `group flex items-center gap-3 rounded-2xl px-3 py-3 text-sm font-medium transition ${
                        isActive ? 'bg-white/15 text-white shadow-sm' : 'text-orange-100 hover:bg-white/10 hover:text-white'
                      }`
                    }
                  >
                    <span className="text-lg">{item.icon}</span>
                    <span>{item.label}</span>
                  </NavLink>
                ))}
              </nav>

              {user?.is_staff && (
                <div className="mt-6 border-t border-orange-500 pt-4">
                  <p className="px-4 pb-3 text-xs uppercase tracking-[0.32em] text-orange-100">Admin</p>
                  <nav className="flex flex-col gap-2 px-2">
                    <NavLink
                      to="/admin"
                      className={({ isActive }) =>
                        `group flex items-center gap-3 rounded-2xl px-3 py-3 text-sm font-medium transition ${
                          isActive ? 'bg-white/15 text-white shadow-sm' : 'text-orange-100 hover:bg-white/10 hover:text-white'
                        }`
                      }
                    >
                      <span className="text-lg">🛠️</span>
                      <span>Admin dashboard</span>
                    </NavLink>
                    <NavLink
                      to="/admin/users"
                      className={({ isActive }) =>
                        `group flex items-center gap-3 rounded-2xl px-3 py-3 text-sm font-medium transition ${
                          isActive ? 'bg-white/15 text-white shadow-sm' : 'text-orange-100 hover:bg-white/10 hover:text-white'
                        }`
                      }
                    >
                      <span className="text-lg">👤</span>
                      <span>Users</span>
                    </NavLink>
                    <NavLink
                      to="/admin/verification"
                      className={({ isActive }) =>
                        `group flex items-center gap-3 rounded-2xl px-3 py-3 text-sm font-medium transition ${
                          isActive ? 'bg-white/15 text-white shadow-sm' : 'text-orange-100 hover:bg-white/10 hover:text-white'
                        }`
                      }
                    >
                      <span className="text-lg">✅</span>
                      <span>Verification</span>
                    </NavLink>
                    <NavLink
                      to="/admin/marketplace"
                      className={({ isActive }) =>
                        `group flex items-center gap-3 rounded-2xl px-3 py-3 text-sm font-medium transition ${
                          isActive ? 'bg-white/15 text-white shadow-sm' : 'text-orange-100 hover:bg-white/10 hover:text-white'
                        }`
                      }
                    >
                      <span className="text-lg">📦</span>
                      <span>Marketplace</span>
                    </NavLink>
                    <NavLink
                      to="/admin/bookings"
                      className={({ isActive }) =>
                        `group flex items-center gap-3 rounded-2xl px-3 py-3 text-sm font-medium transition ${
                          isActive ? 'bg-white/15 text-white shadow-sm' : 'text-orange-100 hover:bg-white/10 hover:text-white'
                        }`
                      }
                    >
                      <span className="text-lg">🧾</span>
                      <span>Bookings</span>
                    </NavLink>
                  </nav>
                </div>
              )}

              <div className="space-y-3 border-t border-orange-500 px-4 py-5 text-sm text-orange-100">
                {user && (
                  <>
                    <p className="font-semibold">Logged in as</p>
                    <p className="text-orange-50 truncate">{user.email}</p>
                    <button
                      onClick={logout}
                      className="block w-full rounded-3xl bg-white/10 px-3 py-2 text-left text-orange-100 transition hover:bg-white/20"
                    >
                      Logout
                    </button>
                  </>
                )}
              </div>
            </div>
          )}
        </aside>

        <div className="flex min-h-0 flex-1 flex-col overflow-y-auto">
          <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/95 backdrop-blur-sm">
            <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-6 sm:px-6 lg:px-8 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.32em] text-slate-500">Welcome back</p>
                <h1 className="mt-2 text-3xl font-semibold text-slate-900 sm:text-4xl">Rent anything, from anyone, anywhere.</h1>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                <NavLink
                  to="/list-item"
                  className="rounded-3xl bg-orange-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-orange-700"
                >
                  Create listing
                </NavLink>
                <div className="rounded-3xl bg-slate-100 px-4 py-3 text-sm text-slate-700">Popular: Drills Cameras Bikes Tents Cars</div>
              </div>
            </div>
          </header>

          <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-8 sm:px-6 lg:px-8">
            <Routes>
              <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
              <Route path="/explore" element={<ProtectedRoute><Explore /></ProtectedRoute>} />
              <Route path="/items/:id" element={<ProtectedRoute><ItemDetail /></ProtectedRoute>} />
              <Route path="/list-item" element={<ProtectedRoute><ListItem /></ProtectedRoute>} />
              <Route path="/my-rentals" element={<ProtectedRoute><MyRentals /></ProtectedRoute>} />
              <Route path="/messages" element={<ProtectedRoute><Messages /></ProtectedRoute>} />
              <Route path="/saved" element={<ProtectedRoute><Saved /></ProtectedRoute>} />
              <Route path="/notifications" element={<ProtectedRoute><Notifications /></ProtectedRoute>} />
              <Route path="/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
              <Route path="/admin" element={<AdminRoute><AdminDashboard /></AdminRoute>} />
              <Route path="/admin/users" element={<AdminRoute><AdminUsers /></AdminRoute>} />
              <Route path="/admin/verification" element={<AdminRoute><AdminVerification /></AdminRoute>} />
              <Route path="/admin/marketplace" element={<AdminRoute><AdminMarketplace /></AdminRoute>} />
              <Route path="/admin/bookings" element={<AdminRoute><AdminBookings /></AdminRoute>} />
              <Route
                path="*"
                element={
                  <div className="rounded-3xl border border-slate-200 bg-white p-12 text-center shadow-sm">
                    Page not found.
                  </div>
                }
              />
            </Routes>
          </main>
        </div>
      </div>
    </div>
  )
}

function AppContent() {
  const { user, loading } = useAuth()

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="w-12 h-12 rounded-full border-4 border-orange-200 border-t-orange-600 animate-spin mx-auto mb-4"></div>
          <p className="text-slate-600">Loading...</p>
        </div>
      </div>
    )
  }

  // If user is authenticated, show the authenticated dashboard
  if (user) {
    return <AppLayout />
  }

  // If no user, show guest routes
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/" element={<GuestHome />} />
      <Route path="/browse" element={<GuestExplore />} />
      <Route path="*" element={<GuestHome />} />
    </Routes>
  )
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  )
}

export default App
