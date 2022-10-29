import React from 'react'
import { LinearProgress } from '@mui/material'
import { AxiosError } from 'axios'
import { useMutation } from 'react-query'
import { AuthApi } from '../api/AuthApi'
import { AccountMenu } from '../components/AccountMenu'
import { useAuth } from '../hooks/useAuth'
import { useSnackbar } from '../hooks/useSnackbar'

export function Home() {
	const { logout } = useAuth()
	const { showSnackbar } = useSnackbar()

	const { mutate: submitLogout, isLoading } = useMutation(
		() => AuthApi.logout(),
		{
			onSuccess: ({ data }) => {
				localStorage.removeItem('user')
				logout()
				showSnackbar(data.message, 'info')
			},
			onError: (err: AxiosError<{ message: string }>) => {
				const message = err.response?.data.message
				if (message) {
					showSnackbar(message, 'error')
				}
			},
		}
	)

	return (
		<>
			{isLoading && <LinearProgress />}
			<div className="home">
				<AccountMenu onLogout={submitLogout} />
			</div>
		</>
	)
}
