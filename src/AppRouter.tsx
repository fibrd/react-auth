import React from 'react'
import { Route, Routes, Navigate } from 'react-router-dom'
import { Home } from './pages/Home'
import { useStartApp } from './hooks/useStartApp'
import { PasswordReset } from './pages/PasswordReset'
import { Groups } from './pages/Groups'
import { useYupLocale } from './hooks/useYupLocale'
import { useAuth } from './hooks/useAuth'
import { Schedule } from './pages/Schedule'
import { Table } from './pages/Table'
import { AdminTable } from './pages/AdminTable'

export function AppRouter() {
	useYupLocale()
	useStartApp()

	const { user } = useAuth()

	return (
		<Routes>
			{user?.role === 'admin' && (
				<Route path="/admin" element={<AdminTable />} />
			)}
			{user && (
				<>
					<Route path="/tipy" element={<Schedule />} />
					<Route path="/tabulka" element={<Table />} />
					<Route path="/skupiny" element={<Groups />} />
				</>
			)}
			<Route path="/" element={<Home />} />
			<Route path="/reset/:id/:token" element={<PasswordReset />} />
			<Route path="*" element={<Navigate to="/" />} />
		</Routes>
	)
}
