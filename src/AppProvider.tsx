import React from 'react'
import SnackbarContext from './context/SnackbarContext'
import { useSnackbar } from './hooks/useSnackbar'
import { useAuth } from './hooks/useAuth'
import AuthContext from './context/AuthContext'
import { useDialog } from './hooks/useDialog'
import DialogContext from './context/DialogContext'
import { QueryClient, QueryClientProvider } from 'react-query'
import App from './App'

export function AppProvider() {
	// Create a client provider
	const queryClient = new QueryClient()

	// Context
	const auth = useAuth()
	const snackbar = useSnackbar()
	const dialog = useDialog()

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
