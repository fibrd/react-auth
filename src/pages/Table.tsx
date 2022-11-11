import React, { useState } from 'react'
import { useQuery } from 'react-query'
import { TipsApi } from '../api/TipsApi'
import { TipTable } from '../components/TipTable'
import { useAuth } from '../hooks/useAuth'
import { TipRow } from '../types/tips'

export function Table() {
	const { user } = useAuth()
	const userId = user?.userId ?? ''
	const [tipRows, setTipRows] = useState<TipRow[]>([])
	const [isAlert, setIsAlert] = useState(false)

	useQuery(['api/authorized-tips'], TipsApi.getAuthorizedTips, {
		onSuccess: ({ data }) => setTipRows(data),
	})

	useQuery(
		['api/tips/:userId', userId],
		() => TipsApi.getTipsByUserId(userId),
		{
			onSuccess: ({ data }) => {
				setIsAlert(
					user?.role !== 'admin' && data.tips.length > 0 && !data.authorized
				)
			},
		}
	)

	return <TipTable tipRows={tipRows} isAlert={isAlert} />
}
