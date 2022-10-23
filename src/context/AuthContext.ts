import { createContext, useState } from 'react'
import { Auth, User } from '../types/auth'

export const AuthContext = createContext<Auth | null>(null)

export function useAuthContext() {
	const [user, setUser] = useState<User | null>(null)
	const login = (u: User) => setUser(u)
	const logout = () => setUser(null)

	return { user, login, logout }
}
