import React from 'react'
import { List, ListItem, Typography } from '@mui/material'

export function Rules() {
	return (
		<List
			sx={{
				width: '100%',
				maxWidth: 860,
				bgcolor: 'background.paper',
			}}
		>
			<ListItem>
				Tipují se výsledky zápasů skupinové fáze a postupující týmy v rámci
				vyřazovací fáze Mistrovství světa ve fotbale 2022.
			</ListItem>
			<ListItem>
				Pro účast v tipovačce je potřeba schválení organizátora, příp. správce
				soutěže.
			</ListItem>
			<ListItem>
				Tipy na neodehrané zápasy mohou být libovolně editovány i do zahájení
				šampionátu.
			</ListItem>
			<ListItem>
				Každý tipující se může soutěže účastnit pouze jednou. Zakládaní více
				účtů je zakázáno a může vést k diskvalifikaci soutěžícího.
			</ListItem>
			<ListItem>
				Zápisné ve výši 200 Kč je nutné organizátorovi tipovačky uhradit ještě
				před zahájením turnaje.
			</ListItem>
			<ListItem>
				Peněžní výhru si rozdělí první tři tipující s nejvyšším dosaženým skóre
				v poměru 50 % první, 30% druhý a 20 % třetí tipující (Přesné částky
				budou včas upřesněny podle počtu všech soutěžících).
			</ListItem>
			<ListItem>
				Pokud dva nebo více hráčů dosáhnou shodného konečného skóre, rozdělí si
				umístění i případnou výhru rovnoměrně.
			</ListItem>
			<ListItem sx={{ flexDirection: 'column', alignItems: 'flex-start' }}>
				<Typography>
					Skóre se bude vypočítávat následujícím způsobem:
				</Typography>
				<List>
					<ListItem>
						5 bodů - za zcela přesný výsledek zápasu s celkovým součtem
						maximálně čtyř vstřelených gólů (Např. Tip 3:1 a zápas dopadne 3:1).
					</ListItem>
					<ListItem>
						2 body - za správné určení vítěze se správně tipnutým rozdílem
						skóre, resp. určení remízy zápasu (Např. Tip 3:1 a zápas dopadne
						4:2).
					</ListItem>
					<ListItem>
						1 body - za správné určení vítěze (Např. Tip 3:1 a zápas dopadne
						6:0).
					</ListItem>
					<ListItem>
						0 bodů - za nesprávný tip (Např. Tip is 3:1 a zápas dopadne 1:1).
					</ListItem>
				</List>
			</ListItem>
			<ListItem>
				<small>Změna pravidel vyhrazena.</small>
			</ListItem>
		</List>
	)
}
