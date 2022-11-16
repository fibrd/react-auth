import React from 'react'
import { Link, List, ListItem, Typography } from '@mui/material'
import { getStyleByTipResult } from '../utils/tipUtils'
import { TipResult } from '../types/tips'
import { useNavigate } from 'react-router-dom'

export function Rules() {
	const navigate = useNavigate()

	return (
		<List
			sx={{
				width: '100%',
				maxWidth: 860,
				bgcolor: 'background.paper',
			}}
		>
			<ListItem>
				<Typography fontSize="small">
					Tipují se výsledky všech zápasů Mistrovství světa ve fotbale 2022 (
					<Link
						sx={{ cursor: 'pointer', textDecoration: 'none' }}
						onClick={() => navigate('/tipy')}
					>
						podstránka TIPY
					</Link>
					).
				</Typography>
			</ListItem>
			<ListItem>
				<Typography fontSize="small">
					Pro účast v tipovačce je potřeba schválení správcem soutěže.
					Kontaktovat ho můžete osobně, případně na emailové adrese:{' '}
					<Link href="mailto:tip.jednoduse@email.cz">
						tip.jednoduse@email.cz
					</Link>
					.
				</Typography>
			</ListItem>
			<ListItem>
				<Typography fontSize="small">
					Zápisné ve výši <b>200 Kč</b> je nutné uhradit organizátorovi
					tipovačky ještě před zahájením turnaje.
				</Typography>
			</ListItem>
			<ListItem>
				<Typography fontSize="small">
					Každý tipující se může soutěže účastnit pouze jednou. Zakládaní více
					účtů je zakázáno a může vést k diskvalifikaci soutěžícího.
				</Typography>
			</ListItem>
			<ListItem>
				<Typography fontSize="small">
					Tipy na neodehrané zápasy mohou uživatelé libovolně editovat i po
					zahájení šampionátu. Tipovaní na zápasy vyřazovací fáze bude umožněno
					až po určení postupujících týmů.
				</Typography>
			</ListItem>
			<ListItem>
				<Typography fontSize="small">
					Každý soutěžící je{' '}
					<b>zodpovědný za včasné zadání a průběžné doplňování svých tipů</b>, a
					to vždy před začátkem každého zápasu. V případě nevyplnění tipu ztrácí
					nárok na bodový zisk k danému zápasu.
				</Typography>
			</ListItem>
			<ListItem>
				<Typography fontSize="small">
					Peněžní výhru si rozdělí první tři tipující s nejvyšším dosaženým
					skóre v poměru <b>50 %</b> první, <b>30 %</b> druhý a <b>20 %</b>{' '}
					třetí tipující (Přesné částky budou včas upřesněny podle počtu všech
					soutěžících).
				</Typography>
			</ListItem>
			<ListItem>
				<Typography fontSize="small">
					Pokud dva nebo více hráčů dosáhnou shodného konečného skóre, rozdělí
					si umístění i případnou výhru rovnoměrně.
				</Typography>
			</ListItem>
			<ListItem sx={{ flexDirection: 'column', alignItems: 'flex-start' }}>
				<Typography fontSize="small">
					Skóre se bude vypočítávat následujícím způsobem:
				</Typography>
				<List>
					<ListItem>
						<Typography fontSize="small">
							<span style={getStyleByTipResult(TipResult.CORRECT)}>
								<b>5 bodů</b>
							</span>{' '}
							- za zcela přesný výsledek zápasu (Např. Tip 3:1 a zápas dopadne
							3:1).
						</Typography>
					</ListItem>
					<ListItem>
						<Typography fontSize="small">
							<span style={getStyleByTipResult(TipResult.SCORE_DIFF_CORRECT)}>
								<b>2 body</b>
							</span>{' '}
							- za správné určení vítěze se správně tipnutým rozdílem skóre
							(Např. Tip 3:1 a zápas dopadne 4:2).
						</Typography>
					</ListItem>
					<ListItem>
						<Typography fontSize="small">
							<span style={getStyleByTipResult(TipResult.WINNER_CORRECT)}>
								<b>1 bod</b>
							</span>{' '}
							- za správné určení vítěze (Např. Tip 3:1 a zápas dopadne 6:0).
						</Typography>
					</ListItem>
					<ListItem>
						<Typography fontSize="small">
							<b>0 bodů</b> - za nesprávný tip (Např. Tip is 3:1 a zápas dopadne
							1:1).
						</Typography>
					</ListItem>
					<ListItem>
						<Typography fontSize="small">
							<span style={{ textDecoration: 'underline' }}>
								<b>Speciální tip</b>
							</span>{' '}
							- Finalový zápas bude ohodnocen dvojnásobným počtem bodů!
						</Typography>
					</ListItem>
				</List>
			</ListItem>
			<ListItem>
				<Typography fontSize="small">Změna pravidel vyhrazena.</Typography>
			</ListItem>
		</List>
	)
}
