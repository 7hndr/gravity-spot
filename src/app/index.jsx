import { StrictMode } from 'react'
import { Provider } from 'react-redux'
import { createRoot } from 'react-dom/client'
import { NotificationProvider } from '@/features/notifications/NotificationProvider'
import { ThemeProvider } from '@/features/theme/ThemeProvider'

import App from './App'
import { store } from './store'
import '@/shared/styles/index.scss'

createRoot(document.getElementById('root')).render(
	<StrictMode>
		<Provider store={store}>
			<ThemeProvider>
				<NotificationProvider>
					<App />
				</NotificationProvider>
			</ThemeProvider>
		</Provider>
	</StrictMode>
)
