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
} from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { AuthApi } from '../../api/AuthApi'
import { useDialog } from '../../hooks/useDialog'
import { useSnackbar } from '../../hooks/useSnackbar'
import { ResetPasswordBody } from '../../types/auth'
import { FormTextField } from './FormTextField'

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

	const { mutate: resetPassword, isLoading } = useMutation(
		(formData: ResetPasswordBody) => AuthApi.resetPassword(id, token, formData),
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
				<form onSubmit={handleSubmit(values => resetPassword(values))}>
					<DialogTitle>Změna hesla pro: {email}</DialogTitle>
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
						<Button variant="contained" type="submit" disabled={isLoading}>
							Změnit heslo
						</Button>
					</DialogActions>
				</form>
			</FormProvider>
		</Dialog>
	)
}
