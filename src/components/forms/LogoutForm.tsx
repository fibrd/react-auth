import React from 'react'
import { useMutation } from 'react-query'
import { AuthApi } from '../../api/AuthApi'
import { AxiosError } from 'axios'
import { Button, Dialog, DialogActions, DialogTitle } from '@mui/material'
import { useSnackbar } from '../../hooks/useSnackbar'
import { useDialog } from '../../hooks/useDialog'
import { useAuth } from '../../hooks/useAuth'

export function LogoutForm() {
	const { showSnackbar } = useSnackbar()
	const { hideDialog } = useDialog()
	const { logout } = useAuth()

	const { mutate: submitLogout, isLoading } = useMutation(AuthApi.logout, {
		onSuccess: () => {
			localStorage.removeItem('user')
			logout()
			hideDialog()
			showSnackbar('Byl jste odhlášen.', 'info')
		},
		onError: (err: AxiosError<{ message: string }>) => {
			const message = err.response?.data.message
			if (message) {
				showSnackbar(message, 'error')
			}
		},
	})

	return (
		<Dialog open={true} onClose={() => hideDialog()} fullWidth={true}>
			<DialogTitle>Opravdu si přejete odhlásit?</DialogTitle>
			<DialogActions>
				<Button
					onClick={() => hideDialog()}
					variant="text"
					sx={{ marginRight: '15px' }}
				>
					Zrušit
				</Button>
				<Button
					onClick={() => submitLogout()}
					variant="contained"
					disabled={isLoading}
				>
					Odhlásit
				</Button>
			</DialogActions>
		</Dialog>
	)
}
