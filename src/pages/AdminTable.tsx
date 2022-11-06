import React, { useState } from 'react'
import { useQuery } from 'react-query'
import { TipsApi } from '../api/TipsApi'
import { TipTable } from '../components/TipTable'
import { TipRow } from '../types/tips'

export function AdminTable() {
	const [tipRows, setTipRows] = useState<TipRow[]>([])

	useQuery(['api/tips'], TipsApi.getTips, {
		onSuccess: ({ data }) => setTipRows(data),
	})

	return <TipTable tipRows={tipRows} />
}
