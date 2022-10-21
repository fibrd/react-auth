import React from 'react'
import { useQuery } from 'react-query'
import { LoraApi } from './api/LoraApi'

function App() {
	const { refetch } = useQuery(['/api/courses'], LoraApi.getCourses, {
		onSuccess: ({ courses }) => console.log(courses),
	})

	return (
		<div className="app">
			<header className="app-header">
				<button type="button" onClick={() => refetch()}>
					Odeslat
				</button>
			</header>
		</div>
	)
}

export default App
