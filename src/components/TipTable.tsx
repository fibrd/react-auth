import React, { useState } from 'react'
import { AppPageWrapper } from './common/AppPageWrapper'
import { useQuery } from 'react-query'
import { TipRow, TipResult, AuthorizeTipBody } from '../types/tips'
import { GridColDef, DataGrid } from '@mui/x-data-grid'
import fixtures from '../data/fixtures.json'
import {
	colors,
	FormControlLabel,
	FormGroup,
	Switch,
	Typography,
} from '@mui/material'
import { useAuth } from '../hooks/useAuth'
import { getTipResult, getTipResultPoints } from '../utils/tipUtils'
import { ResultsApi } from '../api/ResultsApi'
import { Result } from '../types/results'
import { Check, Close } from '@mui/icons-material'
import { getShortName, isOldTip } from '../utils/fixtureUtils'

function getStyleByTipResult(tipResult: TipResult) {
	switch (tipResult) {
		case TipResult.CORRECT:
			return {
				padding: '4px 8px',
				borderRadius: '50%',
				border: `2px solid ${colors.green.A700}`,
			}
		case TipResult.SCORE_DIFF_CORRECT:
			return {
				padding: '4px 8px',
				borderRadius: '50%',
				border: `2px dashed ${colors.green.A700}`,
			}
		case TipResult.WINNER_CORRECT:
			return {
				padding: '4px 8px',
				borderRadius: '50%',
				border: `2px dotted ${colors.green.A700}`,
			}
		case TipResult.WRONG:
			return {
				textDecoration: 'line-through',
			}
	}
}

interface TipTableProps {
	tipRows: TipRow[]
	isAdminTable?: boolean
	onAuthorizeTip?: (body: AuthorizeTipBody) => void
}

export function TipTable({
	tipRows,
	isAdminTable,
	onAuthorizeTip,
}: TipTableProps) {
	const { user } = useAuth()
	const [results, setResults] = useState<Result[]>([])
	const [oldTipsVisible, setOldTipsHidden] = useState(false)

	useQuery(['api/results'], ResultsApi.getResults, {
		onSuccess: ({ data }) => setResults(data.results),
	})

	const adminColumns: GridColDef[] = isAdminTable
		? [
				{
					field: 'authorized',
					headerName: '',
					hideSortIcons: true,
					hideable: false,
					align: 'center',
					flex: 1,
					renderCell({ value }) {
						const { authorized, userId } = value
						return authorized ? (
							<Check
								onClick={() =>
									window.confirm('Autorizovat?') &&
									onAuthorizeTip?.({ authorized: false, userId })
								}
								sx={{ cursor: 'pointer' }}
								fontSize="small"
							/>
						) : (
							<Close
								onClick={() =>
									window.confirm('Autorizovat?') &&
									onAuthorizeTip?.({ authorized: true, userId })
								}
								sx={{ cursor: 'pointer' }}
								fontSize="small"
							/>
						)
					},
				},
		  ]
		: []

	const fixtureColumns: GridColDef[] = fixtures.response.map(
		({ fixture, teams }) => {
			const result = results.find(({ fixtureId }) => fixture.id === fixtureId)
			return {
				field: `fixture-${fixture.id}`,
				headerName: `${getShortName(teams.home.name)}-${getShortName(
					teams.away.name
				)}`,
				headerClassName: 'fixtureHeader',
				align: 'center',
				width: 80,
				hideSortIcons: true,
				hide: !oldTipsVisible && isOldTip(fixture.timestamp),
				renderCell({ value }) {
					if (!value) {
						return null
					}
					const [home, away]: string[] = value.split(':')
					const tip = { home: parseInt(home), away: parseInt(away) }
					const tipResult = tip && result && getTipResult(tip, result)
					const style = tipResult ? getStyleByTipResult(tipResult) : {}
					return <span style={style}>{value}</span>
				},
				renderHeader({ colDef }) {
					if (!result) {
						return <Typography fontSize="small">{colDef.headerName}</Typography>
					}
					return (
						<>
							<Typography
								fontSize="small"
								sx={{ position: 'relative', bottom: '4px' }}
							>
								{colDef.headerName}
							</Typography>
							<Typography
								fontSize="small"
								sx={{
									position: 'absolute',
									bottom: '6px',
									left: 0,
									right: 0,
									marginLeft: 'auto',
									marginRight: 'auto',
									textAlign: 'center',
								}}
							>
								{`(${result.home}:${result.away})`}
							</Typography>
						</>
					)
				},
			}
		}
	)

	const columns: GridColDef[] = [
		...adminColumns,
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
			return {
				[`fixture-${fixture.id}`]: tip ? `${tip.home}:${tip.away}` : null,
			}
		})
		const fixtureRowsObject = fixtureRowsArray.reduce(
			(acc, curr) => ({ ...acc, ...curr }),
			{}
		)
		const data = {
			id: tipRow.username,
			authorized: { authorized: tipRow.authorized, userId: tipRow.userId },
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
					initialState={{
						sorting: { sortModel: [{ field: 'points', sort: 'desc' }] },
					}}
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
