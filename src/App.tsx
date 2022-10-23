import React from 'react'
import { AppSnackbar } from './AppSnackbar'
import { AppMenu } from './AppMenu'
import { AppDialog } from './AppDialog'
import { useStartApp } from './hooks/useStartApp'

export function App() {
	useStartApp()

	return (
		<div className="app">
			<header className="app-header">
				<AppMenu />
			</header>
			<AppDialog />
			<AppSnackbar />
		</div>
	)
}
