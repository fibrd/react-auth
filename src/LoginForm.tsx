import React from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation } from 'react-query'
import { AuthApi } from './api/AuthApi'
import { AxiosError } from 'axios'
import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
} from '@mui/material'
import { FormTextField } from './components/FormTextField'
import { useAuth } from './hooks/useAuth'
import { useSnackbar } from './hooks/useSnackbar'
import { useDialog } from './hooks/useDialog'
import { LoginBody } from './types/auth'

export function LoginForm() {
	const { login } = useAuth()
	const { showSnackbar } = useSnackbar()
	const { hideDialog } = useDialog()
	const validationSchema = yup.object({
		email: yup.string().required().email(),
		password: yup.string().required().min(6),
	})
	const defaultValues = {
		email: '',
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

	const { mutate } = useMutation(
		(formData: LoginBody) => AuthApi.login(formData),
		{
			onSuccess: ({ data }) => {
				localStorage.setItem('user', JSON.stringify(data.user))
				login(data.user)
				showSnackbar(data.message, 'success')
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
				<form onSubmit={handleSubmit(values => mutate(values))}>
					<DialogTitle>Login</DialogTitle>
					<DialogContent>
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
						<Button type="submit">Přihlásit</Button>
					</DialogActions>
				</form>
			</FormProvider>
		</Dialog>
	)
}
