import React, { useState } from 'react'
import { useQuery } from 'react-query'
import { LoraApi } from './api/LoraApi'
import { RegisterationForm } from './RegisterationForm'
import { Section } from './types/common'

function App() {
	useQuery(['/api/courses'], LoraApi.getCourses, {
		onSuccess: ({ courses }) => console.log(courses),
	})

	const [section, setSection] = useState(Section.REGISTRATION)

	return (
		<div className="app">
			<header className="app-header">
				<ul>
					<li onClick={() => setSection(Section.REGISTRATION)}>REGISTRACE</li>
					<li onClick={() => setSection(Section.LOGIN)}>LOGIN</li>
				</ul>
				<h1>{section}</h1>
				{section === Section.REGISTRATION && <RegisterationForm />}
			</header>
		</div>
	)
}

export default App
