import React from 'react'
import { Box, Link, Typography } from '@mui/material'
import { AppPageWrapper } from '../components/common/AppPageWrapper'
import { useAuth } from '../hooks/useAuth'
import { Rules } from '../components/Rules'
import { AnonymousInfo } from '../components/AnonymousInfo'

export function Home() {
	const { user } = useAuth()

	return (
		<AppPageWrapper>
			<Box sx={{ padding: '20px' }}>
				<img
					src="https://media.api-sports.io/football/leagues/1.png"
					alt="FIFA WORLD CUP 2022"
				/>
			</Box>
			<Typography variant="h4" gutterBottom>
				{user ? 'Pravidla' : 'Tipovačka'}
			</Typography>
			{user ? <Rules /> : <AnonymousInfo />}
			<Typography sx={{ textAlign: 'center', padding: '10px' }}>
				Oficiální stránky mistrovství naleznete{' '}
				<Link
					sx={{ cursor: 'pointer', textDecoration: 'none' }}
					href="https://www.fifa.com/fifaplus/en/tournaments/mens/worldcup/qatar2022"
					target="_blank"
				>
					zde
				</Link>
				.
			</Typography>
		</AppPageWrapper>
	)
}
