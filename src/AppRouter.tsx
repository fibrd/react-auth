import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { Home } from './Home'
import { useStartApp } from './hooks/useStartApp'
import { PasswordReset } from './PasswordReset'

export function AppRouter() {
	useStartApp()

	return (
		<Routes>
			<Route path="/" element={<Home />} />
			<Route path="/reset-password/:id/:token" element={<PasswordReset />} />
		</Routes>
	)
}
