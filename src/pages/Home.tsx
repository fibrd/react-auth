import { Typography } from '@mui/material'
import React from 'react'
import { AppPageWrapper } from '../components/common/AppPageWrapper'

export function Home() {
	return (
		<AppPageWrapper>
			<Typography variant="h4" gutterBottom>
				Homepage
			</Typography>
		</AppPageWrapper>
	)
}
