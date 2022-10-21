import React from 'react'
import { FieldError, useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation } from 'react-query'
import { LoraApi } from './api/LoraApi'
import { RegisterRequestBody } from './types/common'

export function RegisterationForm() {
	const { mutate } = useMutation((formData: RegisterRequestBody) => {
		return LoraApi.register(formData)
	})

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

	return (
		<form
			onSubmit={handleSubmit(values => {
				reset()
				mutate(values)
			})}
		>
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
