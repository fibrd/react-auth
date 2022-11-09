import React, { useMemo } from 'react'
import { ListItem, Box, Avatar, ListItemText, Typography } from '@mui/material'
import { ScoreSelect } from './ScoreSelect'
import { Fixture, Teams } from '../types/fixtures'
import { Result } from '../types/results'
import { useAuth } from '../hooks/useAuth'
import { Tip } from '../types/tips'
import { getTipResultPoints } from '../utils/tipUtils'

interface MatchRowProps {
	teams: Teams
	fixture: Fixture
	tip?: Tip
	result?: Result
	onSubmitTip: (score: Pick<Tip, 'home' | 'away'>) => void
	onSubmitResult: (score: Pick<Result, 'home' | 'away'> | null) => void
}

export function MatchRow({
	teams,
	fixture,
	tip,
	result,
	onSubmitTip,
	onSubmitResult,
}: MatchRowProps) {
	const { user } = useAuth()

	const points = useMemo(
		() => tip && result && getTipResultPoints(tip, result),
		[tip, result]
	)

	return (
		<ListItem sx={{ flexDirection: 'column' }}>
			<Box
				sx={{
					display: 'flex',
					gap: '5px',
					marginBottom: '5px',
					alignItems: 'center',
				}}
			>
				{/* Tip */}
				<ScoreSelect
					buttonLabel={tip ? `${tip.home}:${tip.away}` : 'Zadat tip'}
					homeLabel={teams.home.name}
					awayLabel={teams.away.name}
					homeValue={tip?.home ?? 0}
					awayValue={tip?.away ?? 0}
					onSubmitTip={onSubmitTip}
				/>

				{/* Vysledek */}
				{user?.role === 'admin' ? (
					<ScoreSelect
						buttonLabel={
							result ? `${result.home}:${result.away}` : 'Zadat výsledek'
						}
						homeLabel={teams.home.name}
						awayLabel={teams.away.name}
						homeValue={result?.home ?? 0}
						awayValue={result?.away ?? 0}
						onSubmitResult={onSubmitResult}
						results={true}
					/>
				) : (
					result && (
						<Typography>
							<b>{`${result.home}:${result.away} `}</b>
							{points !== undefined && <span>{`(${points} b.)`}</span>}
						</Typography>
					)
				)}
			</Box>

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
