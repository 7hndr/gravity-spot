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
import { useTheme } from '@/shared/hooks/useTheme'

export const Sidebar = () => {
	const { isDark, toggleTheme } = useTheme()

	return (
		<div className={styles.sidebar}>
			<div className={styles.sidebarTop}>
				<Logo />
			</div>
			<div className={styles.sidebarBottom}>
				<Button
					onClick={() => null}
					square
				>
					<Icon name='plus' />
				</Button>
				<Dropdown className='my-dropdown'>
					<Button>
						<Icon name='ellipsis' />
					</Button>
					<Block>
						<Block col>
							<Switch
								checked={isDark}
								onChange={toggleTheme}
							/>
							<Text>Night mode</Text>
						</Block>
						<Divider />
						<Block
							col
							aic
						>
							<Icon name='user' />
							<Text>User settings</Text>
						</Block>
					</Block>
				</Dropdown>
			</div>
		</div>
	)
}
