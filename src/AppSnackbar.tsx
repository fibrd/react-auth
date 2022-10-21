import React, { useContext } from 'react'
import { Alert, Snackbar } from '@mui/material'
import SnackbarContext from './context/SnackbarContext'

export function AppSnackbar() {
	const { snackbarText, severity, hideSnackbar } = useContext(SnackbarContext)
	return (
		<Snackbar
			open={!!snackbarText}
			autoHideDuration={6000}
			anchorOrigin={{ horizontal: 'center', vertical: 'bottom' }}
			onClose={(_e, reason) => {
				if (reason !== 'clickaway') {
					hideSnackbar()
				}
			}}
		>
			<Alert onClose={hideSnackbar} severity={severity} sx={{ width: '100%' }}>
				{snackbarText}
			</Alert>
		</Snackbar>
	)
}
