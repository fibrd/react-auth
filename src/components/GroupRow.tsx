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
			spacing={{ xs: 0, md: 1 }}
			margin={{ xs: 1, md: 2 }}
		>
			{items.map(({ teamName, logo, group }) => (
				<Paper
					sx={{
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'center',
						width: '24vw',
						maxWidth: '200px',
						padding: '1vw',
					}}
					key={teamName}
				>
					<Typography
						variant="h6"
						fontSize={{ xs: '1rem', md: '1.2rem' }}
						sx={{ textAlign: 'center', whiteSpace: 'nowrap' }}
					>
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
						sx={{
							width: '60px',
							height: '40px',
							margin: '5px',
							outline: '1px solid grey',
						}}
						src={logo}
						variant="square"
					/>
				</Paper>
			))}
		</Stack>
	)
}
