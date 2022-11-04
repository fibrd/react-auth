import React, { useState } from 'react'
import { List } from '@mui/material'
import { AppPageWrapper } from '../components/common/AppPageWrapper'
import { useQuery } from 'react-query'
import { ResultsApi } from '../api/ResultsApi'
import { Result } from '../types/results'
import fixtures from '../data/fixtures.json'
import { ResultsRow } from '../components/ResultsRow'

export function Results() {
	const [results, setResults] = useState<Result[]>([])

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
				{fixtures.response.map(({ teams, fixture }) => (
					<ResultsRow
						key={fixture.id}
						teams={teams}
						fixture={fixture}
						result={results?.find(({ fixtureId }) => fixture.id === fixtureId)}
					/>
				))}
			</List>
		</AppPageWrapper>
	)
}
