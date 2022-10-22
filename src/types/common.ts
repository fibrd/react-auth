import { AlertColor } from '@mui/material'
import { User } from './users'

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

export interface AuthContextType {
	user: User | null
	login: (user: User) => void
	logout: () => void
}
