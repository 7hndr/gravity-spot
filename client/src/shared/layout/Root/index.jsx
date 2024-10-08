import { Outlet } from 'react-router-dom'
import styles from './Root.module.scss'
import { Sidebar } from '../'

export const Root = () => {
	return (
		<>
			<div className={styles.root}>
				{/* <div className={styles.card}>
					<Card />
				</div> */}
				<div className={styles.sidebar}>
					<Sidebar />
				</div>
				<div className={styles.content}>
					<Outlet />
				</div>
			</div>
		</>
	)
}
