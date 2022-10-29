import React from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation } from 'react-query'
import { AxiosError } from 'axios'
import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	LinearProgress,
} from '@mui/material'
import { AuthApi } from '../../api/AuthApi'
import { useDialog } from '../../hooks/useDialog'
import { useSnackbar } from '../../hooks/useSnackbar'
import { RegisterBody } from '../../types/auth'
import { FormTextField } from './FormTextField'

export function RegisterationForm() {
	const { showSnackbar } = useSnackbar()
	const { hideDialog } = useDialog()
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
		mode: 'onTouched',
		defaultValues,
	})
	const { handleSubmit, reset, clearErrors } = methods

	function handleClose() {
		hideDialog()
		clearErrors()
	}

	const { mutate: submitRegister, isLoading } = useMutation(
		(formData: RegisterBody) => AuthApi.register(formData),
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
			{isLoading && <LinearProgress />}
			<FormProvider {...methods}>
				<form onSubmit={handleSubmit(values => submitRegister(values))}>
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
						<Button type="submit" disabled={isLoading}>
							Registrovat
						</Button>
					</DialogActions>
				</form>
			</FormProvider>
		</Dialog>
	)
}
