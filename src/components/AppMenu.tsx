import {
	AppBar,
	Container,
	Toolbar,
	Typography,
	Box,
	IconButton,
	Menu,
	MenuItem,
	Button,
	ListItemIcon,
} from '@mui/material'
import {
	Menu as MenuIcon,
	SportsSoccerTwoTone,
	Groups,
	TableView,
	TipsAndUpdates,
	AdminPanelSettings,
	Scoreboard,
} from '@mui/icons-material'
import * as React from 'react'
import { AccountMenu } from './AccountMenu'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

const PAGES = [
	{
		title: 'Tipy',
		path: '/tipy',
		icon: <TipsAndUpdates fontSize="small" />,
	},
	{
		title: 'Playoff',
		path: '/playoff',
		icon: <Scoreboard fontSize="small" />,
	},
	{
		title: 'Admin',
		path: '/admin',
		icon: <AdminPanelSettings fontSize="small" />,
	},
	{
		title: 'Tabulka',
		path: '/tabulka',
		icon: <TableView fontSize="small" />,
	},
	{
		title: 'Skupiny',
		path: '/skupiny',
		icon: <Groups fontSize="small" />,
	},
]

export function AppMenu() {
	const navigate = useNavigate()
	const { user } = useAuth()
	const pages =
		user?.role === 'admin'
			? PAGES
			: PAGES.filter(({ path }) => !['/admin', '/playoff'].includes(path))

	const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null)

	return (
		<AppBar position="static">
			<Container maxWidth="xl">
				<Toolbar disableGutters>
					<SportsSoccerTwoTone
						sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }}
					/>
					<Typography
						variant="h6"
						noWrap
						component={Link}
						to="/"
						sx={{
							mr: 2,
							display: { xs: 'none', md: 'flex' },
							fontFamily: 'monospace',
							fontWeight: 700,
							letterSpacing: '.3rem',
							color: 'inherit',
							textDecoration: 'none',
						}}
					>
						MS 2022
					</Typography>

					{user && (
						<Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
							<IconButton
								size="large"
								aria-label="account of current user"
								aria-controls="menu-appbar"
								aria-haspopup="true"
								onClick={({ currentTarget }) => setAnchorElNav(currentTarget)}
								color="inherit"
							>
								<MenuIcon />
							</IconButton>
							<Menu
								id="menu-appbar"
								anchorEl={anchorElNav}
								anchorOrigin={{
									vertical: 'bottom',
									horizontal: 'left',
								}}
								keepMounted
								transformOrigin={{
									vertical: 'top',
									horizontal: 'left',
								}}
								open={Boolean(anchorElNav)}
								onClose={() => setAnchorElNav(null)}
								sx={{
									display: { xs: 'block', md: 'none' },
								}}
							>
								{pages.map(({ title, path, icon }) => (
									<MenuItem
										key={title}
										onClick={() => {
											setAnchorElNav(null)
											navigate(path)
										}}
									>
										<ListItemIcon>{icon}</ListItemIcon>
										<Typography textAlign="center">{title}</Typography>
									</MenuItem>
								))}
							</Menu>
						</Box>
					)}
					<SportsSoccerTwoTone
						sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }}
					/>
					<Typography
						variant="h5"
						noWrap
						component={Link}
						to="/"
						sx={{
							mr: 2,
							display: { xs: 'flex', md: 'none' },
							flexGrow: 1,
							fontFamily: 'monospace',
							fontWeight: 700,
							letterSpacing: '.3rem',
							color: 'inherit',
							textDecoration: 'none',
						}}
					>
						MS 2022
					</Typography>
					<Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
						{user &&
							pages.map(({ title, path }) => (
								<Button
									key={title}
									onClick={() => navigate(path)}
									sx={{ my: 2, color: 'white', display: 'block' }}
								>
									{title}
								</Button>
							))}
					</Box>
					<AccountMenu />
				</Toolbar>
			</Container>
		</AppBar>
	)
}
