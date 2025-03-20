import { useAtom } from 'jotai'
import { useLocation } from 'react-router-dom'

import styles from './Sidebar.module.scss'
import {
	Button,
	Icon,
	Logo,
	Switch,
	Dropdown,
	Block,
	Text,
	Divider
} from '@/shared/ui'
import { NavLink } from 'react-router-dom'
import { themeAtom } from '@/shared/theme/store'
import { isAuthenticatedAtom, userAtom } from '@/features/auth/state'

const DEV = import.meta.env.DEV

export const Sidebar = () => {
	const [isAuthenticated] = useAtom(isAuthenticatedAtom)
	const [user] = useAtom(userAtom)
	const [theme, setTheme] = useAtom(themeAtom)
	const location = useLocation()

	const toggleTheme = () => {
		setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'))
	}

	const isDark = theme === 'dark'

	return (
		<div className={styles.sidebar}>
			<div className={styles.sidebarTop}>
				<NavLink to='/'>
					<Logo />
				</NavLink>
			</div>
			<div className={styles.sidebarBottom}>
				<NavLink
					to='/add-spot'
					className={styles.linkButton}
				>
					<Button square>
						<Icon name='plus' />
					</Button>
				</NavLink>
				<NavLink
					to={location.pathname === '/spots' ? '/' : '/spots'}
					className={styles.linkButton}
				>
					<Button square>
						<Icon name='list' />
					</Button>
				</NavLink>
				<Dropdown>
					<Button square>
						<Icon name='ellipsis' />
					</Button>
					<Block noPadding>
						<Block col>
							<Switch
								checked={isDark}
								onChange={toggleTheme}
								label='Night mode'
							/>
						</Block>
						{DEV && (
							<NavLink
								to='/ui-kit'
								className={styles.linkItem}
							>
								<Icon name='toolbox' />
								<Text>UI kit</Text>
							</NavLink>
						)}
						{location.pathname !== '/entry' && (
							<>
								<Divider />
								{isAuthenticated && (
									<NavLink
										to='/user'
										className={styles.linkItem}
									>
										<Icon name='user' />
										<Text>{user?.firstName}</Text>
									</NavLink>
								)}

								<NavLink
									to='/entry?logout'
									className={styles.linkItem}
								>
									<Icon name='door-open' />
									<Text>
										{isAuthenticated ? 'Log out' : 'Log in'}
									</Text>
								</NavLink>
							</>
						)}
					</Block>
				</Dropdown>
			</div>
		</div>
	)
}
