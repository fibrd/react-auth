import React from 'react'
import { Avatar, Stack, Paper, Typography } from '@mui/material'
import { Standing } from '../types/standings'

interface GroupRowProps {
	standings: Standing[]
}

export function GroupRow({ standings }: GroupRowProps) {
	function createData(standing: Standing) {
		return {
			group: standing.group,
			teamName: standing.team.name,
			logo: standing.team.logo,
		}
	}

	const items = standings.map(createData)

	return (
		<Stack
			direction={{ xs: 'row', sm: 'row' }}
			spacing={{ xs: 1, md: 2 }}
			margin={{ xs: 2, md: 4 }}
		>
			{items.map(({ teamName, logo, group }) => (
				<Paper
					sx={{
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'center',
						width: '20vw',
						maxWidth: '200px',
						padding: '1vw',
					}}
					key={teamName}
				>
					<Typography variant="h6" sx={{ textAlign: 'center' }}>
						{group}
					</Typography>
					<Typography
						variant="h6"
						fontSize={{ xs: '0.8rem', md: '1rem' }}
						sx={{ textAlign: 'center' }}
					>
						{teamName}
					</Typography>
					<Avatar
						sx={{ width: '80px', height: '80px', margin: '5px' }}
						src={logo}
					/>
				</Paper>
			))}
		</Stack>
	)
}
