import { useState, useEffect } from 'react'
import { Eye, EyeOff } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { updateProfile, changePassword } from '../api/client'

const inputCls =
  'w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-900 outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-100'

const NOTIF_KEY = 'renthub_notif_prefs'
const DEFAULT_PREFS = {
  emailNotifications: true,
  rentalReminders: true,
  newMessages: true,
  promotionalEmails: false,
}

function Toggle({ on, onChange }) {
  return (
    <button
      type="button"
      onClick={() => onChange(!on)}
      aria-checked={on}
      role="switch"
      className={`relative h-6 w-11 flex-shrink-0 rounded-full transition-colors ${on ? 'bg-orange-500' : 'bg-slate-300'}`}
    >
      <span
        className={`absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform ${on ? 'translate-x-5' : 'translate-x-0'}`}
      />
    </button>
  )
}

function PasswordField({ label, value, onChange, show, onToggleShow }) {
  return (
    <div>
      <label className="mb-2 block text-sm font-medium text-slate-900">{label}</label>
      <div className="relative">
        <input
          type={show ? 'text' : 'password'}
          value={value}
          onChange={onChange}
          className={`${inputCls} pr-12`}
        />
        <button
          type="button"
          onClick={onToggleShow}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 transition hover:text-slate-700"
        >
          {show ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
      </div>
    </div>
  )
}

function StatusMessage({ msg }) {
  if (!msg) return null
  return (
    <p className={`text-sm ${msg.type === 'success' ? 'text-emerald-600' : 'text-red-600'}`}>
      {msg.text}
    </p>
  )
}

export default function Settings() {
  const { user, fetchCurrentUser } = useAuth()

  const [firstName, setFirstName] = useState(user?.first_name || '')
  const [lastName, setLastName] = useState(user?.last_name || '')
  const [email, setEmail] = useState(user?.email || '')
  const [profileSaving, setProfileSaving] = useState(false)
  const [profileMsg, setProfileMsg] = useState(null)

  const [currentPw, setCurrentPw] = useState('')
  const [newPw, setNewPw] = useState('')
  const [confirmPw, setConfirmPw] = useState('')
  const [showCurrentPw, setShowCurrentPw] = useState(false)
  const [showNewPw, setShowNewPw] = useState(false)
  const [showConfirmPw, setShowConfirmPw] = useState(false)
  const [securitySaving, setSecuritySaving] = useState(false)
  const [securityMsg, setSecurityMsg] = useState(null)

  const [prefs, setPrefs] = useState(() => {
    try {
      return { ...DEFAULT_PREFS, ...JSON.parse(localStorage.getItem(NOTIF_KEY) || '{}') }
    } catch {
      return DEFAULT_PREFS
    }
  })

  useEffect(() => {
    localStorage.setItem(NOTIF_KEY, JSON.stringify(prefs))
  }, [prefs])

  async function handleProfileSave(e) {
    e.preventDefault()
    if (!firstName.trim() || !lastName.trim() || !email.trim()) {
      return setProfileMsg({ type: 'error', text: 'All fields are required.' })
    }
    setProfileSaving(true)
    setProfileMsg(null)
    try {
      await updateProfile({ first_name: firstName.trim(), last_name: lastName.trim(), email: email.trim() })
      await fetchCurrentUser()
      setProfileMsg({ type: 'success', text: 'Profile updated successfully.' })
    } catch (err) {
      setProfileMsg({ type: 'error', text: err.message || 'Failed to save profile.' })
    } finally {
      setProfileSaving(false)
    }
  }

  async function handlePasswordSave(e) {
    e.preventDefault()
    if (!currentPw || !newPw || !confirmPw) {
      return setSecurityMsg({ type: 'error', text: 'All password fields are required.' })
    }
    if (newPw !== confirmPw) {
      return setSecurityMsg({ type: 'error', text: 'New passwords do not match.' })
    }
    if (newPw.length < 6) {
      return setSecurityMsg({ type: 'error', text: 'New password must be at least 6 characters.' })
    }
    setSecuritySaving(true)
    setSecurityMsg(null)
    try {
      await changePassword({ current_password: currentPw, new_password: newPw, confirm_password: confirmPw })
      setCurrentPw('')
      setNewPw('')
      setConfirmPw('')
      setSecurityMsg({ type: 'success', text: 'Password changed successfully.' })
    } catch (err) {
      setSecurityMsg({ type: 'error', text: err.message || 'Failed to change password.' })
    } finally {
      setSecuritySaving(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
        <h1 className="text-3xl font-semibold text-slate-900">Settings</h1>
        <p className="mt-2 text-sm text-slate-500">
          Update your profile, password, and notification preferences.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-slate-900">Profile</h2>
          <p className="mt-1 text-sm text-slate-500">Update your name and email address.</p>
          <form onSubmit={handleProfileSave} className="mt-6 space-y-4" noValidate>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-900">First name</label>
                <input
                  type="text"
                  value={firstName}
                  onChange={(e) => { setFirstName(e.target.value); setProfileMsg(null) }}
                  className={inputCls}
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-900">Last name</label>
                <input
                  type="text"
                  value={lastName}
                  onChange={(e) => { setLastName(e.target.value); setProfileMsg(null) }}
                  className={inputCls}
                />
              </div>
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-900">Email address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => { setEmail(e.target.value); setProfileMsg(null) }}
                className={inputCls}
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-500">Username</label>
              <input
                type="text"
                value={user?.username || ''}
                readOnly
                className="w-full cursor-not-allowed rounded-2xl border border-slate-200 bg-slate-100 px-4 py-3 text-slate-400"
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-500">Account type</label>
              <input
                type="text"
                value={user?.is_staff ? 'Administrator' : 'Standard user'}
                readOnly
                className="w-full cursor-not-allowed rounded-2xl border border-slate-200 bg-slate-100 px-4 py-3 text-slate-400"
              />
            </div>
            <StatusMessage msg={profileMsg} />
            <div className="flex justify-end pt-2">
              <button
                type="submit"
                disabled={profileSaving}
                className="rounded-3xl bg-orange-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-orange-700 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {profileSaving ? 'Saving…' : 'Save profile'}
              </button>
            </div>
          </form>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-slate-900">Security</h2>
          <p className="mt-1 text-sm text-slate-500">Change your account password.</p>
          <form onSubmit={handlePasswordSave} className="mt-6 space-y-4" noValidate>
            <PasswordField
              label="Current password"
              value={currentPw}
              onChange={(e) => { setCurrentPw(e.target.value); setSecurityMsg(null) }}
              show={showCurrentPw}
              onToggleShow={() => setShowCurrentPw((v) => !v)}
            />
            <PasswordField
              label="New password"
              value={newPw}
              onChange={(e) => { setNewPw(e.target.value); setSecurityMsg(null) }}
              show={showNewPw}
              onToggleShow={() => setShowNewPw((v) => !v)}
            />
            <PasswordField
              label="Confirm new password"
              value={confirmPw}
              onChange={(e) => { setConfirmPw(e.target.value); setSecurityMsg(null) }}
              show={showConfirmPw}
              onToggleShow={() => setShowConfirmPw((v) => !v)}
            />
            <StatusMessage msg={securityMsg} />
            <div className="flex justify-end pt-2">
              <button
                type="submit"
                disabled={securitySaving}
                className="rounded-3xl bg-orange-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-orange-700 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {securitySaving ? 'Saving…' : 'Change password'}
              </button>
            </div>
          </form>
        </div>
      </div>

      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-slate-900">Notifications</h2>
        <p className="mt-1 text-sm text-slate-500">Choose how you receive alerts and updates.</p>
        <div className="mt-6 divide-y divide-slate-100">
          {[
            {
              key: 'emailNotifications',
              label: 'Email notifications',
              description: 'Receive updates about your listings and rentals via email.',
            },
            {
              key: 'rentalReminders',
              label: 'Rental reminders',
              description: 'Get reminded before a rental period starts or ends.',
            },
            {
              key: 'newMessages',
              label: 'New message alerts',
              description: 'Be notified when someone sends you a message.',
            },
            {
              key: 'promotionalEmails',
              label: 'Promotional emails',
              description: 'Occasional news, tips, and offers from RentHub.',
            },
          ].map(({ key, label, description }) => (
            <div key={key} className="flex items-center justify-between gap-4 py-4">
              <div>
                <p className="text-sm font-medium text-slate-900">{label}</p>
                <p className="mt-0.5 text-xs text-slate-500">{description}</p>
              </div>
              <Toggle
                on={prefs[key]}
                onChange={(val) => setPrefs((p) => ({ ...p, [key]: val }))}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
