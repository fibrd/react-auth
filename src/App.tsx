import React, { useState } from 'react'
import { RegisterationForm } from './RegisterationForm'
import { Section } from './types/common'
import SnackbarContext from './context/SnackbarContext'
import { AppSnackbar } from './AppSnackbar'
import { useSnackbar } from './hooks/useSnackbar'

function App() {
	const snackbar = useSnackbar()

	const [section, setSection] = useState(Section.REGISTRATION)

	return (
		<SnackbarContext.Provider value={snackbar}>
			<div className="app">
				<header className="app-header">
					<ul>
						<li onClick={() => setSection(Section.REGISTRATION)}>REGISTRACE</li>
						<li onClick={() => setSection(Section.LOGIN)}>LOGIN</li>
					</ul>
					<h1>{section}</h1>
					{section === Section.REGISTRATION && <RegisterationForm />}
				</header>
				<AppSnackbar />
			</div>
		</SnackbarContext.Provider>
	)
}

export default App
