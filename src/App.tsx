import React from 'react'
import { AppSnackbar } from './AppSnackbar'
import { AppMenu } from './AppMenu'
import { AppDialog } from './AppDialog'

export function App() {
	return (
		<div className="app">
			<header className="app-header">
				<AppMenu />
				<AppDialog />
			</header>
			<AppSnackbar />
		</div>
	)
}
