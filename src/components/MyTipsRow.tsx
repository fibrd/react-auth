import React, { useEffect, useState } from 'react'
import { ListItem, Box, Avatar, ListItemText } from '@mui/material'
import { TipSelect } from './TipSelect'
import { Fixture, Teams } from '../types/fixtures'
import { Score, Tip } from '../types/tips'
import { useMutation } from 'react-query'
import { TipsApi } from '../api/TipsApi'
import { AxiosError } from 'axios'
import { useSnackbar } from '../hooks/useSnackbar'
import { useAuth } from '../hooks/useAuth'

interface MyTipsRowProps {
	teams: Teams
	fixture: Fixture
	tip?: Tip
}

export function MyTipsRow({ teams, fixture, tip }: MyTipsRowProps) {
	const [score, setScore] = useState<Score | null>(null)
	const { user } = useAuth()
	const userId = user?.userId ?? ''

	useEffect(() => {
		if (tip) {
			const { home, away } = tip
			setScore({ home, away })
		}
	}, [tip])

	const { showSnackbar } = useSnackbar()

	const { mutate: upsertTip } = useMutation(
		(score: Score) =>
			TipsApi.upsertTip({
				userId,
				fixtureId: fixture.id,
				...score,
			}),
		{
			onError: (err: AxiosError<{ message: string }>) => {
				const message = err.response?.data.message
				if (message) {
					showSnackbar(message, 'error')
				}
			},
		}
	)

	function handleSubmit(scoreSubmitted: Score) {
		setScore(scoreSubmitted)
		upsertTip(scoreSubmitted)
	}

	return (
		<ListItem sx={{ flexDirection: 'column' }}>
			<TipSelect
				buttonLabel={score ? `${score.home}:${score.away}` : 'Zadat tip'}
				homeLabel={teams.home.name}
				awayLabel={teams.away.name}
				homeValue={score?.home ?? 0}
				awayValue={score?.away ?? 0}
				onSubmit={handleSubmit}
			/>
			<Box sx={{ display: 'flex', gap: '20px' }}>
				<Avatar src={teams.home.logo} />
				<ListItemText
					primary={`${teams.home.name} vs. ${teams.away.name}`}
					secondary={new Date(fixture.timestamp * 1000).toLocaleString([], {
						year: 'numeric',
						month: 'numeric',
						day: 'numeric',
						hour: '2-digit',
						minute: '2-digit',
					})}
					sx={{ textAlign: 'center' }}
				/>
				<Avatar src={teams.away.logo} />
			</Box>
		</ListItem>
	)
}
