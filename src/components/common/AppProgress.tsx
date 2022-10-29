import React from 'react'
import { LinearProgress } from '@mui/material'
import { useIsFetching, useIsMutating } from 'react-query'

export function AppProgress() {
	const isFeching = useIsFetching()
	const isMutating = useIsMutating()

	if (!isFeching && !isMutating) {
		return null
	}

	return (
		<LinearProgress
			sx={{ position: 'fixed', top: 0, left: 0, width: '100%' }}
		/>
	)
}
