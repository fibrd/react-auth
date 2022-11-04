import { AlertColor } from '@mui/material'

export enum DialogType {
	REGISTRATION = 'registration',
	LOGIN = 'login',
	LOGOUT = 'logout',
	PASSWORD_FORGOTTEN = 'passwordForgotten',
	PASSWORD_RESET = 'passwordReset',
}

export interface Dialog {
	dialogType: DialogType | null
	dialogData: unknown | null
	showDialog: (type: DialogType, dialogData?: unknown) => void
	hideDialog: () => void
}

export interface Snackbar {
	snackbarText: string | null
	severity: AlertColor
	showSnackbar: (text: string, alertColor: AlertColor) => void
	hideSnackbar: () => void
}
