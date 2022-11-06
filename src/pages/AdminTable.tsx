import React, { useState } from 'react'
import { useMutation, useQuery } from 'react-query'
import { TipsApi } from '../api/TipsApi'
import { TipTable } from '../components/TipTable'
import { AuthorizeTipBody, TipRow } from '../types/tips'

export function AdminTable() {
	const [tipRows, setTipRows] = useState<TipRow[]>([])

	const { refetch } = useQuery(['api/tips'], TipsApi.getTips, {
		onSuccess: ({ data }) => setTipRows(data),
	})

	const { mutate: authorizeTip } = useMutation(
		(body: AuthorizeTipBody) => TipsApi.authorizeTip(body),
		{
			onSuccess() {
				refetch()
			},
		}
	)

	return (
		<TipTable
			tipRows={tipRows}
			isAdminTable={true}
			onAuthorizeTip={authorizeTip}
		/>
	)
}
