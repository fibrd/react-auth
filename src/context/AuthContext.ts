import { createContext, useState } from 'react'
import { User } from '../types/users'
import { AuthContextType } from '../types/common'

export const AuthContext = createContext<AuthContextType | null>(null)

export function useAuthContext() {
	const [user, setUser] = useState<User | null>(null)
	const login = (u: User) => setUser(u)
	const logout = () => setUser(null)

	return { user, login, logout }
}
