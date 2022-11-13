import React from 'react'
import { Avatar, Stack, Paper, Typography, Box } from '@mui/material'
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
		<Box
			margin={{ xs: 1, md: 2 }}
			padding={{ xs: 1, md: 1 }}
			sx={{
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
				bgcolor: 'background.paper',
				boxShadow:
					'0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%)',
			}}
		>
			<Typography variant="h6">{items[0].group}</Typography>
			<Stack direction={{ xs: 'row', sm: 'row' }} spacing={{ xs: 0, md: 1 }}>
				{items.map(({ teamName, logo }) => (
					<Paper
						sx={{
							display: 'flex',
							flexDirection: 'column',
							alignItems: 'center',
							width: '24vw',
							maxWidth: '200px',
							padding: '1vw',
							boxShadow: 'none',
						}}
						key={teamName}
					>
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
		</Box>
	)
}
