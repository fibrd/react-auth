import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.scss'
import { AppProviders } from './AppProviders'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
	<React.StrictMode>
		<AppProviders />
	</React.StrictMode>
)
