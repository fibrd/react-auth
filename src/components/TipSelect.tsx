import * as React from 'react'
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
import { useEffect, useState } from 'react'
import { Score } from '../types/tips'

interface TipSelectProps {
	buttonLabel: string
	homeLabel: string
	awayLabel: string
	homeValue: number
	awayValue: number
	onSubmit: (score: Score) => void
}

const TEAM_SCORE = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]

export function TipSelect({
	buttonLabel,
	homeLabel,
	awayLabel,
	homeValue,
	awayValue,
	onSubmit,
}: TipSelectProps) {
	const [open, setOpen] = useState(false)
	const [home, setHome] = useState(0)
	const [away, setAway] = useState(0)

	useEffect(() => {
		setHome(homeValue)
	}, [homeValue])

	useEffect(() => {
		setAway(awayValue)
	}, [awayValue])

	return (
		<div>
			<Button sx={{ fontSize: '1rem' }} onClick={() => setOpen(true)}>
				{buttonLabel}
			</Button>
			<Dialog open={open} onClose={() => setOpen(false)}>
				<DialogTitle>Tip výsledku</DialogTitle>
				<DialogContent>
					<Box component="form" sx={{ display: 'flex', flexWrap: 'wrap' }}>
						<FormControl sx={{ m: 1, minWidth: 120 }}>
							<InputLabel id="dialog-tip-select-home">{homeLabel}</InputLabel>
							<Select
								labelId="dialog-tip-select-home"
								id="dialog-tip-select-home"
								value={home}
								onChange={event => setHome(Number(event.target.value))}
								input={<OutlinedInput label={homeLabel} />}
							>
								{TEAM_SCORE.map(score => (
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
								value={away}
								onChange={event => setAway(Number(event.target.value))}
								input={<OutlinedInput label={awayLabel} />}
							>
								{TEAM_SCORE.map(score => (
									<MenuItem key={`away-${score}`} value={score}>
										{score}
									</MenuItem>
								))}
							</Select>
						</FormControl>
					</Box>
				</DialogContent>
				<DialogActions>
					<Button onClick={() => setOpen(false)}>Zrušit</Button>
					<Button
						onClick={() => {
							setOpen(false)
							onSubmit({ home: home, away: away })
						}}
					>
						Potvrdit
					</Button>
				</DialogActions>
			</Dialog>
		</div>
	)
}
