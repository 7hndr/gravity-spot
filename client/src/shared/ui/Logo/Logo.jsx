import logoLight from '@/shared/assets/images/logo/GravitySpot_logo_light.svg'
import logoDark from '@/shared/assets/images/logo/GravitySpot_logo_dark.svg'
import styles from './Logo.module.scss'
import { useAtom } from 'jotai'
import { themeAtom } from '@/shared/theme/store'

export const Logo = () => {
	const [theme] = useAtom(themeAtom)

	return (
		<img
			src={theme === 'dark' ? logoLight : logoDark}
			alt='logo'
			className={styles.logoImg}
		/>
	)
}
