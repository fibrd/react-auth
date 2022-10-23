import { createContext, useState } from 'react'
import { AlertColor } from '@mui/material'
import { Snackbar } from '../types/common'

export const SnackbarContext = createContext<Snackbar | null>(null)

export function useSnackbarContext() {
	const [snackbarText, setSnackbarText] = useState<string | null>(null)
	const [severity, setSeverity] = useState<AlertColor>('info')
	const showSnackbar = (text: string, alertColor: AlertColor = 'info') => {
		setSnackbarText(text)
		setSeverity(alertColor)
	}
	const hideSnackbar = () => {
		setSnackbarText(null)
		setSeverity('info')
	}

	return { snackbarText, severity, showSnackbar, hideSnackbar }
}
