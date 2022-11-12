import React, { useMemo } from 'react'
import { ListItem, Box, Avatar, ListItemText, Typography } from '@mui/material'
import { ScoreSelect } from './ScoreSelect'
import { Result } from '../types/results'
import { useAuth } from '../hooks/useAuth'
import { Tip } from '../types/tips'
import { getTipResultPoints } from '../utils/tipUtils'
import { getLocalString, isBettingDisabled } from '../utils/fixtureUtils'
import { FixtureType } from '../types/playoff'

interface MatchRowProps {
	homeLabel: string
	awayLabel: string
	homeLogo?: string
	awayLogo?: string
	timestamp: number
	tip?: Tip
	result?: Result
	notKnownTeams?: boolean
	matchType?: FixtureType
	onSubmitTip: (score: Pick<Tip, 'home' | 'away'>) => void
	onSubmitResult: (score: Pick<Result, 'home' | 'away'> | null) => void
}

export function MatchRow({
	homeLabel,
	awayLabel,
	homeLogo,
	awayLogo,
	timestamp,
	tip,
	result,
	notKnownTeams,
	matchType,
	onSubmitTip,
	onSubmitResult,
}: MatchRowProps) {
	const { user } = useAuth()

	const points = useMemo(
		() => (tip && result ? getTipResultPoints(tip, result, matchType) : 0),
		[tip, result, matchType]
	)

	return (
		<ListItem sx={{ flexDirection: 'column' }}>
			<Box
				sx={{
					display: 'flex',
					gap: '10px',
					marginBottom: '5px',
					alignItems: 'center',
				}}
			>
				{/* Tip */}
				<ScoreSelect
					buttonLabel={tip ? `${tip.home}:${tip.away}` : 'Zadat tip'}
					homeLabel={homeLabel}
					awayLabel={awayLabel}
					homeValue={tip?.home ?? 0}
					awayValue={tip?.away ?? 0}
					onSubmitTip={onSubmitTip}
					disabled={isBettingDisabled(timestamp) || notKnownTeams}
				/>
				{/* Vysledek */}
				{user?.role === 'admin' ? (
					<ScoreSelect
						buttonLabel={
							result ? `${result.home}:${result.away}` : 'Zadat výsledek'
						}
						homeLabel={homeLabel}
						awayLabel={awayLabel}
						homeValue={result?.home ?? 0}
						awayValue={result?.away ?? 0}
						onSubmitResult={onSubmitResult}
						results={true}
						disabled={notKnownTeams}
					/>
				) : (
					result && (
						<Typography>
							<b>{`${result.home}:${result.away} `}</b>
						</Typography>
					)
				)}

				{/* Body zobrazovat pouze kdyz existuje vysledek*/}
				{result && <Typography>{`(${points} b.)`}</Typography>}
			</Box>

			<Box
				sx={{
					display: 'flex',
					justifyContent: 'space-between',
					width: '100%',
					maxWidth: '480px',
				}}
			>
				{homeLogo && (
					<Avatar
						src={homeLogo}
						sx={{
							width: '60px',
							height: '40px',
							margin: '5px',
							outline: '1px solid grey',
						}}
						variant="square"
					/>
				)}
				<ListItemText
					primary={`${homeLabel} vs. ${awayLabel}`}
					secondary={
						getLocalString(timestamp) + (matchType ? ` (${matchType})` : '')
					}
					sx={{ textAlign: 'center' }}
				/>
				{awayLogo && (
					<Avatar
						src={awayLogo}
						sx={{
							width: '60px',
							height: '40px',
							margin: '5px',
							outline: '1px solid grey',
						}}
						variant="square"
					/>
				)}
			</Box>
		</ListItem>
	)
}
