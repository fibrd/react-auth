import React, { useState } from 'react'
import { AppPageWrapper } from '../components/common/AppPageWrapper'
import { useQuery } from 'react-query'
import { TipsApi } from '../api/TipsApi'
import { TipRow, TipResult } from '../types/tips'
import { GridColDef, DataGrid } from '@mui/x-data-grid'
import fixtures from '../data/fixtures.json'
import { FormControlLabel, FormGroup, Switch } from '@mui/material'
import { useAuth } from '../hooks/useAuth'
import { getTipResult, getTipResultPoints } from '../utils/tipUtils'
import { ResultsApi } from '../api/ResultsApi'
import { Result } from '../types/results'
import { Close, Done, DoneOutline } from '@mui/icons-material'

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
	const [results, setResults] = useState<Result[]>([])
	const [oldTipsVisible, setOldTipsHidden] = useState(false)

	useQuery(['api/tips'], TipsApi.getTips, {
		onSuccess: ({ data }) => setTipRows(data),
	})

	useQuery(['api/results'], ResultsApi.getResults, {
		onSuccess: ({ data }) => setResults(data.results),
	})

	const fixtureColumns: GridColDef[] = fixtures.response.map(
		({ fixture, teams }) => ({
			field: `fixture-${fixture.id}`,
			headerName: `${getShortName(teams.home.name)}-${getShortName(
				teams.away.name
			)}`,
			align: 'center',
			width: 85,
			hideSortIcons: true,
			hide: !oldTipsVisible && isOldTip(fixture.timestamp * 1000),
			renderCell({ value }) {
				if (!value) {
					return null
				}
				const result = results.find(({ fixtureId }) => fixture.id === fixtureId)
				const tipResult = result && getTipResult(value, result)
				return (
					<>
						<span>{`${value.home}:${value.away}`}</span>
						{tipResult === TipResult.CORRECTED && (
							<DoneOutline sx={{ marginLeft: '5px', fontSize: '0.8rem' }} />
						)}
						{tipResult === TipResult.PARTIALLY_CORRECTED && (
							<Done sx={{ marginLeft: '5px', fontSize: '0.8rem' }} />
						)}
						{tipResult === TipResult.WRONG && (
							<Close sx={{ marginLeft: '5px', fontSize: '0.8rem' }} />
						)}
					</>
				)
			},
		})
	)

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
		{
			field: 'points',
			headerName: 'Bod.',
			align: 'right',
			flex: 1,
			hideable: false,
			hideSortIcons: true,
		},
		...fixtureColumns,
	]

	function createData(tipRow: TipRow) {
		const points = fixtures.response.reduce((acc, { fixture }) => {
			const tip = tipRow.tips.find(({ fixtureId }) => fixtureId === fixture.id)
			const result = results.find(({ fixtureId }) => fixtureId === fixture.id)
			return acc + (tip && result ? getTipResultPoints(tip, result) : 0)
		}, 0)

		const fixtureRowsArray = fixtures.response.map(({ fixture }) => {
			const tip = tipRow.tips.find(({ fixtureId }) => fixtureId === fixture.id)
			return { [`fixture-${fixture.id}`]: tip ?? null }
		})
		const fixtureRowsObject = fixtureRowsArray.reduce(
			(acc, curr) => ({ ...acc, ...curr }),
			{}
		)
		const data = {
			id: tipRow.username,
			points,
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
					sortModel={[{ field: 'points', sort: 'desc' }]}
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
