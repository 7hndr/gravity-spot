import { useContext } from 'react'
import { NotifyContext } from '@/features/notifications/NotificationProvider'

export const useNotification = () => {
	return useContext(NotifyContext)
}
