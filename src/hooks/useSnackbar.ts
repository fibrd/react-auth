import { useState } from 'react'
import { AlertColor } from '@mui/material'

export function useSnackbar() {
	const [snackbarText, setSnackbarText] = useState<string | null>(null)
	const [severity, setSeverity] = useState<AlertColor>('info')
	const showSnackbar = (text: string, alertColor: AlertColor = 'info') => {
		setSnackbarText(text)
		setSeverity(alertColor)
	}
	const hideSnackbar = () => setSnackbarText(null)

	return { snackbarText, severity, showSnackbar, hideSnackbar }
}
