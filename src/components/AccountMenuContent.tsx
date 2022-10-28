import React from 'react'
import { MenuItem, ListItemIcon } from '@mui/material'
import { Person, Logout, Login, AppRegistration } from '@mui/icons-material'
import { useMutation } from 'react-query'
import { AxiosError } from 'axios'
import { AuthApi } from '../api/AuthApi'
import { useAuth } from '../hooks/useAuth'
import { useDialog } from '../hooks/useDialog'
import { useSnackbar } from '../hooks/useSnackbar'
import { DialogType } from '../types/common'

export function AccountMenuContent() {
	const { user, logout } = useAuth()
	const { showSnackbar } = useSnackbar()
	const { showDialog } = useDialog()

	const { mutate } = useMutation(() => AuthApi.logout(), {
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
	})

	if (!user) {
		return (
			<>
				<MenuItem onClick={() => showDialog(DialogType.REGISTRATION)}>
					<ListItemIcon>
						<AppRegistration fontSize="small" />
					</ListItemIcon>
					Register
				</MenuItem>
				<MenuItem onClick={() => showDialog(DialogType.LOGIN)}>
					<ListItemIcon>
						<Login fontSize="small" />
					</ListItemIcon>
					Login
				</MenuItem>
			</>
		)
	}

	return (
		<>
			<MenuItem>
				<ListItemIcon>
					<Person fontSize="small" />
				</ListItemIcon>
				{user.username}
			</MenuItem>
			<MenuItem onClick={() => mutate()}>
				<ListItemIcon>
					<Logout fontSize="small" />
				</ListItemIcon>
				Logout
			</MenuItem>
		</>
	)
}
