import { Link, Typography } from '@mui/material'
import React from 'react'
import { useDialog } from '../hooks/useDialog'
import { DialogType } from '../types/common'

export function AnonymousInfo() {
	const { showDialog } = useDialog()

	return (
		<Typography sx={{ textAlign: 'center', padding: '10px' }} variant="h6">
			Pro více podrobností k soutěži se prosím{' '}
			<Link
				sx={{ cursor: 'pointer', textDecoration: 'none' }}
				onClick={() => showDialog(DialogType.LOGIN)}
			>
				přihlašte
			</Link>
			, případně si{' '}
			<Link
				sx={{ cursor: 'pointer', textDecoration: 'none' }}
				onClick={() => showDialog(DialogType.REGISTRATION)}
			>
				zaregistrujte
			</Link>{' '}
			nový účet.
		</Typography>
	)
}
