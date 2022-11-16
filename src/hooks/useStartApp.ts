import { useQuery } from 'react-query'
import { AuthApi } from '../api/AuthApi'
import { useAuth } from './useAuth'

export function useStartApp() {
	const { login } = useAuth()

	useQuery(['api/init'], AuthApi.initUser, {
		onSuccess: ({ data }) => {
			login(data.user)
		},
	})
}
