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
import { ResetPasswordBody } from './types/auth'
import { useNavigate } from 'react-router-dom'

export function PasswordResetForm() {
	const navigate = useNavigate()
	const { showSnackbar } = useSnackbar()
	const { dialogData, hideDialog } = useDialog()
	const { id, token, email } = dialogData as {
		id: string
		token: string
		email: string
	}
	const validationSchema = yup.object({
		password: yup.string().required().min(6),
	})
	const defaultValues = {
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
		(formData: ResetPasswordBody) =>
			AuthApi.postResetPassword(id, token, formData),
		{
			onSuccess: ({ data }) => {
				showSnackbar(data.message, 'success')
				handleClose()
				reset()
				navigate('/')
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
					<DialogTitle>
						Změna hesla pro uživatele s emailem: {email}
					</DialogTitle>
					<DialogContent sx={{ minHeight: '100px' }}>
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
						<Button variant="contained" type="submit">
							Odeslat
						</Button>
					</DialogActions>
				</form>
			</FormProvider>
		</Dialog>
	)
}
