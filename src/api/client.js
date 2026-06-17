import { MOCK_CATEGORIES, MOCK_ITEMS } from './mockData'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || ''

function isMockSession() {
  return !!localStorage.getItem('renthub_mock_user')
}

function getErrorMessage(data, response) {
  if (!data) {
    return response.statusText || 'Unknown API error.'
  }

  if (typeof data === 'string') {
    try {
      const parsed = JSON.parse(data)
      return getErrorMessage(parsed, response)
    } catch {
      return data
    }
  }

  if (typeof data === 'object') {
    if (data.detail) return data.detail
    if (data.message) return data.message

    const firstKey = Object.keys(data)[0]
    if (firstKey) {
      const value = data[firstKey]
      if (Array.isArray(value)) return value.join(' ')
      if (typeof value === 'string') return value
      return JSON.stringify(value)
    }
  }

  return String(data)
}

function buildApiUrl(path) {
  const base = API_BASE_URL.replace(/\/+$/, '')
  let trimmedPath = path.replace(/^\/+/, '')

  if (base.endsWith('/api') && trimmedPath.startsWith('api/')) {
    trimmedPath = trimmedPath.replace(/^api\//, '')
  }

  if (!base) {
    return `/${trimmedPath}`
  }

  return `${base}/${trimmedPath}`
}

async function fetchJSON(path, options = {}) {
  const defaultHeaders = {
    'Content-Type': 'application/json',
  }

  const response = await fetch(buildApiUrl(path), {
    credentials: 'include',
    ...options,
    headers: {
      ...defaultHeaders,
      ...(options.headers || {}),
    },
  })

  const contentType = response.headers.get('content-type') || ''
  let data
  try {
    if (contentType.includes('application/json')) {
      data = await response.json()
    } else {
      data = await response.text()
    }
  } catch {
    data = await response.text().catch(() => null)
  }

  if (!response.ok) {
    throw new Error(getErrorMessage(data, response))
  }

  return data
}

export async function getCategories() {
  if (isMockSession()) return MOCK_CATEGORIES
  try {
    return await fetchJSON('/api/categories/')
  } catch {
    return MOCK_CATEGORIES
  }
}

export async function getItems(params = {}) {
  if (isMockSession()) {
    let filtered = MOCK_ITEMS
    if (params.q) {
      const q = params.q.toLowerCase()
      filtered = filtered.filter(
        (item) =>
          item.title.toLowerCase().includes(q) ||
          item.description.toLowerCase().includes(q),
      )
    }
    if (params.category) {
      filtered = filtered.filter((item) => item.category.slug === params.category)
    }
    return filtered
  }
  const query = new URLSearchParams()
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      query.append(key, value)
    }
  })
  try {
    return await fetchJSON(`/api/items/?${query.toString()}`)
  } catch {
    return MOCK_ITEMS
  }
}

export async function getItem(id) {
  if (isMockSession()) {
    const item = MOCK_ITEMS.find((i) => i.id === Number(id))
    if (item) return item
    throw new Error('Item not found.')
  }
  try {
    return await fetchJSON(`/api/items/${id}/`)
  } catch (err) {
    const item = MOCK_ITEMS.find((i) => i.id === Number(id))
    if (item) return item
    throw err
  }
}

export async function createItem(data) {
  if (isMockSession()) {
    return { ...data, id: Date.now(), is_available: data.is_available ?? true, main_image: data.image_url || null }
  }
  return fetchJSON('/api/items/', { method: 'POST', body: JSON.stringify(data) })
}

export async function getAdminUsers() {
  if (isMockSession()) return { results: [] }
  return fetchJSON('/api/admin/users/')
}

export async function getAdminVerificationRequests() {
  if (isMockSession()) return { results: [] }
  return fetchJSON('/api/admin/verification-requests/')
}

export function approveVerificationRequest(id) {
  return fetchJSON(`/api/admin/verification-requests/${id}/approve/`, {
    method: 'POST',
  })
}

export function rejectVerificationRequest(id) {
  return fetchJSON(`/api/admin/verification-requests/${id}/reject/`, {
    method: 'POST',
  })
}

export async function getAdminCategories() {
  if (isMockSession()) return MOCK_CATEGORIES
  return fetchJSON('/api/admin/categories/')
}

export function createAdminCategory(data) {
  return fetchJSON('/api/admin/categories/', {
    method: 'POST',
    body: JSON.stringify(data),
  })
}

export function updateAdminCategory(id, data) {
  return fetchJSON(`/api/admin/categories/${id}/`, {
    method: 'PATCH',
    body: JSON.stringify(data),
  })
}

export async function getAdminItems() {
  if (isMockSession()) return { results: MOCK_ITEMS }
  return fetchJSON('/api/admin/items/')
}

export function updateAdminItem(id, data) {
  return fetchJSON(`/api/admin/items/${id}/`, {
    method: 'PATCH',
    body: JSON.stringify(data),
  })
}

export async function getAdminBookings() {
  if (isMockSession()) return { results: [] }
  return fetchJSON('/api/admin/bookings/')
}

export function updateAdminBooking(id, data) {
  return fetchJSON(`/api/admin/bookings/${id}/`, {
    method: 'PATCH',
    body: JSON.stringify(data),
  })
}

export async function updateProfile(data) {
  if (isMockSession()) {
    const stored = JSON.parse(localStorage.getItem('renthub_mock_user') || '{}')
    const updated = { ...stored, ...data }
    localStorage.setItem('renthub_mock_user', JSON.stringify(updated))
    return updated
  }
  return fetchJSON('/api/auth/me/', { method: 'PATCH', body: JSON.stringify(data) })
}

export async function changePassword(data) {
  if (isMockSession()) {
    return { message: 'Password updated.' }
  }
  return fetchJSON('/api/auth/change-password/', { method: 'POST', body: JSON.stringify(data) })
}

export function signup(data) {
  return fetchJSON('/api/auth/signup/', {
    method: 'POST',
    body: JSON.stringify(data),
  })
}

export function login(data) {
  return fetchJSON('/api/auth/login/', {
    method: 'POST',
    body: JSON.stringify(data),
  })
}

export function getCurrentUser() {
  return fetchJSON('/api/auth/me/')
}

export function logout() {
  return fetchJSON('/api/auth/logout/', {
    method: 'POST',
  })
}
