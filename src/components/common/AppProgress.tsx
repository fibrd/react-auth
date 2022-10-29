import React from 'react'
import { LinearProgress } from '@mui/material'

interface AppProgressProps {
	enabled: boolean
}

export function AppProgress({ enabled }: AppProgressProps) {
	if (!enabled) {
		return null
	}

	return (
		<LinearProgress
			sx={{ position: 'fixed', top: 0, left: 0, width: '100%' }}
		/>
	)
}
