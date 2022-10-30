import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { AppDialog } from './components/common/AppDialog'
import { AppProviders } from './AppProviders'
import { AppRouter } from './AppRouter'
import { AppSnackbar } from './components/common/AppSnackbar'
import { AppProgress } from './components/common/AppProgress'
import { AppMenu } from './components/AppMenu'

export function App() {
	return (
		<AppProviders>
			<BrowserRouter>
				<AppMenu />
				<AppRouter />
				<AppDialog />
				<AppSnackbar />
				<AppProgress />
			</BrowserRouter>
		</AppProviders>
	)
}
