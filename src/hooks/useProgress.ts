import { useContext } from 'react'
import { ProgressContext } from '../context/progressContext'

export function useProgress() {
	const progress = useContext(ProgressContext)
	if (progress === null) {
		throw new Error('ProgressContext nebyl inicializován.')
	}
	return progress
}
