import { useEffect, useState } from 'react'
import { useApp } from './context/AppContext'

// const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

function LoginPage({ onLogin }) {
  const [mode, setMode] = useState('login') // 'login' | 'register' | 'changePassword'
  const {BASE_URL} = useApp()
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    confirmPassword: '',
    currentPassword: '',
    newPassword: '',
  })
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [hasAdmin, setHasAdmin] = useState(true)

  useEffect(() => {
    ;(async () => {
      try {
        const res = await fetch(`${BASE_URL}/register`)
        if (res.ok) {
          const data = await res.json()
          if (typeof data.hasAdmin === 'boolean') {
            setHasAdmin(data.hasAdmin)
            if (!data.hasAdmin) {
              setMode('register')
            }
          }
        }
      } catch (e) {
        console.error('Failed to check admin status', e)
      }
    })()
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    try {
      if (mode === 'login') {
        const res = await fetch(`${BASE_URL}/login`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            username: formData.username,
            password: formData.password,
          }),
        })
        const data = await res.json().catch(() => ({}))
        if (!res.ok) {
          setError(data.error || 'Login failed')
          setIsLoading(false)
          return
        }
        localStorage.setItem('isAuthenticated', 'true')
        localStorage.setItem('username', data.username || formData.username)
        localStorage.setItem('loginAt', String(Date.now()))
        setTimeout(() => {
          window.location.href = '/admin'
        }, 100)
      } else if (mode === 'register') {
        if (!formData.username || !formData.password || !formData.confirmPassword) {
          setError('Please fill in all fields')
          setIsLoading(false)
          return
        }
        if (formData.password !== formData.confirmPassword) {
          setError('Passwords do not match')
          setIsLoading(false)
          return
        }
        const res = await fetch(`${API_BASE}/auth/register`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            username: formData.username,
            password: formData.password,
          }),
        })
        const data = await res.json().catch(() => ({}))
        if (!res.ok) {
          setError(data.error || 'Registration failed')
          setIsLoading(false)
          return
        }
        setHasAdmin(true)
        setMode('login')
        setError('')
        setIsLoading(false)
      } else if (mode === 'changePassword') {
        if (!formData.username || !formData.currentPassword || !formData.newPassword) {
          setError('Please fill in all fields')
          setIsLoading(false)
          return
        }
        const res = await fetch(`${API_BASE}/auth/change-password`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            username: formData.username,
            currentPassword: formData.currentPassword,
            newPassword: formData.newPassword,
          }),
        })
        const data = await res.json().catch(() => ({}))
        if (!res.ok) {
          setError(data.error || 'Password change failed')
          setIsLoading(false)
          return
        }
        setMode('login')
        setError('')
        setIsLoading(false)
      }
    } catch (err) {
      console.error('Auth request failed', err)
      setError('Something went wrong. Please try again.')
      setIsLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 px-4">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute left-1/4 top-1/4 h-96 w-96 rounded-full bg-indigo-500/20 blur-3xl"></div>
        <div className="absolute right-1/4 bottom-1/4 h-96 w-96 rounded-full bg-purple-500/20 blur-3xl"></div>
      </div>

      <div className="relative w-full max-w-md">
        {/* Login Card */}
        <div className="rounded-2xl border border-white/10 bg-white/10 p-8 shadow-2xl backdrop-blur-xl">
          {/* Logo and Header */}
          <div className="mb-8 text-center">
            <div className="mb-4 flex justify-center">
              <img
                src="/logo.jfif"
                alt="Igala Wikimedia Community logo"
                className="h-16 w-auto rounded-xl object-contain shadow-lg ring-2 ring-white/20"
              />
            </div>
            <h1 className="text-3xl font-extrabold text-white">
              {mode === 'login' && 'Admin Login'}
              {mode === 'register' && 'Create Admin Account'}
              {mode === 'changePassword' && 'Change Password'}
            </h1>
            <p className="mt-2 text-sm text-white/70">
              {mode === 'login' && 'Sign in to access the admin dashboard'}
              {mode === 'register' && 'Create the first admin account for this site'}
              {mode === 'changePassword' && 'Update your admin password'}
            </p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Username Field */}
            <div>
              <label htmlFor="username" className="mb-2 block text-sm font-semibold text-white">
                Username
              </label>
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <svg
                    className="h-5 w-5 text-white/40"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                </div>
                <input
                  id="username"
                  type="text"
                  value={formData.username}
                  onChange={(e) => {
                    setFormData({ ...formData, username: e.target.value })
                    setError('')
                  }}
                  className="w-full rounded-lg border border-white/20 bg-white/10 px-4 py-3 pl-10 text-white placeholder-white/40 backdrop-blur-sm transition-all focus:border-white/40 focus:bg-white/15 focus:outline-none focus:ring-2 focus:ring-white/20"
                  placeholder="Enter your username"
                  required
                  autoComplete="username"
                />
              </div>
            </div>

            {/* Password Fields */}
            {mode === 'login' && (
              <div>
                <label htmlFor="password" className="mb-2 block text-sm font-semibold text-white">
                  Password
                </label>
                <div className="relative">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    <svg
                      className="h-5 w-5 text-white/40"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                      />
                    </svg>
                  </div>
                  <input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    value={formData.password}
                    onChange={(e) => {
                      setFormData({ ...formData, password: e.target.value })
                      setError('')
                    }}
                    className="w-full rounded-lg border border-white/20 bg-white/10 px-4 py-3 pl-10 pr-10 text-white placeholder-white/40 backdrop-blur-sm transition-all focus:border-white/40 focus:bg-white/15 focus:outline-none focus:ring-2 focus:ring-white/20"
                    placeholder="Enter your password"
                    required
                    autoComplete="current-password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 flex items-center pr-3 text-white/40 hover:text-white/60"
                  >
                    {showPassword ? (
                      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                        />
                      </svg>
                    ) : (
                      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                        />
                      </svg>
                    )}
                  </button>
                </div>
              </div>
            )}

            {mode === 'register' && (
              <>
                <div>
                  <label htmlFor="password" className="mb-2 block text-sm font-semibold text-white">
                    Password
                  </label>
                  <div className="relative">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                      <svg
                        className="h-5 w-5 text-white/40"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                        />
                      </svg>
                    </div>
                    <input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      value={formData.password}
                      onChange={(e) => {
                        setFormData({ ...formData, password: e.target.value })
                        setError('')
                      }}
                      className="w-full rounded-lg border borderWHITE/20 bg-white/10 px-4 py-3 pl-10 pr-10 text-white placeholder-white/40 backdrop-blur-sm transition-all focus:border-white/40 focus:bg-white/15 focus:outline-none focus:ring-2 focus:ring-white/20"
                      placeholder="Enter password"
                      required
                      autoComplete="new-password"
                    />
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="confirmPassword"
                    className="mb-2 block text-sm font-semibold text-white"
                  >
                    Confirm Password
                  </label>
                  <div className="relative">
                    <input
                      id="confirmPassword"
                      type={showPassword ? 'text' : 'password'}
                      value={formData.confirmPassword}
                      onChange={(e) => {
                        setFormData({ ...formData, confirmPassword: e.target.value })
                        setError('')
                      }}
                      className="w-full rounded-lg border border-white/20 bg-white/10 px-4 py-3 text-white placeholder-white/40 backdrop-blur-sm transition-all focus:border-white/40 focus:bg-white/15 focus:outline-none focus:ring-2 focus:ring-white/20"
                      placeholder="Confirm password"
                      required
                      autoComplete="new-password"
                    />
                  </div>
                </div>
              </>
            )}

            {mode === 'changePassword' && (
              <>
                <div>
                  <label
                    htmlFor="currentPassword"
                    className="mb-2 block text-sm font-semibold text-white"
                  >
                    Current Password
                  </label>
                  <div className="relative">
                    <input
                      id="currentPassword"
                      type={showPassword ? 'text' : 'password'}
                      value={formData.currentPassword}
                      onChange={(e) => {
                        setFormData({ ...formData, currentPassword: e.target.value })
                        setError('')
                      }}
                      className="w-full rounded-lg border border-white/20 bg-white/10 px-4 py-3 text-white placeholder-white/40 backdrop-blur-sm transition-all focus:border-white/40 focus:bg-white/15 focus:outline-none focus:ring-2 focus:ring-white/20"
                      placeholder="Enter current password"
                      required
                      autoComplete="current-password"
                    />
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="newPassword"
                    className="mb-2 block text-sm font-semibold text-white"
                  >
                    New Password
                  </label>
                  <div className="relative">
                    <input
                      id="newPassword"
                      type={showPassword ? 'text' : 'password'}
                      value={formData.newPassword}
                      onChange={(e) => {
                        setFormData({ ...formData, newPassword: e.target.value })
                        setError('')
                      }}
                      className="w-full rounded-lg border border-white/20 bg-white/10 px-4 py-3 text-white placeholder-white/40 backdrop-blur-sm transition-all focus:border-white/40 focus:bg-white/15 focus:outline-none focus:ring-2 focus:ring-white/20"
                      placeholder="Enter new password"
                      required
                      autoComplete="new-password"
                    />
                  </div>
                </div>
              </>
            )}

            {/* Error Message */}
            {error && (
              <div className="rounded-lg border border-red-500/50 bg-red-500/10 p-3 text-sm text-red-200 backdrop-blur-sm">
                <div className="flex items-center gap-2">
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  {error}
                </div>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-3 text-base font-semibold text-white shadow-lg shadow-indigo-500/25 transition-all hover:shadow-xl hover:shadow-indigo-500/30 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isLoading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg
                    className="h-5 w-5 animate-spin"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  Signing in...
                </span>
              ) : mode === 'login' ? (
                'Sign In'
              ) : mode === 'register' ? (
                'Create Admin'
              ) : (
                'Change Password'
              )}
            </button>
          </form>

          {/* Mode Switch Links */}
          <div className="mt-4 flex flex-col items-center gap-2 text-xs text-white/70">
            {mode !== 'login' && (
              <button
                type="button"
                onClick={() => {
                  setMode('login')
                  setError('')
                }}
                className="underline hover:text-white/90"
              >
                Back to login
              </button>
            )}
            {hasAdmin && mode === 'login' && (
              <button
                type="button"
                onClick={() => {
                  setMode('changePassword')
                  setError('')
                }}
                className="underline hover:text-white/90"
              >
                Change password
              </button>
            )}
            {!hasAdmin && mode !== 'register' && (
              <button
                type="button"
                onClick={() => {
                  setMode('register')
                  setError('')
                }}
                className="underline hover:text-white/90"
              >
                Create admin account
              </button>
            )}
          </div>

          {/* Back to Home Link */}
          <div className="mt-6 text-center">
            <a
              href="/"
              className="text-sm text-white/60 transition-colors hover:text-white/80"
            >
              ← Back to Homepage
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginPage
