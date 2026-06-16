import { NavLink } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export function GuestLayout({ children }) {
  const { user } = useAuth()

  // If user is authenticated, don't show guest layout
  if (user) {
    return null
  }

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900">
      <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/95 backdrop-blur-sm">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-orange-600 text-sm font-semibold text-white">
              RH
            </div>
            <h1 className="text-xl font-bold text-orange-600">RentHub</h1>
          </div>

          <nav className="hidden items-center gap-6 md:flex">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `text-sm font-medium transition ${isActive ? 'text-orange-600' : 'text-slate-600 hover:text-slate-900'}`
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/browse"
              className={({ isActive }) =>
                `text-sm font-medium transition ${isActive ? 'text-orange-600' : 'text-slate-600 hover:text-slate-900'}`
              }
            >
              Browse
            </NavLink>
          </nav>

          <div className="flex gap-3">
            <NavLink
              to="/login"
              className="rounded-2xl border border-orange-600 px-5 py-2 text-sm font-semibold text-orange-600 transition hover:bg-orange-50"
            >
              Sign in
            </NavLink>
            <NavLink
              to="/signup"
              className="rounded-2xl bg-orange-600 px-5 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-orange-700"
            >
              Sign up
            </NavLink>
          </div>
        </div>
      </header>

      <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-8 sm:px-6 lg:px-8">
        {children}
      </main>

      <footer className="border-t border-slate-200 bg-white py-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            <div>
              <h3 className="font-semibold text-slate-900">About</h3>
              <ul className="mt-4 space-y-2 text-sm text-slate-600">
                <li><a href="#" className="hover:text-orange-600">About us</a></li>
                <li><a href="#" className="hover:text-orange-600">Blog</a></li>
                <li><a href="#" className="hover:text-orange-600">Press</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-slate-900">Community</h3>
              <ul className="mt-4 space-y-2 text-sm text-slate-600">
                <li><a href="#" className="hover:text-orange-600">Help center</a></li>
                <li><a href="#" className="hover:text-orange-600">Contact us</a></li>
                <li><a href="#" className="hover:text-orange-600">Forum</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-slate-900">Legal</h3>
              <ul className="mt-4 space-y-2 text-sm text-slate-600">
                <li><a href="#" className="hover:text-orange-600">Terms</a></li>
                <li><a href="#" className="hover:text-orange-600">Privacy</a></li>
                <li><a href="#" className="hover:text-orange-600">Cookies</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-slate-900">Platform</h3>
              <ul className="mt-4 space-y-2 text-sm text-slate-600">
                <li><a href="#" className="hover:text-orange-600">Download app</a></li>
                <li><a href="#" className="hover:text-orange-600">Careers</a></li>
                <li><a href="#" className="hover:text-orange-600">Status</a></li>
              </ul>
            </div>
          </div>
          <div className="mt-8 border-t border-slate-200 pt-8 text-center text-sm text-slate-600">
            <p>&copy; {new Date().getFullYear()} RentHub. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
