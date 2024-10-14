import styles from './Error.module.scss'
import sad from '@/shared/assets/images/sad.svg'
import { Text } from '@/shared/ui'

export const Error = ({ error }) => (
	<div className={styles.iconWrapper}>
		<img
			src={sad}
			alt='Error'
		/>
		<Text>Error: {error.message}</Text>
	</div>
)
