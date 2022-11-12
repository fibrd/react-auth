import * as React from 'react'
import { useEffect, useState } from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import InputLabel from '@mui/material/InputLabel'
import OutlinedInput from '@mui/material/OutlinedInput'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import { Fixture } from '../types/playoff'

interface TeamSelectProps {
	homeLabel: string
	awayLabel: string
	homeValue: string
	awayValue: string
	onSubmit?: (fixture: Pick<Fixture, 'homeTeam' | 'awayTeam'> | null) => void
}

const TEAM_NAMES = [
	'Netherlands',
	'Ecuador',
	'Senegal',
	'Qatar',
	'England',
	'USA',
	'Iran',
	'Wales',
	'Poland',
	'Argentina',
	'Mexico',
	'Saudi Arabia',
	'France',
	'Denmark',
	'Tunisia',
	'Australia',
	'Germany',
	'Spain',
	'Costa Rica',
	'Japan',
	'Croatia',
	'Belgium',
	'Canada',
	'Morocco',
	'Switzerland',
	'Serbia',
	'Brazil',
	'Cameroon',
	'Portugal',
	'Uruguay',
	'Ghana',
	'South Korea',
]

export function TeamSelect({
	homeLabel,
	awayLabel,
	homeValue,
	awayValue,
	onSubmit,
}: TeamSelectProps) {
	const [open, setOpen] = useState(false)
	const [homeTeam, setHomeTeam] = useState('')
	const [awayTeam, setAwayTeam] = useState('')

	useEffect(() => {
		setHomeTeam(homeValue)
	}, [homeValue])

	useEffect(() => {
		setAwayTeam(awayValue)
	}, [awayValue])

	return (
		<div>
			<Button
				size="small"
				sx={{ fontSize: '1rem' }}
				onClick={() => setOpen(true)}
			>
				{'Zadat týmy'}
			</Button>
			<Dialog open={open} onClose={() => setOpen(false)}>
				<DialogTitle>{'Týmy'}</DialogTitle>
				<DialogContent>
					<Box component="form" sx={{ display: 'flex', flexWrap: 'wrap' }}>
						<FormControl sx={{ m: 1, minWidth: 120 }}>
							<InputLabel id="dialog-tip-select-home">{homeLabel}</InputLabel>
							<Select
								labelId="dialog-tip-select-home"
								id="dialog-tip-select-home"
								value={homeTeam}
								onChange={event => setHomeTeam(event.target.value)}
								input={<OutlinedInput label={homeLabel} />}
							>
								{TEAM_NAMES.map(score => (
									<MenuItem key={`home-${score}`} value={score}>
										{score}
									</MenuItem>
								))}
							</Select>
						</FormControl>
						<FormControl sx={{ m: 1, minWidth: 120 }}>
							<InputLabel id="dialog-tip-select-away">{awayLabel}</InputLabel>
							<Select
								labelId="dialog-tip-select-away"
								id="dialog-tip-select-away"
								value={awayTeam}
								onChange={event => setAwayTeam(event.target.value)}
								input={<OutlinedInput label={awayLabel} />}
							>
								{TEAM_NAMES.map(score => (
									<MenuItem key={`away-${score}`} value={score}>
										{score}
									</MenuItem>
								))}
							</Select>
						</FormControl>
					</Box>
				</DialogContent>
				<DialogActions>
					<Button
						onClick={() => {
							if (window.confirm('Opravdu to chcete smazat?')) {
								setOpen(false)
								onSubmit?.(null)
							}
						}}
					>
						Smazat
					</Button>
					<Button
						onClick={() => {
							setOpen(false)
							onSubmit?.({ homeTeam, awayTeam })
						}}
					>
						Potvrdit
					</Button>
				</DialogActions>
			</Dialog>
		</div>
	)
}
