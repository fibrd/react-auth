import React from 'react'
import { useDialog } from '../../hooks/useDialog'
import { PasswordForgottenForm } from '../forms/PasswordForgottenForm'
import { DialogType } from '../../types/common'
import { LoginForm } from '../forms/LoginForm'
import { PasswordResetForm } from '../forms/PasswordResetForm'
import { RegisterationForm } from '../forms/RegisterationForm'
import { LogoutForm } from '../forms/LogoutForm'
import { AccountModal } from '../AccountModal'

export function AppDialog() {
	const { dialogType } = useDialog()

	switch (dialogType) {
		case DialogType.REGISTRATION:
			return <RegisterationForm />
		case DialogType.LOGIN:
			return <LoginForm />
		case DialogType.LOGOUT:
			return <LogoutForm />
		case DialogType.PASSWORD_FORGOTTEN:
			return <PasswordForgottenForm />
		case DialogType.PASSWORD_RESET:
			return <PasswordResetForm />
		case DialogType.ACCOUNT:
			return <AccountModal />
		default:
			return null
	}
}
