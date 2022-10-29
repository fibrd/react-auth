import { createContext, useState } from 'react'
import { Progress } from '../types/common'

export const ProgressContext = createContext<Progress | null>(null)

export function useProgressContext() {
	const [progressCountEnabled, setProgressCountEnabled] = useState(0)
	const addProgress = () => setProgressCountEnabled(prev => prev + 1)
	const removeProgress = () =>
		setProgressCountEnabled(prev => (prev === 0 ? prev : prev - 1))

	return { isEnabled: progressCountEnabled > 0, addProgress, removeProgress }
}
