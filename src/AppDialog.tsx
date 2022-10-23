import React from 'react'
import { useDialog } from './hooks/useDialog'
import { LoginForm } from './LoginForm'
import { RegisterationForm } from './RegisterationForm'
import { DialogType } from './types/common'

export function AppDialog() {
	const { dialogType } = useDialog()

	switch (dialogType) {
		case DialogType.REGISTRATION:
			return <RegisterationForm />
		case DialogType.LOGIN:
			return <LoginForm />
		default:
			return null
	}
}
