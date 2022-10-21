import React from 'react'
import { FieldError, FieldValues, useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

export function RegisterationForm() {
	const validationSchema = yup.object({
		email: yup.string().required().email(),
		username: yup.string().required(),
		password: yup.string().required(),
	})

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({ resolver: yupResolver(validationSchema) })

	function getErrorMessage(error?: FieldError) {
		return error?.message
	}

	function doHandleSubmit(values: FieldValues) {
		console.log(values)
	}

	return (
		<form onSubmit={handleSubmit(doHandleSubmit)}>
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
