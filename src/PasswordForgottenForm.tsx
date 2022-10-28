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
import { useSnackbar } from './hooks/useSnackbar'
import { useDialog } from './hooks/useDialog'
import { ForgottenPasswordBody } from './types/auth'

export function PasswordForgottenForm() {
	const { showSnackbar } = useSnackbar()
	const { hideDialog } = useDialog()
	const validationSchema = yup.object({
		email: yup.string().required().email(),
	})
	const defaultValues = {
		email: '',
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
		(formData: ForgottenPasswordBody) => AuthApi.forgottenPassword(formData),
		{
			onSuccess: ({ data }) => {
				showSnackbar(data.message, 'info')
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
					<DialogTitle>Odeslat reset link na zadaný email</DialogTitle>
					<DialogContent sx={{ minHeight: '100px' }}>
						<FormTextField
							name="email"
							variant="standard"
							margin="dense"
							label="Email"
							fullWidth
						/>
					</DialogContent>
					<DialogActions>
						<Button variant="contained" type="submit">
							Odeslat
						</Button>
					</DialogActions>
				</form>
			</FormProvider>
		</Dialog>
	)
}