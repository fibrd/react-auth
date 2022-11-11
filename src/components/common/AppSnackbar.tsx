import React from 'react'
import { Alert, Snackbar } from '@mui/material'
import { useSnackbar } from '../../hooks/useSnackbar'

export function AppSnackbar() {
	const { snackbarText, severity, hideSnackbar } = useSnackbar()
	return (
		<Snackbar
			open={snackbarText !== null}
			autoHideDuration={4000}
			anchorOrigin={{ horizontal: 'center', vertical: 'bottom' }}
			onClose={(_e, reason) => {
				if (reason !== 'clickaway') {
					hideSnackbar()
				}
			}}
			className="app__snackbar"
		>
			<Alert
				onClose={hideSnackbar}
				variant="filled"
				severity={severity}
				sx={{ width: '100%' }}
			>
				{snackbarText}
			</Alert>
		</Snackbar>
	)
}
