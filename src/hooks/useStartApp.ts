import { useEffect } from 'react'
import { User } from '../types/users'
import { useAuth } from './useAuth'

export function useStartApp() {
	const { login } = useAuth()

	useEffect(() => {
		const userItem = localStorage.getItem('user')
		const user = userItem ? (JSON.parse(userItem) as User) : null
		if (user) {
			login(user)
		}
	}, [login])
}
