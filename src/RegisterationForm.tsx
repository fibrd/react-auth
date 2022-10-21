import React from 'react'
import { FieldError, useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation } from 'react-query'
import { LoraApi } from './api/LoraApi'
import { RegisterRequestBody } from './types/common'
import { AxiosError } from 'axios'

export function RegisterationForm() {
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
			onError: (err: AxiosError<{ message: string }>) =>
				console.error(err.response?.data.message),
		}
	)

	return (
		<form onSubmit={handleSubmit(values => mutate(values))}>
			<input {...register('email')} type="text" placeholder="EMAIL" />
			<p>{getErrorMessage(errors.email as FieldError)}</p>
			<input {...register('username')} type="text" placeholder="USERNAME" />
			<p>{getErrorMessage(errors.username as FieldError)}</p>
			<input {...register('password')} type="password" placeholder="PASSWORD" />
			<p>{getErrorMessage(errors.password as FieldError)}</p>
			<button type="submit">Odeslat</button>
		</form>
	)
}
