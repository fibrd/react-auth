import React from 'react'
import { Route, Routes, BrowserRouter } from 'react-router-dom'
import { Home } from './Home'
import { useStartApp } from './hooks/useStartApp'

export function AppRouter() {
	useStartApp()

	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Home />} />
			</Routes>
		</BrowserRouter>
	)
}
