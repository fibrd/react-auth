import React, { useContext } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation } from 'react-query'
import { AuthApi } from './api/AuthApi'
import { RegisterRequestBody } from './types/common'
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
import DialogContext from './context/DialogContext'

export function RegisterationForm() {
	const { showSnackbar } = useContext(SnackbarContext)
	const { hideDialog } = useContext(DialogContext)
	const validationSchema = yup.object({
		email: yup.string().required().email(),
		username: yup.string().required().min(3).max(12),
		password: yup.string().required().min(6),
	})
	const defaultValues = {
		email: '',
		username: '',
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
		(formData: RegisterRequestBody) => AuthApi.register(formData),
		{
			onSuccess: ({ data }) => {
				console.log(data)
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
					<DialogTitle>Register</DialogTitle>
					<DialogContent>
						<FormTextField
							name="email"
							variant="standard"
							margin="dense"
							label="Email"
							fullWidth
						/>
						<FormTextField
							name="username"
							variant="standard"
							margin="dense"
							label="Username"
							fullWidth
						/>
						<FormTextField
							name="password"
							type="password"
							variant="standard"
							margin="dense"
							label="Heslo"
							fullWidth
						/>
					</DialogContent>
					<DialogActions>
						<Button type="submit">Registrovat</Button>
					</DialogActions>
				</form>
			</FormProvider>
		</Dialog>
	)
}
