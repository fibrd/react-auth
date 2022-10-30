import React from 'react'
import { Route, Routes, Navigate } from 'react-router-dom'
import { Home } from './pages/Home'
import { useStartApp } from './hooks/useStartApp'
import { PasswordReset } from './pages/PasswordReset'
import { MyTips } from './pages/MyTips'
import { Table } from './pages/Table'
import { Results } from './pages/Results'
import { useYupLocale } from './hooks/useYupLocale'
import { useAuth } from './hooks/useAuth'

export function AppRouter() {
	useYupLocale()
	useStartApp()

	const { user } = useAuth()

	return (
		<Routes>
			<Route path="/" element={<Home />} />
			{user && (
				<>
					<Route path="/moje-tipy" element={<MyTips />} />
					<Route path="/tabulka" element={<Table />} />
					<Route path="/vysledky" element={<Results />} />
				</>
			)}
			<Route path="/reset/:id/:token" element={<PasswordReset />} />
			<Route path="*" element={<Navigate to="/" />} />
		</Routes>
	)
}
