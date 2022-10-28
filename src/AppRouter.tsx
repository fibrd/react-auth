import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { Home } from './pages/Home'
import { useStartApp } from './hooks/useStartApp'
import { PasswordReset } from './pages/PasswordReset'

export function AppRouter() {
	useStartApp()

	return (
		<Routes>
			<Route path="/" element={<Home />} />
			<Route path="/reset/:id/:token" element={<PasswordReset />} />
		</Routes>
	)
}
