import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import { NotificationProvider } from '@/features/notifications/NotificationProvider'
import { AuthProvider } from '@/features/auth/AuthProvider'
import { ThemeProvider } from '@/shared/theme/ThemeProvider'
import { routeList } from './routes.jsx'

import '@/shared/styles/index.scss'

// eslint-disable-next-line react-refresh/only-export-components
const DEV = import.meta.env.DEV

const filterHiddenRoutes = routes => {
	return routes.reduce((acc, route) => {
		if (!route.hidden || DEV) {
			if (route.children?.length) {
				acc.push({
					...route,
					children: filterHiddenRoutes(route.children)
				})
			} else {
				acc.push(route)
			}
		}

		return acc
	}, [])
}

const router = createBrowserRouter(filterHiddenRoutes(routeList))
const queryClient = new QueryClient()

createRoot(document.getElementById('root')).render(
	<ThemeProvider>
		<AuthProvider>
			<NotificationProvider>
				<QueryClientProvider client={queryClient}>
					<RouterProvider router={router} />
				</QueryClientProvider>
			</NotificationProvider>
		</AuthProvider>
	</ThemeProvider>
)
