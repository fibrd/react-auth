import React, { Fragment } from 'react'
import fixtures from '../data/fixtures.json'
import { Avatar, Divider, List, ListItem, ListItemText } from '@mui/material'
import { AppPageWrapper } from '../components/common/AppPageWrapper'
import { TipSelect } from '../components/TipSelect'

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
						<ListItem>
							<Avatar src={teams.home.logo} />
							<ListItemText
								primary={`${teams.home.name} vs. ${teams.away.name}`}
								secondary={new Date(fixture.timestamp * 1000).toLocaleString(
									[],
									{
										year: 'numeric',
										month: 'numeric',
										day: 'numeric',
										hour: '2-digit',
										minute: '2-digit',
									}
								)}
								sx={{ textAlign: 'center' }}
							/>
							<Avatar src={teams.away.logo} />
						</ListItem>
						<ListItem sx={{ display: 'flex', justifyContent: 'center' }}>
							<TipSelect
								homeLabel={teams.home.name}
								awayLabel={teams.away.name}
							/>
						</ListItem>
						<Divider component="li" />
					</Fragment>
				))}
			</List>
		</AppPageWrapper>
	)
}
