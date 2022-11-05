import React, { Fragment, useState } from 'react'
import fixtures from '../data/fixtures.json'
import { Divider, List } from '@mui/material'
import { AppPageWrapper } from '../components/common/AppPageWrapper'
import { ResultsRow } from '../components/ResultsRow'
import { useQuery } from 'react-query'
import { ResultsApi } from '../api/ResultsApi'
import { Result } from '../types/results'
import { TipsApi } from '../api/TipsApi'
import { useAuth } from '../hooks/useAuth'
import { Tip } from '../types/tips'

export function Schedule() {
	const { user } = useAuth()
	const [tips, setTips] = useState<Tip[]>()
	const [results, setResults] = useState<Result[]>([])

	useQuery(
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
						<ResultsRow
							teams={teams}
							fixture={fixture}
							result={results?.find(
								({ fixtureId }) => fixture.id === fixtureId
							)}
							tip={tips?.find(({ fixtureId }) => fixture.id === fixtureId)}
						/>
						<Divider component="li" />
					</Fragment>
				))}
			</List>
		</AppPageWrapper>
	)
}
