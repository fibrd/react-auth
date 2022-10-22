import React, { useContext, useState } from 'react'
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

export function LoginForm() {
	const [isOpen, setIsOpen] = useState(false)

	const { showSnackbar } = useContext(SnackbarContext)
	const { login } = useContext(AuthContext)
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
		setIsOpen(false)
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
		<FormProvider {...methods}>
			<Button variant="outlined" onClick={() => setIsOpen(true)}>
				Open login dialog
			</Button>
			<Dialog open={isOpen} onClose={handleClose} fullWidth={true}>
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
			</Dialog>
		</FormProvider>
	)
}
