import React, { useEffect, useState } from 'react'
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
import { TipsApi } from '../api/TipsApi'

type ScoreTip = Pick<Tip, 'home' | 'away'>
type ScoreResult = Pick<Result, 'home' | 'away'>

interface MatchRowProps {
	teams: Teams
	fixture: Fixture
	tip?: Tip
	result?: Result
}

export function MatchRow({ teams, fixture, tip, result }: MatchRowProps) {
	const { user } = useAuth()
	const userId = user?.userId ?? ''

	const [scoreResult, setScoreResult] = useState<ScoreResult | null>(null)
	const [scoreTip, setScoreTip] = useState<ScoreTip | null>(null)

	useEffect(() => {
		if (tip) {
			const { home, away } = tip
			setScoreTip({ home, away })
		}
	}, [tip])

	useEffect(() => {
		if (result) {
			const { home, away } = result
			setScoreResult({ home, away })
		}
	}, [result])

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

	function handleSubmitTip(scoreSubmitted: ScoreTip) {
		setScoreTip(scoreSubmitted)
		upsertTip(scoreSubmitted)
	}

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
			{/* Tip */}
			<ScoreSelect
				buttonLabel={
					scoreTip ? `${scoreTip.home}:${scoreTip.away}` : 'Zadat tip'
				}
				homeLabel={teams.home.name}
				awayLabel={teams.away.name}
				homeValue={scoreTip?.home ?? 0}
				awayValue={scoreTip?.away ?? 0}
				onSubmitTip={handleSubmitTip}
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
					<Typography>{`${scoreResult.home}:${scoreResult.away}`}</Typography>
				)
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
