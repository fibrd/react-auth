import React, { useEffect, useMemo, useState } from 'react'
import { ListItem, Box, Avatar, ListItemText, Typography } from '@mui/material'
import { ScoreSelect } from './ScoreSelect'
import { Fixture, Teams } from '../types/fixtures'
import { useMutation } from 'react-query'
import { ResultsApi } from '../api/ResultsApi'
import { AxiosError } from 'axios'
import { useSnackbar } from '../hooks/useSnackbar'
import { Result } from '../types/results'
import { useAuth } from '../hooks/useAuth'
import { Tip } from '../types/tips'
import { getTipResultPoints } from '../utils/tipUtils'

type ScoreResult = Pick<Result, 'home' | 'away'>

interface MatchRowProps {
	teams: Teams
	fixture: Fixture
	tip?: Tip
	result?: Result
	onSubmitTip?: (score: Pick<Tip, 'home' | 'away'>) => void
}

export function MatchRow({
	teams,
	fixture,
	tip,
	result,
	onSubmitTip,
}: MatchRowProps) {
	const { user } = useAuth()

	const [scoreResult, setScoreResult] = useState<ScoreResult | null>(null)

	const points = useMemo(
		() => tip && scoreResult && getTipResultPoints(tip, scoreResult),
		[tip, scoreResult]
	)

	useEffect(() => {
		if (result) {
			const { home, away } = result
			setScoreResult({ home, away })
		}
	}, [result])

	const { showSnackbar } = useSnackbar()

	const { mutate: upsertResult } = useMutation(
		(score: ScoreResult) =>
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

	function handleSubmitResult(scoreSubmitted: ScoreResult, toDelete?: boolean) {
		if (toDelete) {
			result && deleteResult(result._id)
			setScoreResult(null)
		} else {
			setScoreResult(scoreSubmitted)
			upsertResult(scoreSubmitted)
		}
	}

	return (
		<ListItem sx={{ flexDirection: 'column' }}>
			<Box
				sx={{
					display: 'flex',
					gap: '5px',
					marginBottom: '5px',
					alignItems: 'center',
				}}
			>
				{/* Tip */}
				<ScoreSelect
					buttonLabel={tip ? `${tip.home}:${tip.away}` : 'Zadat tip'}
					homeLabel={teams.home.name}
					awayLabel={teams.away.name}
					homeValue={tip?.home ?? 0}
					awayValue={tip?.away ?? 0}
					onSubmitTip={onSubmitTip}
				/>

				{/* Vysledek */}
				{user?.role === 'admin' ? (
					<ScoreSelect
						buttonLabel={
							scoreResult
								? `${scoreResult.home}:${scoreResult.away}`
								: 'Zadat výsledek'
						}
						homeLabel={teams.home.name}
						awayLabel={teams.away.name}
						homeValue={scoreResult?.home ?? 0}
						awayValue={scoreResult?.away ?? 0}
						onSubmitResult={handleSubmitResult}
						results={true}
					/>
				) : (
					scoreResult && (
						<Typography>
							<b>{`${scoreResult.home}:${scoreResult.away} `}</b>
							{`(${points} b.)`}
						</Typography>
					)
				)}
			</Box>

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
