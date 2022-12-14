import React from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation } from 'react-query'
import { AuthApi } from '../../api/AuthApi'
import { AxiosError } from 'axios'
import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
} from '@mui/material'
import { FormTextField } from '../forms/FormTextField'
import { useAuth } from '../../hooks/useAuth'
import { useDialog } from '../../hooks/useDialog'
import { useSnackbar } from '../../hooks/useSnackbar'
import { LoginBody } from '../../types/auth'
import { DialogType } from '../../types/common'

export function LoginForm() {
	const { login } = useAuth()
	const { showSnackbar } = useSnackbar()
	const { showDialog, hideDialog } = useDialog()
	const validationSchema = yup.object({
		email: yup.string().required().email(),
		password: yup.string().required().min(6),
	})
	const defaultValues = {
		email: localStorage.getItem('tipEmail') ?? '',
		password: '',
	}

	const methods = useForm({
		resolver: yupResolver(validationSchema),
		mode: 'onTouched',
		defaultValues,
	})
	const { handleSubmit, reset, clearErrors } = methods

	function handleClose() {
		hideDialog()
		clearErrors()
	}

	const { mutate: submitLogin, isLoading } = useMutation(
		(formData: LoginBody) => AuthApi.login(formData),
		{
			onSuccess: ({ data }) => {
				login(data.user)
				showSnackbar('Byl jste úspěšně přihlášen.', 'success')
				handleClose()
				reset()
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
		<Dialog open={true} onClose={handleClose} fullWidth={true}>
			<FormProvider {...methods}>
				<form onSubmit={handleSubmit(values => submitLogin(values))}>
					<DialogTitle>Přihlášení</DialogTitle>
					<DialogContent sx={{ minHeight: '200px' }}>
						<FormTextField
							name="email"
							variant="standard"
							margin="dense"
							label="Email"
							fullWidth
						/>
						<FormTextField
							name="password"
							variant="standard"
							margin="dense"
							type="password"
							label="Heslo"
							fullWidth
						/>
					</DialogContent>
					<DialogActions>
						<Button
							size="small"
							variant="text"
							onClick={() => showDialog(DialogType.PASSWORD_FORGOTTEN)}
							sx={{ marginRight: '15px' }}
						>
							Zapomenuté heslo
						</Button>
						<Button variant="contained" type="submit" disabled={isLoading}>
							Přihlásit
						</Button>
					</DialogActions>
				</form>
			</FormProvider>
		</Dialog>
	)
}
