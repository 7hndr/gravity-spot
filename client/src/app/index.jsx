// import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import { NotificationProvider } from '@/features/notifications/NotificationProvider'
import { AuthProvider } from '@/features/auth/AuthProvider'
import { ThemeProvider } from '@/shared/theme/ThemeProvider'
import { routeList } from './routes.jsx'

import '@/shared/styles/index.scss'

const router = createBrowserRouter(routeList)
const queryClient = new QueryClient()

createRoot(document.getElementById('root')).render(
	// <StrictMode>
	<ThemeProvider>
		<AuthProvider>
			<NotificationProvider>
				<QueryClientProvider client={queryClient}>
					<RouterProvider router={router} />
				</QueryClientProvider>
			</NotificationProvider>
		</AuthProvider>
	</ThemeProvider>
	// </StrictMode>
)
