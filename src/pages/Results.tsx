import React, { useState } from 'react'
import { Typography } from '@mui/material'
import { AppPageWrapper } from '../components/common/AppPageWrapper'
import { useQuery } from 'react-query'
import { ResultsApi } from '../api/ResultsApi'
import { Result } from '../types/results'

export function Results() {
	const [results, setResults] = useState<Result[]>([])
	useQuery(['api/results'], ResultsApi.getResults, {
		onSuccess: ({ data }) => setResults(data.results),
	})
	console.log(results)

	return (
		<AppPageWrapper>
			<Typography variant="h4" gutterBottom>
				Výsledky
			</Typography>
		</AppPageWrapper>
	)
}
