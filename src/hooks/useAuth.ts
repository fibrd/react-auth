import { useContext } from 'react'
import { AuthContext } from '../context/authContext'

export function useAuth() {
	const auth = useContext(AuthContext)
	if (auth === null) {
		throw new Error('AuthContext nebyl inicializován.')
	}
	return auth
}
