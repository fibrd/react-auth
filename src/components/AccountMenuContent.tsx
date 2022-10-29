import React from 'react'
import { MenuItem, ListItemIcon } from '@mui/material'
import { Person, Logout, Login, AppRegistration } from '@mui/icons-material'
import { useAuth } from '../hooks/useAuth'
import { useDialog } from '../hooks/useDialog'
import { DialogType } from '../types/common'

interface AccountMenuContentProps {
	onLogout: () => void
}

export function AccountMenuContent({ onLogout }: AccountMenuContentProps) {
	const { user } = useAuth()
	const { showDialog } = useDialog()

	if (!user) {
		return (
			<>
				<MenuItem onClick={() => showDialog(DialogType.REGISTRATION)}>
					<ListItemIcon>
						<AppRegistration fontSize="small" />
					</ListItemIcon>
					Register
				</MenuItem>
				<MenuItem onClick={() => showDialog(DialogType.LOGIN)}>
					<ListItemIcon>
						<Login fontSize="small" />
					</ListItemIcon>
					Login
				</MenuItem>
			</>
		)
	}

	return (
		<>
			<MenuItem>
				<ListItemIcon>
					<Person fontSize="small" />
				</ListItemIcon>
				{user.username}
			</MenuItem>
			<MenuItem onClick={onLogout}>
				<ListItemIcon>
					<Logout fontSize="small" />
				</ListItemIcon>
				Logout
			</MenuItem>
		</>
	)
}
