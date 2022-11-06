import React, { Fragment, useState } from 'react'
import fixtures from '../data/fixtures.json'
import { Divider, List } from '@mui/material'
import { AppPageWrapper } from '../components/common/AppPageWrapper'
import { MatchRow } from '../components/MatchRow'
import { useMutation, useQuery } from 'react-query'
import { ResultsApi } from '../api/ResultsApi'
import { Result } from '../types/results'
import { TipsApi } from '../api/TipsApi'
import { useAuth } from '../hooks/useAuth'
import { Tip, UpsertTipBody } from '../types/tips'
import { AxiosError } from 'axios'
import { useSnackbar } from '../hooks/useSnackbar'

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

	useQuery(['api/results'], ResultsApi.getResults, {
		onSuccess: ({ data }) => setResults(data.results),
	})

	const { mutate: upsertTip } = useMutation(
		(body: UpsertTipBody) => TipsApi.upsertTip(body),
		{
			onSuccess() {
				refetchTips()
			},
			onError: (err: AxiosError<{ message: string }>) => {
				const message = err.response?.data.message
				if (message) {
					showSnackbar(message, 'error')
				}
			},
		}
	)

	return (
		<AppPageWrapper>
			<List
				sx={{
					width: '100%',
					maxWidth: 860,
					bgcolor: 'background.paper',
				}}
			>
				{fixtures.response.map(({ fixture, teams }) => (
					<Fragment key={fixture.id}>
						<MatchRow
							teams={teams}
							fixture={fixture}
							result={results?.find(
								({ fixtureId }) => fixture.id === fixtureId
							)}
							tip={tips?.find(({ fixtureId }) => fixture.id === fixtureId)}
							onSubmitTip={score =>
								upsertTip({ userId, fixtureId: fixture.id, ...score })
							}
						/>
						<Divider component="li" />
					</Fragment>
				))}
			</List>
		</AppPageWrapper>
	)
}
