import React from 'react'
import { useDialog } from './hooks/useDialog'
import { LoginForm } from './LoginForm'
import { PasswordForgottenForm } from './PasswordForgottenForm'
import { PasswordResetForm } from './PasswordResetForm'
import { RegisterationForm } from './RegisterationForm'
import { DialogType } from './types/common'

export function AppDialog() {
	const { dialogType } = useDialog()

	switch (dialogType) {
		case DialogType.REGISTRATION:
			return <RegisterationForm />
		case DialogType.LOGIN:
			return <LoginForm />
		case DialogType.PASSWORD_FORGOTTEN:
			return <PasswordForgottenForm />
		case DialogType.PASSWORD_RESET: {
			return <PasswordResetForm />
		}
		default:
			return null
	}
}
