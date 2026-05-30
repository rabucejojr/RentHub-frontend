import React, { createContext, useContext, useState, useEffect } from 'react'
import { signup as signupAPI, login as loginAPI, logout as logoutAPI, getCurrentUser } from '../api/client'

const AuthContext = createContext(null)

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
      const data = await getCurrentUser()
      setUser(data.user)
    } catch (err) {
      setError(err.message)
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
