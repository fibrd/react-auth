import React, { useEffect, useState } from 'react'
import { ListItem, Box, Avatar, ListItemText, Typography } from '@mui/material'
import { TipSelect } from './TipSelect'
import { Fixture, Teams } from '../types/fixtures'
import { useMutation } from 'react-query'
import { ResultsApi } from '../api/ResultsApi'
import { AxiosError } from 'axios'
import { useSnackbar } from '../hooks/useSnackbar'
import { Result } from '../types/results'
import { useAuth } from '../hooks/useAuth'

type Score = Pick<Result, 'home' | 'away'>

interface ResultsRowProps {
	teams: Teams
	fixture: Fixture
	result?: Result
}

export function ResultsRow({ teams, fixture, result }: ResultsRowProps) {
	const { user } = useAuth()
	const [score, setScore] = useState<Score | null>(null)

	useEffect(() => {
		if (result) {
			const { home, away } = result
			setScore({ home, away })
		}
	}, [result])

	const { showSnackbar } = useSnackbar()

	const { mutate: upsertResult } = useMutation(
		(score: Score) =>
			ResultsApi.upsertResult({
				fixtureId: fixture.id,
				...score,
			}),
		{
			onSuccess: () => showSnackbar('Výsledek byl uložen.', 'success'),
			onError: (err: AxiosError<{ message: string }>) => {
				const message = err.response?.data.message
				showSnackbar(message || 'Při ukládání došlo k neznámé chybě.', 'error')
			},
		}
	)

	const { mutate: deleteResult } = useMutation(
		(_id: string) => ResultsApi.deleteResult(_id),
		{
			onSuccess: () => showSnackbar('Výsledek byl vymazán.', 'info'),
			onError: (err: AxiosError<{ message: string }>) => {
				const message = err.response?.data.message
				showSnackbar(message || 'Došlo k neznámé chybě.', 'error')
			},
		}
	)

	function handleSubmit(scoreSubmitted: Score, toDelete?: boolean) {
		if (toDelete) {
			result && deleteResult(result._id)
			setScore(null)
		} else {
			setScore(scoreSubmitted)
			upsertResult(scoreSubmitted)
		}
	}

	return (
		<ListItem sx={{ flexDirection: 'column' }}>
			{user?.role === 'admin' ? (
				<TipSelect
					buttonLabel={score ? `${score.home}:${score.away}` : 'Zadat výsledek'}
					homeLabel={teams.home.name}
					awayLabel={teams.away.name}
					homeValue={score?.home ?? 0}
					awayValue={score?.away ?? 0}
					onSubmit={handleSubmit}
					results={true}
				/>
			) : (
				score && <Typography>{`${score.home}:${score.away}`}</Typography>
			)}

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
