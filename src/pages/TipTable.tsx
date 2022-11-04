import React, { useState } from 'react'
import { AppPageWrapper } from '../components/common/AppPageWrapper'
import { useQuery } from 'react-query'
import { TipsApi } from '../api/TipsApi'
import { TipRow } from '../types/tips'
import { GridColDef, DataGrid, GridAlignment } from '@mui/x-data-grid'
import fixtures from '../data/fixtures.json'
import { FormControlLabel, FormGroup, Switch } from '@mui/material'
import { useAuth } from '../hooks/useAuth'

const ONE_HOUR = 1000 * 60 * 60
const ONE_DAY = 24 * ONE_HOUR

function getShortName(name: string) {
	return name.substring(0, 3).toUpperCase()
}

function isOldTip(tipDate: number) {
	return tipDate < new Date().getTime() - ONE_DAY
}

export function TipTable() {
	const { user } = useAuth()
	const [tipRows, setTipRows] = useState<TipRow[]>([])
	const [oldTipsVisible, setOldTipsHidden] = useState(false)
	useQuery(['api/tips'], TipsApi.getTips, {
		onSuccess: ({ data }) => setTipRows(data),
	})
	const fixtureColumns = fixtures.response.map(({ fixture, teams }) => ({
		field: `fixture-${fixture.id}`,
		headerName: `${getShortName(teams.home.name)}-${getShortName(
			teams.away.name
		)}`,
		align: 'center' as GridAlignment,
		width: 85,
		hideSortIcons: true,
		hide: !oldTipsVisible && isOldTip(fixture.timestamp * 1000),
	}))

	const columns: GridColDef[] = [
		{
			field: 'id',
			headerName: '',
			hideable: false,
			hideSortIcons: true,
			cellClassName: 'mainDataGridCell',
			renderCell({ value }) {
				const style = value === user?.username ? { fontWeight: 700 } : undefined
				return <span style={style}>{value}</span>
			},
		},
		...fixtureColumns,
	]

	function createData(tipRows: TipRow) {
		const fixtureRowsArray = fixtures.response.map(({ fixture }) => {
			const tip = tipRows.tips.find(({ fixtureId }) => fixtureId === fixture.id)
			const key = `fixture-${fixture.id}`
			return { [key]: tip ? `${tip.home}:${tip.away}` : null }
		})
		const fixtureRowsObject = fixtureRowsArray.reduce(
			(acc, curr) => ({ ...acc, ...curr }),
			{}
		)
		const data = {
			id: tipRows.username,
			...fixtureRowsObject,
		}
		return data
	}

	const rows = tipRows.map(createData)

	return (
		<AppPageWrapper>
			<div
				style={{
					maxHeight: 800,
					width: '100%',
					maxWidth: 1536,
					backgroundColor: 'white',
				}}
			>
				<DataGrid
					autoHeight={true}
					rows={rows}
					columns={columns}
					pageSize={10}
					rowsPerPageOptions={[10]}
				/>
			</div>
			<FormGroup>
				<FormControlLabel
					sx={{ padding: '10px 5px' }}
					control={
						<Switch
							size="small"
							value={oldTipsVisible}
							onChange={() => setOldTipsHidden(prev => !prev)}
						/>
					}
					label="Zobrazit odehrané zápasy (před více než 24h)"
				/>
			</FormGroup>
		</AppPageWrapper>
	)
}
