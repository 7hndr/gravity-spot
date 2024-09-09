import styles from './Header.module.scss'
import { Switch } from '../../ui'
import { useTheme } from '../../hooks/useTheme'

export const Header = () => {
	const { isDark, toggleTheme } = useTheme()

	return (
		<div className={styles.header}>
			<Switch
				checked={isDark}
				onChange={toggleTheme}
			/>
		</div>
	)
}
