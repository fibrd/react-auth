import React from 'react'
import { Route, Routes, Navigate } from 'react-router-dom'
import { Home } from './pages/Home'
import { useStartApp } from './hooks/useStartApp'
import { PasswordReset } from './pages/PasswordReset'
import { MyTips } from './pages/MyTips'
import { Groups } from './pages/Groups'
import { Results } from './pages/Results'
import { useYupLocale } from './hooks/useYupLocale'
import { useAuth } from './hooks/useAuth'
import { Schedule } from './pages/Schedule'
import { TipTable } from './pages/TipTable'

export function AppRouter() {
	useYupLocale()
	useStartApp()

	const { user } = useAuth()

	return (
		<Routes>
			<Route path="/" element={<Home />} />
			{user && (
				<>
					<Route path="/program" element={<Schedule />} />
					<Route path="/moje-tipy" element={<MyTips />} />
					<Route path="/tabulka" element={<TipTable />} />
					<Route path="/skupiny" element={<Groups />} />
					<Route path="/vysledky" element={<Results />} />
				</>
			)}
			<Route path="/reset/:id/:token" element={<PasswordReset />} />
			<Route path="*" element={<Navigate to="/" />} />
		</Routes>
	)
}
