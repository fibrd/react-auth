import React from 'react'
import {
	Box,
	Avatar,
	Menu,
	IconButton,
	Tooltip,
	LinearProgress,
} from '@mui/material'
import { Menu as MenuIcon } from '@mui/icons-material'
import { useAuth } from '../hooks/useAuth'
import { AccountMenuContent } from './AccountMenuContent'
import { AxiosError } from 'axios'
import { useMutation } from 'react-query'
import { AuthApi } from '../api/AuthApi'
import { useSnackbar } from '../hooks/useSnackbar'

export function AccountMenu() {
	const { user, logout } = useAuth()
	const { showSnackbar } = useSnackbar()
	const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
	const open = Boolean(anchorEl)

	const { mutate: doLogout, isLoading } = useMutation(() => AuthApi.logout(), {
		onSuccess: ({ data }) => {
			localStorage.removeItem('user')
			logout()
			showSnackbar(data.message, 'info')
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
			{isLoading && <LinearProgress />}
			<Box>
				<Tooltip title="Account settings">
					<IconButton
						color="primary"
						onClick={e => setAnchorEl(e.currentTarget)}
						size="small"
						aria-controls={open ? 'account-menu' : undefined}
						aria-haspopup="true"
						aria-expanded={open ? 'true' : undefined}
					>
						<Avatar color="primary">
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
				<AccountMenuContent onLogout={doLogout} />
			</Menu>
		</>
	)
}
