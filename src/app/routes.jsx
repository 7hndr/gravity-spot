import { Navigate } from 'react-router-dom'

import { Root } from '@/shared/layout'
import { MainPage, NotFoundPage, EntryPage, ServicePage } from '@/pages'

export const routeList = [
	{
		path: '/',
		element: <Root />,
		children: [
			{ path: '*', element: <NotFoundPage /> },
			{
				index: true,
				element: (
					<Navigate
						to='/home'
						replace={true}
					/>
				)
			},
			{ name: 'Home', path: '/home', element: <MainPage /> },
			{
				name: 'Service page',
				path: '/service',
				element: <ServicePage />
			},
			{
				name: 'Auth',
				path: '/entry',
				element: <EntryPage />
			}
		]
	}
]
