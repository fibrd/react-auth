import React from 'react'
import { RegisterationForm } from './RegisterationForm'
import { DialogType } from './types/common'
import SnackbarContext from './context/SnackbarContext'
import { AppSnackbar } from './AppSnackbar'
import { useSnackbar } from './hooks/useSnackbar'
import { AppMenu } from './AppMenu'
import { LoginForm } from './LoginForm'
import { useAuth } from './hooks/useAuth'
import AuthContext from './context/AuthContext'
import { useDialog } from './hooks/useDialog'
import DialogContext from './context/DialogContext'

function App() {
	const auth = useAuth()
	const snackbar = useSnackbar()
	const dialog = useDialog()

	return (
		<AuthContext.Provider value={auth}>
			<SnackbarContext.Provider value={snackbar}>
				<DialogContext.Provider value={dialog}>
					<div className="app">
						<header className="app-header">
							<AppMenu />
							<ul>
								<li onClick={() => dialog.showDialog(DialogType.REGISTRATION)}>
									REGISTRACE
								</li>
								<li onClick={() => dialog.showDialog(DialogType.LOGIN)}>
									LOGIN
								</li>
							</ul>
							{dialog.dialogType === DialogType.REGISTRATION && (
								<RegisterationForm />
							)}
							{dialog.dialogType === DialogType.LOGIN && <LoginForm />}
						</header>
						<AppSnackbar />
					</div>
				</DialogContext.Provider>
			</SnackbarContext.Provider>
		</AuthContext.Provider>
	)
}

export default App
