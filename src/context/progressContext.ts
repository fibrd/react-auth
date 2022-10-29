import { createContext, useState } from 'react'
import { Progress } from '../types/common'

export const ProgressContext = createContext<Progress | null>(null)

export function useProgressContext() {
	const [isEnabled, setIsEnabled] = useState(false)
	const showProgress = () => setIsEnabled(true)
	const hideProgress = () => setIsEnabled(false)

	return { isEnabled, showProgress, hideProgress }
}
