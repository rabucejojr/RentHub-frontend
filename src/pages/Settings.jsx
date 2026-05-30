export default function Settings() {
  return (
    <div className="space-y-6">
      <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
        <h1 className="text-3xl font-semibold text-slate-900">Settings</h1>
        <p className="mt-2 text-sm text-slate-500">Update your profile, payment preferences, and account settings.</p>
      </div>
      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
        {[
          { title: 'Profile', description: 'Edit your name, avatar, and contact details.' },
          { title: 'Security', description: 'Change your password and manage login settings.' },
          { title: 'Notifications', description: 'Choose how you get alerts and messages.' },
        ].map((card) => (
          <div key={card.title} className="rounded-3xl border border-slate-200 bg-slate-50 p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-slate-900">{card.title}</h2>
            <p className="mt-3 text-sm text-slate-500">{card.description}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
