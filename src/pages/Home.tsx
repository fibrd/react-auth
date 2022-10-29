import React, { useEffect } from 'react'
import { AxiosError } from 'axios'
import { useMutation } from 'react-query'
import { AuthApi } from '../api/AuthApi'
import { useAuth } from '../hooks/useAuth'
import { useSnackbar } from '../hooks/useSnackbar'
import { AppMenu } from '../components/AppMenu'
import { useProgress } from '../hooks/useProgress'

export function Home() {
	const { logout } = useAuth()
	const { showSnackbar } = useSnackbar()
	const { showProgress, hideProgress } = useProgress()

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

	useEffect(() => {
		isLoading ? showProgress() : hideProgress()
	}, [isLoading])

	return (
		<>
			<AppMenu onLogout={submitLogout} />
			<div className="home"></div>
		</>
	)
}
