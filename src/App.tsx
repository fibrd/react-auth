import React, { useState } from 'react'
import { RegisterationForm } from './RegisterationForm'
import { Section } from './types/common'
import SnackbarContext from './context/SnackbarContext'
import { AppSnackbar } from './AppSnackbar'
import { useSnackbar } from './hooks/useSnackbar'
import { AppMenu } from './AppMenu'
import { LoginForm } from './LoginForm'
import { useAuth } from './hooks/useAuth'
import AuthContext from './context/AuthContext'

function App() {
	const auth = useAuth()
	const snackbar = useSnackbar()

	const [section, setSection] = useState(Section.REGISTRATION)

	return (
		<AuthContext.Provider value={auth}>
			<SnackbarContext.Provider value={snackbar}>
				<div className="app">
					<header className="app-header">
						<AppMenu />
						<ul>
							<li onClick={() => setSection(Section.REGISTRATION)}>
								REGISTRACE
							</li>
							<li onClick={() => setSection(Section.LOGIN)}>LOGIN</li>
						</ul>
						<h1>{section}</h1>
						{section === Section.REGISTRATION && <RegisterationForm />}
						{section === Section.LOGIN && <LoginForm />}
					</header>
					<AppSnackbar />
				</div>
			</SnackbarContext.Provider>
		</AuthContext.Provider>
	)
}

export default App
