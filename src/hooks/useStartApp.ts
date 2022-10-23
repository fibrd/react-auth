import { useContext, useEffect } from 'react'
import { AuthContext } from '../context/authContext'
import { User } from '../types/users'

export function useStartApp() {
	const { login } = useContext(AuthContext)

	useEffect(() => {
		const userItem = localStorage.getItem('user')
		const user = userItem ? (JSON.parse(userItem) as User) : null
		if (user) {
			login(user)
		}
	}, [login])
}
