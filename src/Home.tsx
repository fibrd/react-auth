import React from 'react'
import { AppSnackbar } from './AppSnackbar'
import { AppMenu } from './AppMenu'
import { AppDialog } from './AppDialog'

export function Home() {
	return (
		<div className="home">
			<AppMenu />
			<AppDialog />
			<AppSnackbar />
		</div>
	)
}
