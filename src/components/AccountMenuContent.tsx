import React from 'react'
import { MenuItem, ListItemIcon } from '@mui/material'
import { Person, Logout, Login, PersonAdd } from '@mui/icons-material'
import { useAuth } from '../hooks/useAuth'
import { useDialog } from '../hooks/useDialog'
import { DialogType } from '../types/common'
import { useNavigate } from 'react-router-dom'

export function AccountMenuContent() {
	const { user } = useAuth()
	const { showDialog } = useDialog()
	const navigate = useNavigate()

	if (!user) {
		return (
			<>
				<MenuItem onClick={() => showDialog(DialogType.LOGIN)}>
					<ListItemIcon>
						<Login fontSize="small" />
					</ListItemIcon>
					Přihlášení
				</MenuItem>
				<MenuItem onClick={() => showDialog(DialogType.REGISTRATION)}>
					<ListItemIcon>
						<PersonAdd fontSize="small" />
					</ListItemIcon>
					Registrace
				</MenuItem>
			</>
		)
	}

	return (
		<>
			<MenuItem onClick={() => navigate('/tipy')}>
				<ListItemIcon>
					<Person fontSize="small" />
				</ListItemIcon>
				{user.username}
			</MenuItem>
			<MenuItem onClick={() => showDialog(DialogType.LOGOUT)}>
				<ListItemIcon>
					<Logout fontSize="small" />
				</ListItemIcon>
				Odhlásit
			</MenuItem>
		</>
	)
}
