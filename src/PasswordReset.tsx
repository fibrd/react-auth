import React, { useState } from 'react'
import { useQuery } from 'react-query'
import { useNavigate, useParams } from 'react-router-dom'
import { AuthApi } from './api/AuthApi'
import { useSnackbar } from './hooks/useSnackbar'

export function PasswordReset() {
	const navigate = useNavigate()
	const { id, token } = useParams<{ id: string; token: string }>()
	const { showSnackbar } = useSnackbar()
	const [email, setEmail] = useState<string>()

	useQuery(
		['/reset-password/:id/:token', id, token],
		() => AuthApi.resetPassword(id ?? '', token ?? ''),
		{
			enabled: !!id && !!token,
			onSuccess: ({ data }) => {
				setEmail(data.email)
			},
			onError: () => {
				showSnackbar('Nastala chyba při validaci reset linku.', 'error')
				navigate('/')
			},
		}
	)

	return <>{email && <div>{email}</div>}</>
}
