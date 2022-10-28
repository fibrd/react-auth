import { LinearProgress } from '@mui/material'
import React from 'react'
import { useQuery } from 'react-query'
import { useNavigate, useParams } from 'react-router-dom'
import { AuthApi } from '../api/AuthApi'
import { useDialog } from '../hooks/useDialog'
import { useSnackbar } from '../hooks/useSnackbar'
import { DialogType } from '../types/common'

export function PasswordReset() {
	const navigate = useNavigate()
	const { id, token } = useParams<{ id: string; token: string }>()
	const { showSnackbar } = useSnackbar()
	const { showDialog } = useDialog()

	const { isLoading } = useQuery(
		['/reset-password/:id/:token', id, token],
		() => AuthApi.validateLink(id ?? '', token ?? ''),
		{
			enabled: !!id && !!token,
			onSuccess: ({ data }) => {
				showDialog(DialogType.PASSWORD_RESET, { id, token, email: data.email })
			},
			onError: () => {
				showSnackbar('Nastala chyba při validaci reset linku.', 'error')
				navigate('/')
			},
		}
	)

	return <div>{isLoading && <LinearProgress />}</div>
}
