import React, { Fragment } from 'react'
import fixtures from '../data/fixtures.json'
import { Divider, List } from '@mui/material'
import { AppPageWrapper } from '../components/common/AppPageWrapper'
import { MyTipsRow } from '../components/MyTipsRow'

export function MyTips() {
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
						<MyTipsRow fixture={fixture} teams={teams} />
						<Divider component="li" />
					</Fragment>
				))}
			</List>
		</AppPageWrapper>
	)
}
