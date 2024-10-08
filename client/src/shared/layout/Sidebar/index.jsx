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
import { useNavigate, useLocation, NavLink } from 'react-router-dom'
import { useTheme } from '@/shared/hooks/useTheme'

export const Sidebar = () => {
	const { isDark, toggleTheme } = useTheme()
	const navigate = useNavigate()
	const location = useLocation()

	const goTo = path => {
		const _path = path.replace('/', '')

		if (location.pathname !== `/${_path}`) {
			navigate(`/${_path}`)
		} else {
			navigate('/')
		}
	}

	return (
		<div className={styles.sidebar}>
			<div className={styles.sidebarTop}>
				<NavLink to='/'>
					<Logo />
				</NavLink>
			</div>
			<div className={styles.sidebarBottom}>
				<Button
					onClick={() => goTo('add-spot')}
					square
				>
					<Icon name='plus' />
				</Button>
				<Button
					onClick={() => goTo('spots')}
					square
				>
					<Icon name='list' />
				</Button>
				<Dropdown className='my-dropdown'>
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
						<Divider />

						<NavLink
							to='/user'
							className={styles.linkItem}
						>
							<Icon name='user' />
							<Text>User</Text>
						</NavLink>
						<NavLink
							to='/ui-kit'
							className={styles.linkItem}
						>
							<Icon name='toolbox' />
							<Text>UI kit</Text>
						</NavLink>
						<NavLink
							to='/entry?logout'
							className={styles.linkItem}
						>
							<Icon name='door-open' />
							<Text>Log out</Text>
						</NavLink>
					</Block>
				</Dropdown>
			</div>
		</div>
	)
}
