import React from 'react'
import { Link, Typography } from '@mui/material'
import { AppPageWrapper } from '../components/common/AppPageWrapper'

export function Home() {
	return (
		<AppPageWrapper>
			<img
				src="https://media.api-sports.io/football/leagues/1.png"
				alt="FIFA WORLD CUP 2022"
			/>
			<Typography variant="h4" gutterBottom>
				<Link
					href="https://www.fifa.com/fifaplus/en/tournaments/mens/worldcup/qatar2022"
					target="_blank"
				>
					FIFA WORLD CUP 2022
				</Link>
			</Typography>
		</AppPageWrapper>
	)
}
