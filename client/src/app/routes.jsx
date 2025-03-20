import { redirect } from 'react-router-dom'

import { Root } from '@/shared/layout'
import {
	DashboardPage,
	NotFoundPage,
	SpotListPage,
	UserListPage,
	AddSpotPage,
	EntryPage,
	UiKitPage,
	MainPage,
	SpotPage,
	UserPage
} from '@/pages'
import { getCookie } from '@/shared/helpers'

const loader = () => {
	if (!getCookie('accessToken')) {
		throw redirect('/entry')
	}

	return null
}

export const routeList = [
	{
		path: '/',
		element: <Root />,
		children: [
			{ path: '*', element: <NotFoundPage /> },
			{
				name: 'Map',
				path: '/',
				element: <MainPage />,

				children: [
					{
						name: 'Spots',
						path: '/spots',
						element: <SpotListPage />
					},
					{
						name: 'Spot card',
						path: '/spots/:id',
						protected: true,
						element: <SpotPage />
					},
					{
						name: 'Add a spot',
						loader,
						path: '/add-spot',
						element: <AddSpotPage />
					}
				]
			},
			{
				name: 'User list',
				path: '/user-list',
				loader,
				element: <UserListPage />
			},
			{
				name: 'User page',
				path: '/user',
				loader,
				element: <UserPage />
			},
			{
				name: 'Dashboard',
				path: '/dashboard',
				loader,
				element: <DashboardPage />
			},
			{
				name: 'UI kit',
				path: '/ui-kit',
				element: <UiKitPage />,
				hidden: true
			},
			{
				name: 'Auth',
				path: '/entry',
				element: <EntryPage />
			}
		]
	}
]
