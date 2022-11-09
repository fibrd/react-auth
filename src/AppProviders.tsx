import React, { PropsWithChildren } from 'react'
import { QueryCache, QueryClient, QueryClientProvider } from 'react-query'
import { AuthContext, useAuthContext } from './context/authContext'
import { SnackbarContext, useSnackbarContext } from './context/snackbarContext'
import { DialogContext, useDialogContext } from './context/dialogContext'
import { AxiosError } from 'axios'
import { AuthApi } from './api/AuthApi'

export function AppProviders({ children }: PropsWithChildren) {
	// Create a client provider
	const queryClient = new QueryClient({
		defaultOptions: {
			queries: { retry: 1, refetchOnWindowFocus: false },
		},
		// queryCache: new QueryCache({
		// 	onError: async error => {
		// 		const err = error as AxiosError
		// 		if (err.response?.status === 403) {
		// 			try {
		// 				await AuthApi.logout()
		// 				localStorage.removeItem('user')
		// 				window.location.href = '/'
		// 			} catch (error) {
		// 				console.error(error)
		// 			}
		// 		}
		// 	},
		// }),
	})

	// Context
	const auth = useAuthContext()
	const snackbar = useSnackbarContext()
	const dialog = useDialogContext()

	return (
		<QueryClientProvider client={queryClient}>
			<AuthContext.Provider value={auth}>
				<SnackbarContext.Provider value={snackbar}>
					<DialogContext.Provider value={dialog}>
						{children}
					</DialogContext.Provider>
				</SnackbarContext.Provider>
			</AuthContext.Provider>
		</QueryClientProvider>
	)
}
