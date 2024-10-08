import { Map } from '@/features/mapgl'
import { Outlet, useOutlet } from 'react-router-dom'
import { AirCard } from '@/shared/components/AirCard'
import styles from './MainPage.module.scss'
import { useState, createContext } from 'react'

export const MapContext = createContext()

export const MainPage = () => {
	const [mapgl, setMapgl] = useState(null)
	const outlet = useOutlet()

	return (
		<div className={styles.MainPage}>
			{outlet && (
				<MapContext.Provider value={{ mapgl }}>
					<AirCard>
						<Outlet />
					</AirCard>
				</MapContext.Provider>
			)}
			<Map onLoaded={setMapgl} />
		</div>
	)
}
