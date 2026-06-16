import React, { createContext, useContext, useState, useEffect } from 'react'
import { signup as signupAPI, login as loginAPI, logout as logoutAPI, getCurrentUser } from '../api/client'

const AuthContext = createContext(null)

const MOCK_USERS = [
  {
    id: 1,
    email: 'user@renthub.com',
    password: 'user123',
    username: 'testuser',
    first_name: 'Test',
    last_name: 'User',
    is_staff: false,
  },
  {
    id: 2,
    email: 'admin@renthub.com',
    password: 'admin123',
    username: 'adminuser',
    first_name: 'Admin',
    last_name: 'User',
    is_staff: true,
  },
]

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchCurrentUser()
  }, [])

  async function fetchCurrentUser() {
    try {
      setLoading(true)
      const stored = localStorage.getItem('renthub_mock_user')
      if (stored) {
        setUser(JSON.parse(stored))
        return
      }
      const data = await getCurrentUser()
      setUser(data.user)
    } catch {
      // No active session is a normal state — leave user as null
    } finally {
      setLoading(false)
    }
  }

  async function signup(email, username, firstName, lastName, password, passwordConfirm) {
    try {
      setLoading(true)
      setError(null)
      const data = await signupAPI({
        email,
        username,
        first_name: firstName,
        last_name: lastName,
        password,
        password_confirm: passwordConfirm,
      })
      setUser(data.user)
      return data
    } catch (err) {
      setError(err.message)
      throw err
    } finally {
      setLoading(false)
    }
  }

  async function login(email, password) {
    const mockMatch = MOCK_USERS.find((u) => u.email === email && u.password === password)
    if (mockMatch) {
      const { password: _pw, ...mockUser } = mockMatch
      localStorage.setItem('renthub_mock_user', JSON.stringify(mockUser))
      setUser(mockUser)
      return { user: mockUser }
    }

    try {
      setLoading(true)
      setError(null)
      const data = await loginAPI({ email, password })
      setUser(data.user)
      return data
    } catch (err) {
      setError(err.message)
      throw err
    } finally {
      setLoading(false)
    }
  }

  async function logout() {
    if (localStorage.getItem('renthub_mock_user')) {
      localStorage.removeItem('renthub_mock_user')
      setUser(null)
      return
    }
    try {
      setLoading(true)
      await logoutAPI()
      setUser(null)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <AuthContext.Provider value={{ user, loading, error, signup, login, logout, fetchCurrentUser }}>
      {children}
    </AuthContext.Provider>
  )
}

const useAuth = () => useContext(AuthContext)

export { AuthProvider, useAuth }
