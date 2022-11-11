import React, { Fragment, useState } from 'react'
import fixtures from '../data/fixtures.json'
import { Divider, List } from '@mui/material'
import { AppPageWrapper } from '../components/common/AppPageWrapper'
import { MatchRow } from '../components/MatchRow'
import { useMutation, useQuery } from 'react-query'
import { ResultsApi } from '../api/ResultsApi'
import { Result, UpsertResultBody } from '../types/results'
import { TipsApi } from '../api/TipsApi'
import { useAuth } from '../hooks/useAuth'
import { Tip, UpsertTipBody } from '../types/tips'
import { AxiosError } from 'axios'
import { useSnackbar } from '../hooks/useSnackbar'
import { isBettingDisabled } from '../utils/fixtureUtils'

type ScoreResult = Pick<Result, 'home' | 'away'>

export function Schedule() {
	const { showSnackbar } = useSnackbar()
	const { user } = useAuth()
	const userId = user?.userId ?? ''
	const [tips, setTips] = useState<Tip[]>()
	const [results, setResults] = useState<Result[]>([])

	const { refetch: refetchTips } = useQuery(
		['api/tips/:userId'],
		() => TipsApi.getTipsByUserId(user?.userId ?? ''),
		{
			enabled: user !== null,
			onSuccess: ({ data }) => setTips(data.tips),
		}
	)

	const { refetch: refetchResults } = useQuery(
		['api/results'],
		ResultsApi.getResults,
		{
			onSuccess: ({ data }) => setResults(data.results),
		}
	)

	const { mutate: upsertTip } = useMutation(
		(body: UpsertTipBody) => TipsApi.upsertTip(body),
		{
			onSuccess() {
				refetchTips()
				showSnackbar('Tip byl aktualizován.', 'success')
			},
			onError: (err: AxiosError<{ message: string }>) => {
				const message = err.response?.data.message
				if (message) {
					showSnackbar(message, 'error')
				}
			},
		}
	)

	const { mutate: upsertResult } = useMutation(
		(body: UpsertResultBody) => ResultsApi.upsertResult(body),
		{
			onSuccess() {
				refetchResults()
				showSnackbar('Výsledek byl uložen.', 'success')
			},
			onError: (err: AxiosError<{ message: string }>) => {
				const message = err.response?.data.message
				showSnackbar(message || 'Při ukládání došlo k neznámé chybě.', 'error')
			},
		}
	)

	const { mutate: deleteResult } = useMutation(
		(_id: string) => ResultsApi.deleteResult(_id),
		{
			onSuccess() {
				refetchResults()
				showSnackbar('Výsledek byl vymazán.', 'info')
			},
			onError: (err: AxiosError<{ message: string }>) => {
				const message = err.response?.data.message
				showSnackbar(message || 'Došlo k neznámé chybě.', 'error')
			},
		}
	)

	function handleSubmitResult(
		scoreSubmitted: ScoreResult | null,
		fixtureId: number,
		result?: Result
	) {
		if (scoreSubmitted === null && result) {
			deleteResult(result._id)
		} else if (scoreSubmitted !== null) {
			upsertResult({ fixtureId, ...scoreSubmitted })
		}
	}

	return (
		<AppPageWrapper>
			<List
				sx={{
					width: '100%',
					maxWidth: 860,
					bgcolor: 'background.paper',
				}}
			>
				{fixtures.response.map(({ fixture, teams }) => {
					const result = results?.find(
						({ fixtureId }) => fixture.id === fixtureId
					)
					const tip = tips?.find(({ fixtureId }) => fixture.id === fixtureId)
					return (
						<Fragment key={fixture.id}>
							<MatchRow
								teams={teams}
								fixture={fixture}
								result={result}
								tip={tip}
								onSubmitTip={score => {
									if (!isBettingDisabled(fixture.timestamp)) {
										upsertTip({ userId, fixtureId: fixture.id, ...score })
									}
								}}
								onSubmitResult={scoreSubmitted =>
									handleSubmitResult(scoreSubmitted, fixture.id, result)
								}
							/>
							<Divider component="li" />
						</Fragment>
					)
				})}
			</List>
		</AppPageWrapper>
	)
}
