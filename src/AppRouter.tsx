import React from 'react'
import { Route, Routes, BrowserRouter } from 'react-router-dom'
import { Home } from './Home'
import { useStartApp } from './hooks/useStartApp'
import { PasswordReset } from './PasswordReset'

export function AppRouter() {
	useStartApp()

	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/reset-password/:id/:token" element={<PasswordReset />} />
			</Routes>
		</BrowserRouter>
	)
}
