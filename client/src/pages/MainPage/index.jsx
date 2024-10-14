import { Map } from '@/features/mapgl'
import { Outlet, useOutlet } from 'react-router-dom'
import { AirCard } from '@/shared/components/AirCard'
import styles from './MainPage.module.scss'
import { useState, createContext } from 'react'
import { useSpotMapLayer } from './useSpotMapLayer'
import { GET } from '@/shared/api'
import { useQuery } from '@tanstack/react-query'
import { Loader } from '@/shared/components/Loader'

export const MapContext = createContext()

export const MainPage = () => {
	const [mapgl, setMapgl] = useState(null)
	const outlet = useOutlet()

	const { data, isLoading, isSuccess } = useQuery({
		queryKey: ['spotList'],
		queryFn: () => GET('spots')
	})

	useSpotMapLayer({ isSuccess, data, mapgl })

	return (
		<div className={styles.MainPage}>
			{outlet && (
				<MapContext.Provider value={{ mapgl }}>
					<AirCard>
						<Outlet />
					</AirCard>
				</MapContext.Provider>
			)}
			{isLoading && <Loader className={styles.loader} />}
			<Map onLoaded={setMapgl} />
		</div>
	)
}
