import styles from './Loader.module.scss'
import loader from '@/shared/assets/images/loader.svg'
import { Text } from '@/shared/ui'

export const Loader = ({ className = '' }) => (
	<div className={`${styles.iconWrapper} ${className}`}>
		<img
			src={loader}
			alt='Loading...'
		/>
		<Text>Loading...</Text>
	</div>
)
