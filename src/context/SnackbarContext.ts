import { createContext, useState } from 'react'
import { AlertColor } from '@mui/material'
import { Snackbar } from '../types/common'

export const SnackbarContext = createContext<Snackbar | null>(null)

export function useSnackbarContext() {
	const [snackbarText, setSnackbarText] = useState<string | null>(null)
	const [severity, setSeverity] = useState<AlertColor>('info')
	const showSnackbar = (text: string, alertColor: AlertColor = 'info') => {
		if (snackbarText !== null) {
			setSnackbarText(null)
		}
		setTimeout(() => {
			setSnackbarText(text)
			setSeverity(alertColor)
		}, 0)
	}
	const hideSnackbar = () => {
		setSnackbarText(null)
	}

	return { snackbarText, severity, showSnackbar, hideSnackbar }
}
