import { useEffect, useState } from 'react'
import ReactDOM from 'react-dom'
import styles from './Notification.module.scss'

export const Notification = ({
	message,
	title = 'Notification',
	duration = 3000,
	type = 'default',
	onClose
}) => {
	const [visible, setVisible] = useState(false)

	useEffect(() => {
		const showTimeout = setTimeout(() => {
			setVisible(true)
		}, 10)

		const hideTimeout = setTimeout(() => {
			setVisible(false)
			setTimeout(() => {
				onClose()
			}, 300)
		}, duration)

		return () => {
			clearTimeout(showTimeout)
			clearTimeout(hideTimeout)
		}
	}, [duration, onClose])

	return ReactDOM.createPortal(
		<div
			className={`${styles.notificationBody} ${
				visible ? styles.show : styles.hide
			}`}
		>
			<div className={`${styles.title} ${styles[type]}`}>{title}</div>
			<p className={styles.message}>{message}</p>
		</div>,
		document.getElementById('notification-wrapper')
	)
}
