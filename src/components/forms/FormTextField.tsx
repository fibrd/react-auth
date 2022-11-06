import React, { useEffect } from 'react'
import { BaseTextFieldProps, TextField } from '@mui/material'
import { useController } from 'react-hook-form'

interface FormTextFieldProps extends BaseTextFieldProps {
	name: string
}

export function FormTextField({ name, ...textFieldProps }: FormTextFieldProps) {
	const {
		field,
		fieldState: { error },
	} = useController({ name })

	useEffect(() => {
		return () => {
			if (name === 'email') {
				localStorage.setItem('tipEmail', field.value)
			} else if (name === 'username') {
				localStorage.setItem('tipUsername', field.value)
			}
		}
	}, [name, field.value])

	return (
		<TextField
			{...field}
			{...textFieldProps}
			error={!!error}
			helperText={error?.message}
		/>
	)
}
