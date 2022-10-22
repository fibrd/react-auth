import { BaseTextFieldProps, TextField } from '@mui/material'
import React from 'react'
import { useController } from 'react-hook-form'

interface FormTextFieldProps extends BaseTextFieldProps {
	name: string
}

export function FormTextField({ name, ...textFieldProps }: FormTextFieldProps) {
	const {
		field,
		fieldState: { error },
	} = useController({ name })

	return (
		<TextField
			{...field}
			{...textFieldProps}
			error={!!error}
			helperText={error?.message}
		/>
	)
}
