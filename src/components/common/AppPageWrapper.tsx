import React, { PropsWithChildren } from 'react'
import { Box } from '@mui/material'

export function AppPageWrapper({ children }: PropsWithChildren) {
	return (
		<Box
			sx={{
				width: '100%',
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
				paddingTop: { xs: 0, md: '1rem' },
				paddingBottom: '2rem',
			}}
		>
			{children}
		</Box>
	)
}
