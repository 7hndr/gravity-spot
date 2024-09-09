import styles from './Sidebar.module.scss'
import { Icon } from '../../ui'

export const Sidebar = () => {
	return (
		<div className={styles.sidebar}>
			<Icon name='user' />
		</div>
	)
}
