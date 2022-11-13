import React from 'react'
import {
	Dialog,
	DialogContent,
	DialogTitle,
	Link,
	Typography,
} from '@mui/material'
import { useDialog } from '../hooks/useDialog'
import { useAuth } from '../hooks/useAuth'

export function AccountModal() {
	const { hideDialog } = useDialog()
	const { user } = useAuth()

	return (
		<Dialog open={true} onClose={() => hideDialog()} fullWidth={true}>
			<DialogTitle>{user?.email}</DialogTitle>
			<DialogContent
				sx={{ display: 'flex', flexDirection: 'column', gap: '10px' }}
			>
				<Typography>Uživatelské jméno: {user?.username}</Typography>
				<Typography fontSize="small">
					Pro změnu údajů kontaktujte správce na emailu:{' '}
					<Link href="mailto:tip.jednoduse@email.cz">
						tip.jednoduse@email.cz
					</Link>
				</Typography>
			</DialogContent>
		</Dialog>
	)
}
