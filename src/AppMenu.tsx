import React, { useContext } from 'react'
import {
	Box,
	Avatar,
	Menu,
	MenuItem,
	ListItemIcon,
	IconButton,
	Tooltip,
} from '@mui/material'
import { PersonAdd, Settings, Logout } from '@mui/icons-material'
import AuthContext from './context/AuthContext'
import { useMutation } from 'react-query'
import { LoraApi } from './api/LoraApi'
import { AxiosError } from 'axios'
import SnackbarContext from './context/SnackbarContext'

export function AppMenu() {
	const { showSnackbar } = useContext(SnackbarContext)
	const { user, logout } = useContext(AuthContext)
	const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
	const open = Boolean(anchorEl)

	const { mutate } = useMutation(() => LoraApi.logout(), {
		onSuccess: ({ data }) => {
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
		<React.Fragment>
			<Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
				<Tooltip title="Account settings">
					<IconButton
						onClick={e => setAnchorEl(e.currentTarget)}
						size="small"
						sx={{ ml: 2 }}
						aria-controls={open ? 'account-menu' : undefined}
						aria-haspopup="true"
						aria-expanded={open ? 'true' : undefined}
					>
						<Avatar sx={{ width: 32, height: 32 }}>M</Avatar>
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
							right: 14,
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
				{user && (
					<MenuItem>
						<ListItemIcon>
							<PersonAdd fontSize="small" />
						</ListItemIcon>
						{user.username}
					</MenuItem>
				)}
				<MenuItem>
					<ListItemIcon>
						<Settings fontSize="small" />
					</ListItemIcon>
					Settings
				</MenuItem>
				{user && (
					<MenuItem onClick={() => mutate()}>
						<ListItemIcon>
							<Logout fontSize="small" />
						</ListItemIcon>
						Logout
					</MenuItem>
				)}
			</Menu>
		</React.Fragment>
	)
}
