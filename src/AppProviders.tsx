import React from 'react'
import { QueryClient, QueryClientProvider } from 'react-query'
import { App } from './App'
import { AuthContext, useAuthContext } from './context/authContext'
import { SnackbarContext, useSnackbarContext } from './context/snackbarContext'
import { DialogContext, useDialogContext } from './context/dialogContext'

export function AppProviders() {
	// Create a client provider
	const queryClient = new QueryClient()

	// Context
	const auth = useAuthContext()
	const snackbar = useSnackbarContext()
	const dialog = useDialogContext()

	return (
		<QueryClientProvider client={queryClient}>
			<AuthContext.Provider value={auth}>
				<SnackbarContext.Provider value={snackbar}>
					<DialogContext.Provider value={dialog}>
						<App />
					</DialogContext.Provider>
				</SnackbarContext.Provider>
			</AuthContext.Provider>
		</QueryClientProvider>
	)
}
