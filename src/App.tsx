import React from 'react'
import { AppSnackbar } from './AppSnackbar'
import { AppMenu } from './AppMenu'
import { AppDialog } from './AppDialog'
import { useStartApp } from './hooks/useStartApp'

export function App() {
	useStartApp()

	return (
		<div className="app">
			<AppMenu />
			<AppDialog />
			<AppSnackbar />
		</div>
	)
}
