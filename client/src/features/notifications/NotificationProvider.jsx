import { useState, useCallback, createContext } from 'react'
import { Notification } from './Notification'
import styles from './NotificationWrapper.module.scss'

export const NotifyContext = createContext()

export const NotificationProvider = ({ children }) => {
	const [notifications, setNotifications] = useState([])

	const removeNotification = id => {
		setNotifications(prev => prev.filter(n => n.id !== id))
	}

	const addNotification = useCallback(
		({ message, title, duration, type }) => {
			const id = (+new Date()).toString(16)
			const newNotification = {
				id,
				message,
				title,
				duration,
				type,
				onClose: () => removeNotification(id)
			}
			setNotifications(prev => [...prev, newNotification])
		},
		[]
	)

	return (
		<NotifyContext.Provider value={addNotification}>
			{children}
			<div
				className={styles.notificationWrapper}
				id='notification-wrapper'
			>
				{notifications.map(n => (
					<Notification
						key={n.id}
						{...n}
					/>
				))}
			</div>
		</NotifyContext.Provider>
	)
}
