import React from 'react'
import { Box, Avatar, Menu, IconButton, Tooltip } from '@mui/material'
import { Menu as MenuIcon } from '@mui/icons-material'
import { useAuth } from '../hooks/useAuth'
import { AccountMenuContent } from './AccountMenuContent'

interface AccountMenuProps {
	onLogout: () => void
}

export function AccountMenu({ onLogout }: AccountMenuProps) {
	const { user } = useAuth()
	const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
	const open = Boolean(anchorEl)

	return (
		<Box>
			<Tooltip title="Uživatelské menu">
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
			<Menu
				anchorEl={anchorEl}
				id="account-menu"
				sx={{ mt: '45px' }}
				open={open}
				onClose={() => setAnchorEl(null)}
				onClick={() => setAnchorEl(null)}
				transformOrigin={{ horizontal: 'right', vertical: 'top' }}
				anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
				keepMounted
			>
				<AccountMenuContent onLogout={onLogout} />
			</Menu>
		</Box>
	)
}
