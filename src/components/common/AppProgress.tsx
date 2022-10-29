import React from 'react'
import { LinearProgress } from '@mui/material'
import { useProgress } from '../../hooks/useProgress'

export function AppProgress() {
	const { isEnabled } = useProgress()

	if (!isEnabled) {
		return null
	}

	return (
		<LinearProgress
			sx={{ position: 'fixed', top: 0, left: 0, width: '100%' }}
		/>
	)
}
