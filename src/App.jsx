import { useState } from 'react'
import { NavLink, Routes, Route } from 'react-router-dom'
import {
  Home as HomeIcon,
  Search,
  Plus,
  Package,
  MessageCircle,
  Heart,
  Bell,
  Settings as SettingsIcon,
  LayoutDashboard,
  Users,
  ShieldCheck,
  Store,
  BookOpen,
  Menu,
  LogOut,
} from 'lucide-react'
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
  { label: 'Home',          to: '/',              Icon: HomeIcon },
  { label: 'Browse',        to: '/explore',       Icon: Search },
  { label: 'List an item',  to: '/list-item',     Icon: Plus },
  { label: 'My rentals',    to: '/my-rentals',    Icon: Package },
  { label: 'Messages',      to: '/messages',      Icon: MessageCircle },
  { label: 'Saved',         to: '/saved',         Icon: Heart },
  { label: 'Notifications', to: '/notifications', Icon: Bell },
  { label: 'Settings',      to: '/settings',      Icon: SettingsIcon },
]

const adminNavItems = [
  { label: 'Admin dashboard', to: '/admin',              Icon: LayoutDashboard },
  { label: 'Users',           to: '/admin/users',        Icon: Users },
  { label: 'Verification',    to: '/admin/verification', Icon: ShieldCheck },
  { label: 'Marketplace',     to: '/admin/marketplace',  Icon: Store },
  { label: 'Bookings',        to: '/admin/bookings',     Icon: BookOpen },
]

function NavItem({ to, label, Icon, collapsed }) {
  return (
    <NavLink
      to={to}
      title={label}
      className={({ isActive }) =>
        `flex items-center gap-3 rounded-2xl px-3 py-3 text-sm font-medium transition ${
          collapsed ? 'justify-center' : ''
        } ${isActive ? 'bg-white/15 text-white shadow-sm' : 'text-orange-100 hover:bg-white/10 hover:text-white'}`
      }
    >
      <Icon size={18} />
      {!collapsed && <span>{label}</span>}
    </NavLink>
  )
}

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
              <Menu size={20} />
            </button>
          </div>

          <div className="flex min-h-0 flex-1 flex-col overflow-y-auto px-3 py-6">
            {!isCollapsed && (
              <div className="mb-6 flex items-center gap-3 px-2">
                <div className="flex h-12 w-12 items-center justify-center rounded-3xl bg-white/15 text-lg font-semibold text-white">RH</div>
                <div>
                  <p className="text-sm uppercase tracking-[0.32em] text-orange-100">RentHub</p>
                </div>
              </div>
            )}

            <nav className="flex flex-1 flex-col gap-2">
              {navItems.map((item) => (
                <NavItem key={item.label} {...item} collapsed={isCollapsed} />
              ))}
            </nav>

            {user?.is_staff && (
              <div className="mt-6 border-t border-orange-500 pt-4">
                {!isCollapsed && (
                  <p className="px-4 pb-3 text-xs uppercase tracking-[0.32em] text-orange-100">Admin</p>
                )}
                <nav className="flex flex-col gap-2">
                  {adminNavItems.map((item) => (
                    <NavItem key={item.label} {...item} collapsed={isCollapsed} />
                  ))}
                </nav>
              </div>
            )}

            <div className={`border-t border-orange-500 py-5 text-sm text-orange-100 ${isCollapsed ? 'flex flex-col items-center gap-3' : 'space-y-3 px-4'}`}>
              {user && (
                <>
                  {!isCollapsed && (
                    <>
                      <p className="font-semibold">Logged in as</p>
                      <p className="text-orange-50 truncate">{user.email}</p>
                    </>
                  )}
                  <button
                    onClick={logout}
                    title="Logout"
                    className={`flex items-center gap-2 rounded-3xl bg-white/10 text-orange-100 transition hover:bg-white/20 ${
                      isCollapsed ? 'h-10 w-10 justify-center' : 'w-full px-3 py-2'
                    }`}
                  >
                    <LogOut size={16} />
                    {!isCollapsed && <span>Logout</span>}
                  </button>
                </>
              )}
            </div>
          </div>
        </aside>

        <div className="flex h-screen flex-col overflow-y-auto">
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

          <main className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
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

  if (user) {
    return <AppLayout />
  }

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
