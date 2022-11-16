import React from 'react'
import { Route, Routes, Navigate, Outlet } from 'react-router-dom'
import { Home } from './pages/Home'
import { useStartApp } from './hooks/useStartApp'
import { PasswordReset } from './pages/PasswordReset'
import { Groups } from './pages/Groups'
import { useYupLocale } from './hooks/useYupLocale'
import { useAuth } from './hooks/useAuth'
import { Schedule } from './pages/Schedule'
import { Table } from './pages/Table'
import { AdminTable } from './pages/AdminTable'
import { Playoff } from './pages/Playoff'

export function AppRouter() {
	useYupLocale()
	useStartApp()

	return (
		<Routes>
			<Route element={<RequireAdmin />}>
				<Route path="/admin" element={<AdminTable />} />
				<Route path="/playoff" element={<Playoff />} />
			</Route>
			<Route element={<RequireAuth />}>
				<Route path="/tipy" element={<Schedule />} />
				<Route path="/tabulka" element={<Table />} />
				<Route path="/skupiny" element={<Groups />} />
			</Route>
			<Route path="/" element={<Home />} />
			<Route path="/reset/:id/:token" element={<PasswordReset />} />
			<Route path="*" element={<Navigate to="/" />} />
		</Routes>
	)
}

function RequireAuth() {
	const { user, isInitialized } = useAuth()

	if (!isInitialized) {
		return null
	}
	if (!user) {
		return <Navigate to="/" />
	}
	return <Outlet />
}

function RequireAdmin() {
	const { user, isInitialized } = useAuth()

	if (!isInitialized) {
		return null
	}
	if (user?.role !== 'admin') {
		return <Navigate to="/" />
	}
	return <Outlet />
}
