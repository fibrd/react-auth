import React, { useContext } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation } from 'react-query'
import { LoraApi } from './api/LoraApi'
import { LoginRequestBody } from './types/common'
import { AxiosError } from 'axios'
import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
} from '@mui/material'
import SnackbarContext from './context/SnackbarContext'
import { FormTextField } from './components/FormTextField'
import AuthContext from './context/AuthContext'
import DialogContext from './context/DialogContext'

export function LoginForm() {
	const { login } = useContext(AuthContext)
	const { showSnackbar } = useContext(SnackbarContext)
	const { hideDialog } = useContext(DialogContext)
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
		mode: 'all',
		defaultValues,
	})
	const { handleSubmit, reset, clearErrors } = methods

	function handleClose() {
		hideDialog()
		clearErrors()
	}

	const { mutate } = useMutation(
		(formData: LoginRequestBody) => LoraApi.login(formData),
		{
			onSuccess: ({ data }) => {
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
