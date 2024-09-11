import logoLight from '@/shared/assets/images/logo/GravitySpot_logo_light.svg'
import logoDark from '@/shared/assets/images/logo/GravitySpot_logo_dark.svg'
import styles from './Logo.module.scss'
import { useTheme } from '@/shared/hooks/useTheme'

export const Logo = () => {
	const { isDark } = useTheme()

	return (
		<img
			src={isDark ? logoLight : logoDark}
			alt='logo'
			className={styles.logoImg}
		/>
	)
}
