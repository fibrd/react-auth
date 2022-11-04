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
	TableView,
	Scoreboard,
	SportsSoccerTwoTone,
	TipsAndUpdates,
	Schedule,
	Groups,
} from '@mui/icons-material'
import * as React from 'react'
import { AccountMenu } from './AccountMenu'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

const PAGES = [
	{
		title: 'Program',
		path: '/program',
		icon: <Schedule fontSize="small" />,
	},
	{
		title: 'Moje tipy',
		path: '/moje-tipy',
		icon: <TipsAndUpdates fontSize="small" />,
	},
	{
		title: 'Skupiny',
		path: '/skupiny',
		icon: <Groups fontSize="small" />,
	},
	{
		title: 'Výsledky',
		path: '/vysledky',
		icon: <Scoreboard fontSize="small" />,
	},
]

export function AppMenu() {
	const navigate = useNavigate()
	const { user } = useAuth()

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
								{PAGES.map(({ title, path, icon }) => (
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
							PAGES.map(({ title, path }) => (
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
