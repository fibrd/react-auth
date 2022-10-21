import React from 'react'
import { useQuery } from 'react-query'
import { LoraApi } from './api/LoraApi'
import { RegisterationForm } from './RegisterationForm'

function App() {
	useQuery(['/api/courses'], LoraApi.getCourses, {
		onSuccess: ({ courses }) => console.log(courses),
	})

	return (
		<div className="app">
			<header className="app-header">
				<RegisterationForm />
			</header>
		</div>
	)
}

export default App
