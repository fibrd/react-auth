import React from 'react'
import { AppDialog } from './AppDialog'
import { AppProviders } from './AppProviders'
import { AppRouter } from './AppRouter'
import { AppSnackbar } from './AppSnackbar'

export function App() {
	return (
		<AppProviders>
			<AppRouter />
			<AppDialog />
			<AppSnackbar />
		</AppProviders>
	)
}
