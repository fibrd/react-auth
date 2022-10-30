import React from 'react'
import { ListItem, Box, Avatar, ListItemText } from '@mui/material'
import { TipSelect } from './TipSelect'
import { Fixture, Teams } from '../types/fixtures'

interface MyTipsRowProps {
	teams: Teams
	fixture: Fixture
}

export function MyTipsRow({ teams, fixture }: MyTipsRowProps) {
	return (
		<ListItem sx={{ flexDirection: 'column' }}>
			<TipSelect homeLabel={teams.home.name} awayLabel={teams.away.name} />
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
