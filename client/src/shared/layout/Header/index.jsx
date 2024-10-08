import styles from './Header.module.scss'
import { Switch } from '@/shared/ui'
import { useTheme } from '@/shared/hooks/useTheme'

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
