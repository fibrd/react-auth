import React, { useContext } from 'react'
import { FieldError, useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation } from 'react-query'
import { LoraApi } from './api/LoraApi'
import { RegisterRequestBody } from './types/common'
import { AxiosError } from 'axios'
import { Button, TextField } from '@mui/material'
import SnackbarContext from './context/SnackbarContext'

export function LoginForm() {
	const { showSnackbar } = useContext(SnackbarContext)
	const validationSchema = yup.object({
		email: yup.string().required().email(),
		password: yup.string().required().min(6),
	})
	const defaultValues = {
		email: '',
		password: '',
	}

	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm({ resolver: yupResolver(validationSchema), defaultValues })

	function getErrorMessage(error?: FieldError) {
		return error?.message
	}

	const { mutate } = useMutation(
		(formData: RegisterRequestBody) => LoraApi.register(formData),
		{
			onSuccess: ({ data }) => {
				console.log(data)
				reset()
			},
			onError: (err: AxiosError<{ message: string }>) => {
				const message = err.response?.data.message
				if (message) {
					showSnackbar(message)
				}
			},
		}
	)

	return (
		<form onSubmit={handleSubmit(values => console.log(values))}>
			<div>
				<TextField
					{...register('email')}
					variant="filled"
					label="Email"
					error={!!errors.email}
					helperText={getErrorMessage(errors.email as FieldError)}
					autoComplete="off"
				/>
			</div>
			<div>
				<TextField
					{...register('password')}
					type="password"
					variant="filled"
					label="Heslo"
					error={!!errors.password}
					helperText={getErrorMessage(errors.password as FieldError)}
					autoComplete="off"
				/>
			</div>
			<Button variant="contained" type="submit">
				Odeslat
			</Button>
		</form>
	)
}
