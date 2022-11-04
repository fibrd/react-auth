import React from 'react'
import { Box, Link, Typography } from '@mui/material'
import { AppPageWrapper } from '../components/common/AppPageWrapper'
import { useDialog } from '../hooks/useDialog'
import { DialogType } from '../types/common'

export function Home() {
	const { showDialog } = useDialog()
	return (
		<AppPageWrapper>
			<Box sx={{ padding: '20px' }}>
				<img
					src="https://media.api-sports.io/football/leagues/1.png"
					alt="FIFA WORLD CUP 2022"
				/>
			</Box>
			<Typography variant="h4" gutterBottom>
				Tipovací soutěž
			</Typography>
			<Typography sx={{ textAlign: 'center', padding: '10px' }} variant="h6">
				Pro více podrobností k soutěži se prosím{' '}
				<Link
					sx={{ cursor: 'pointer', textDecoration: 'none' }}
					onClick={() => showDialog(DialogType.LOGIN)}
				>
					přihlašte
				</Link>
				, případně si{' '}
				<Link
					sx={{ cursor: 'pointer', textDecoration: 'none' }}
					onClick={() => showDialog(DialogType.REGISTRATION)}
				>
					zaregistrujte
				</Link>{' '}
				nový účet.
			</Typography>
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
