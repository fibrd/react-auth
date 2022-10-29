import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { AppDialog } from './components/common/AppDialog'
import { AppProviders } from './AppProviders'
import { AppRouter } from './AppRouter'
import { AppSnackbar } from './components/common/AppSnackbar'
import { AppProgress } from './components/common/AppProgress'

export function App() {
	return (
		<AppProviders>
			<BrowserRouter>
				<AppRouter />
				<AppDialog />
				<AppSnackbar />
				<AppProgress />
			</BrowserRouter>
		</AppProviders>
	)
}
