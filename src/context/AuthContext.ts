import { createContext, useState } from 'react'
import { Auth, User } from '../types/auth'

export const AuthContext = createContext<Auth | null>(null)

export function useAuthContext() {
	const [isInitialized, setIsInitialized] = useState(false)
	const [user, setUser] = useState<User | null>(null)
	const login = (u: User | null) => {
		setUser(u)
		setIsInitialized(true)
	}
	const logout = () => setUser(null)

	return { isInitialized, user, login, logout }
}
