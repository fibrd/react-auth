import { AlertColor } from '@mui/material'

export enum DialogType {
	REGISTRATION = 'registration',
	LOGIN = 'login',
}

export interface Dialog {
	dialogType: DialogType | null
	showDialog: (type: DialogType) => void
	hideDialog: () => void
}

export interface Snackbar {
	snackbarText: string | null
	severity: AlertColor
	showSnackbar: (text: string, alertColor?: AlertColor) => void
	hideSnackbar: () => void
}
