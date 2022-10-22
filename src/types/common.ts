import { AlertColor } from '@mui/material'

export enum Section {
	REGISTRATION = 'registration',
	LOGIN = 'login',
}

export interface RegisterRequestBody {
	email: string
	username: string
	password: string
}

export interface LoginRequestBody {
	email: string
	password: string
}

export interface SnackbarContextType {
	snackbarText: string | null
	severity: AlertColor
	showSnackbar: (text: string, alertColor?: AlertColor) => void
	hideSnackbar: () => void
}
