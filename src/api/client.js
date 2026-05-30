const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || ''

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

export function getCategories() {
  return fetchJSON('/api/categories/')
}

export function getItems(params = {}) {
  const query = new URLSearchParams()
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      query.append(key, value)
    }
  })
  return fetchJSON(`/api/items/?${query.toString()}`)
}

export function getItem(id) {
  return fetchJSON(`/api/items/${id}/`)
}

export function getAdminUsers() {
  return fetchJSON('/api/admin/users/')
}

export function getAdminVerificationRequests() {
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

export function getAdminCategories() {
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

export function getAdminItems() {
  return fetchJSON('/api/admin/items/')
}

export function updateAdminItem(id, data) {
  return fetchJSON(`/api/admin/items/${id}/`, {
    method: 'PATCH',
    body: JSON.stringify(data),
  })
}

export function getAdminBookings() {
  return fetchJSON('/api/admin/bookings/')
}

export function updateAdminBooking(id, data) {
  return fetchJSON(`/api/admin/bookings/${id}/`, {
    method: 'PATCH',
    body: JSON.stringify(data),
  })
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
