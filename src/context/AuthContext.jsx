import { createContext, useContext, useState, useCallback } from 'react'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
    const [user, setUser] = useState(() => {
        const saved = localStorage.getItem('vitta_user')
        return saved ? JSON.parse(saved) : null
    })

    const login = useCallback((name, email, role) => {
        const userData = { name, email, role, loggedInAt: new Date().toISOString() }
        setUser(userData)
        localStorage.setItem('vitta_user', JSON.stringify(userData))
    }, [])

    const logout = useCallback(() => {
        setUser(null)
        localStorage.removeItem('vitta_user')
    }, [])

    return (
        <AuthContext.Provider value={{ user, login, logout, isAuthenticated: !!user }}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    const ctx = useContext(AuthContext)
    if (!ctx) throw new Error('useAuth must be used within AuthProvider')
    return ctx
}
