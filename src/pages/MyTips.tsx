import React, { Fragment, useState } from 'react'
import fixtures from '../data/fixtures.json'
import { Divider, List } from '@mui/material'
import { AppPageWrapper } from '../components/common/AppPageWrapper'
import { MyTipsRow } from '../components/MyTipsRow'
import { useQuery } from 'react-query'
import { TipsApi } from '../api/TipsApi'
import { Tip } from '../types/tips'
import { useAuth } from '../hooks/useAuth'

export function MyTips() {
	const [tips, setTips] = useState<Tip[]>()
	const { user } = useAuth()
	useQuery(
		['api/tips/:userId'],
		() => TipsApi.getTipsByUserId(user?.userId ?? ''),
		{
			enabled: user !== null,
			onSuccess: ({ data }) => setTips(data.tips),
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
						<MyTipsRow
							fixture={fixture}
							teams={teams}
							tip={tips?.find(({ fixtureId }) => fixture.id === fixtureId)}
						/>
						<Divider component="li" />
					</Fragment>
				))}
			</List>
		</AppPageWrapper>
	)
}
