import React, { useState } from 'react'
import { AppPageWrapper } from '../components/common/AppPageWrapper'
import { useQuery } from 'react-query'
import { TipsApi } from '../api/TipsApi'
import { TipRow } from '../types/tips'
import { GridColDef, DataGrid } from '@mui/x-data-grid'
import fixtures from '../data/fixtures.json'

export function TipTable() {
	const [tipRows, setTipRows] = useState<TipRow[]>([])
	useQuery(['api/tips'], TipsApi.getTips, {
		onSuccess: ({ data }) => setTipRows(data),
	})
	const fixtureColumns = fixtures.response.map(({ fixture, teams }) => ({
		field: `fixture-${fixture.id}`,
		headerName: `${teams.home.name} - ${teams.away.name}`,
	}))

	const columns: GridColDef[] = [
		{ field: 'id', headerName: 'Tipující' },
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
			<div style={{ height: 800, width: '100%' }}>
				<DataGrid
					rows={rows}
					columns={columns}
					pageSize={10}
					rowsPerPageOptions={[10]}
				/>
			</div>
		</AppPageWrapper>
	)
}
