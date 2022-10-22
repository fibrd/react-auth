import React, { useContext } from 'react'
import DialogContext from './context/DialogContext'
import { LoginForm } from './LoginForm'
import { RegisterationForm } from './RegisterationForm'
import { DialogType } from './types/common'

export function AppDialog() {
	const { dialogType } = useContext(DialogContext)

	switch (dialogType) {
		case DialogType.REGISTRATION:
			return <RegisterationForm />
		case DialogType.LOGIN:
			return <LoginForm />
		default:
			return null
	}
}
