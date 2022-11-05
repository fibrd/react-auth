import React, { useEffect, useState } from 'react'
import { ListItem, Box, Avatar, ListItemText } from '@mui/material'
import { TipSelect } from './TipSelect'
import { Fixture, Teams } from '../types/fixtures'
import { Tip } from '../types/tips'
import { useMutation } from 'react-query'
import { TipsApi } from '../api/TipsApi'
import { AxiosError } from 'axios'
import { useSnackbar } from '../hooks/useSnackbar'
import { useAuth } from '../hooks/useAuth'

type ScoreTip = Pick<Tip, 'home' | 'away'>

interface MyTipsRowProps {
	teams: Teams
	fixture: Fixture
	tip?: Tip
}

export function MyTipsRow({ teams, fixture, tip }: MyTipsRowProps) {
	const [scoreTip, setScoreTip] = useState<ScoreTip | null>(null)
	const { user } = useAuth()
	const userId = user?.userId ?? ''

	useEffect(() => {
		if (tip) {
			const { home, away } = tip
			setScoreTip({ home, away })
		}
	}, [tip])

	const { showSnackbar } = useSnackbar()

	const { mutate: upsertTip } = useMutation(
		(score: ScoreTip) =>
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

	function handleSubmit(scoreSubmitted: ScoreTip) {
		setScoreTip(scoreSubmitted)
		upsertTip(scoreSubmitted)
	}

	return (
		<ListItem sx={{ flexDirection: 'column' }}>
			<TipSelect
				buttonLabel={
					scoreTip ? `${scoreTip.home}:${scoreTip.away}` : 'Zadat tip'
				}
				homeLabel={teams.home.name}
				awayLabel={teams.away.name}
				homeValue={scoreTip?.home ?? 0}
				awayValue={scoreTip?.away ?? 0}
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
