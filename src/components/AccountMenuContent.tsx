import React from 'react'
import { MenuItem, ListItemIcon } from '@mui/material'
import { Person, Logout, Login, PersonAdd } from '@mui/icons-material'
import { useAuth } from '../hooks/useAuth'
import { useDialog } from '../hooks/useDialog'
import { DialogType } from '../types/common'
import { AxiosError } from 'axios'
import { useMutation } from 'react-query'
import { AuthApi } from '../api/AuthApi'
import { useSnackbar } from '../hooks/useSnackbar'

export function AccountMenuContent() {
	const { logout, user } = useAuth()
	const { showSnackbar } = useSnackbar()
	const { showDialog } = useDialog()

	const { mutate: submitLogout } = useMutation(() => AuthApi.logout(), {
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
						<PersonAdd fontSize="small" />
					</ListItemIcon>
					Registrace
				</MenuItem>
				<MenuItem onClick={() => showDialog(DialogType.LOGIN)}>
					<ListItemIcon>
						<Login fontSize="small" />
					</ListItemIcon>
					Přihlášení
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
			<MenuItem onClick={() => submitLogout()}>
				<ListItemIcon>
					<Logout fontSize="small" />
				</ListItemIcon>
				Odhlásit
			</MenuItem>
		</>
	)
}
