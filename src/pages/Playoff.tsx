import React, { Fragment, useState } from 'react'
import { Box, Divider, List, ListItem, ListItemText } from '@mui/material'
import { AppPageWrapper } from '../components/common/AppPageWrapper'
import playoffData from '../data/playoff.json'
import { PlayoffApi } from '../api/PlayoffApi'
import { useMutation, useQuery } from 'react-query'
import { Fixture, UpsertFixtureBody } from '../types/playoff'
import { TeamSelect } from '../components/TeamSelect'
import { AxiosError } from 'axios'
import { useSnackbar } from '../hooks/useSnackbar'
import { getLocalString } from '../utils/fixtureUtils'

type FixtureTeams = Pick<Fixture, 'homeTeam' | 'awayTeam'>

export function Playoff() {
	const { showSnackbar } = useSnackbar()
	const [playoffFixtures, setPlayoffFixtures] = useState<Fixture[]>([])

	const { refetch: refetchFixtures } = useQuery(
		['api/fixtures'],
		PlayoffApi.getFixtures,
		{
			onSuccess: ({ data }) => setPlayoffFixtures(data.fixtures),
		}
	)

	const { mutate: upsertFixture } = useMutation(
		(body: UpsertFixtureBody) => PlayoffApi.upsertFixture(body),
		{
			onSuccess() {
				refetchFixtures()
				showSnackbar('Týmy byly uloženy.', 'success')
			},
			onError: (err: AxiosError<{ message: string }>) => {
				const message = err.response?.data.message
				showSnackbar(message || 'Při ukládání došlo k neznámé chybě.', 'error')
			},
		}
	)

	const { mutate: deleteFixture } = useMutation(
		(_id: string) => PlayoffApi.deleteFixture(_id),
		{
			onSuccess() {
				refetchFixtures()
				showSnackbar('Týmy byly vymazány.', 'info')
			},
			onError: (err: AxiosError<{ message: string }>) => {
				const message = err.response?.data.message
				showSnackbar(message || 'Došlo k neznámé chybě.', 'error')
			},
		}
	)

	function handleSubmit(
		fixtureSubmitted: FixtureTeams | null,
		fixtureId: number,
		storedFixture?: Fixture
	) {
		if (fixtureSubmitted === null && storedFixture) {
			deleteFixture(storedFixture._id)
		} else if (fixtureSubmitted !== null) {
			upsertFixture({ fixtureId, ...fixtureSubmitted })
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
				{playoffData.response.map(({ fixture, teams }) => {
					const storedFixture = playoffFixtures.find(
						({ fixtureId }) => fixtureId === fixture.id
					)
					return (
						<Fragment key={fixture.id}>
							<ListItem sx={{ flexDirection: 'column' }}>
								<Box
									sx={{
										display: 'flex',
										gap: '10px',
										alignItems: 'center',
									}}
								>
									<TeamSelect
										homeLabel={teams.home.placeholder}
										awayLabel={teams.away.placeholder}
										homeValue={storedFixture?.homeTeam ?? ''}
										awayValue={storedFixture?.awayTeam ?? ''}
										onSubmit={fixtureSubmitted =>
											handleSubmit(fixtureSubmitted, fixture.id, storedFixture)
										}
									/>
								</Box>
								<ListItemText
									primary={`${
										storedFixture?.homeTeam || teams.home.placeholder
									} vs. ${storedFixture?.awayTeam || teams.away.placeholder}`}
									secondary={getLocalString(fixture.timestamp)}
									sx={{ textAlign: 'center' }}
								/>
							</ListItem>
							<Divider component="li" />
						</Fragment>
					)
				})}
			</List>
		</AppPageWrapper>
	)
}
