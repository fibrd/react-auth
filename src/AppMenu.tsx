import React from 'react'
import {
	Box,
	Avatar,
	Menu,
	MenuItem,
	ListItemIcon,
	IconButton,
	Tooltip,
} from '@mui/material'
import {
	Person,
	Logout,
	Login,
	AppRegistration,
	Menu as MenuIcon,
} from '@mui/icons-material'
import { useMutation } from 'react-query'
import { AuthApi } from './api/AuthApi'
import { AxiosError } from 'axios'
import { DialogType } from './types/common'
import { useAuth } from './hooks/useAuth'
import { useSnackbar } from './hooks/useSnackbar'
import { useDialog } from './hooks/useDialog'

export function AppMenu() {
	const { user, logout } = useAuth()
	const { showSnackbar } = useSnackbar()
	const { showDialog } = useDialog()
	const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
	const open = Boolean(anchorEl)

	const { mutate } = useMutation(() => AuthApi.logout(), {
		onSuccess: ({ data }) => {
			localStorage.removeItem('user')
			logout()
			showSnackbar(data.message, 'success')
		},
		onError: (err: AxiosError<{ message: string }>) => {
			const message = err.response?.data.message
			if (message) {
				showSnackbar(message, 'error')
			}
		},
	})

	return (
		<>
			<Box>
				<Tooltip title="Account settings">
					<IconButton
						onClick={e => setAnchorEl(e.currentTarget)}
						size="small"
						aria-controls={open ? 'account-menu' : undefined}
						aria-haspopup="true"
						aria-expanded={open ? 'true' : undefined}
					>
						<Avatar>
							{user ? (
								user.username[0].toUpperCase()
							) : (
								<MenuIcon fontSize="small" />
							)}
						</Avatar>
					</IconButton>
				</Tooltip>
			</Box>
			<Menu
				anchorEl={anchorEl}
				id="account-menu"
				open={open}
				onClose={() => setAnchorEl(null)}
				onClick={() => setAnchorEl(null)}
				PaperProps={{
					elevation: 0,
					sx: {
						overflow: 'visible',
						filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
						mt: 1.5,
						'&:before': {
							content: '""',
							display: 'block',
							position: 'absolute',
							top: 0,
							right: 20,
							width: 10,
							height: 10,
							bgcolor: 'background.paper',
							transform: 'translateY(-50%) rotate(45deg)',
							zIndex: 0,
						},
					},
				}}
				transformOrigin={{ horizontal: 'right', vertical: 'top' }}
				anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
			>
				{!user && (
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
				)}
				{user && (
					<>
						<MenuItem>
							<ListItemIcon>
								<Person fontSize="small" />
							</ListItemIcon>
							{user.username}
						</MenuItem>
						<MenuItem onClick={() => mutate()}>
							<ListItemIcon>
								<Logout fontSize="small" />
							</ListItemIcon>
							Logout
						</MenuItem>
					</>
				)}
			</Menu>
		</>
	)
}
