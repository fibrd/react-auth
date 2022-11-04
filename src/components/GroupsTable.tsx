import React from 'react'
import {
	Table,
	TableRow,
	TableCell,
	TableBody,
	Avatar,
	Stack,
	Paper,
	Divider,
	Typography,
} from '@mui/material'
import { Standing } from '../types/standings'

interface GroupsTableProps {
	standings: Standing[]
}

export function GroupsTable({ standings }: GroupsTableProps) {
	function createData(standing: Standing) {
		return {
			group: standing.group,
			teamName: standing.team.name,
			logo: standing.team.logo,
		}
	}

	const rows = standings.map(createData)

	return (
		<Stack
			direction={{ xs: 'row', sm: 'row' }}
			spacing={{ xs: 1, md: 2 }}
			margin={{ xs: 2, md: 4 }}
		>
			{rows.map(({ teamName, logo, group }) => (
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
		// <Table size="small" sx={{ maxWidth: 650 }} aria-label="simple table">
		// 	<TableBody>
		// 		{rows.map(row => (
		// 			<TableRow
		// 				key={row.teamName}
		// 				sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
		// 			>
		// 				<TableCell variant="head">{row.group}</TableCell>
		// 				<TableCell>{row.teamName}</TableCell>
		// 				<TableCell>
		// 					<Avatar src={row.logo} />
		// 				</TableCell>
		// 			</TableRow>
		// 		))}
		// 	</TableBody>
		// </Table>
	)
}
