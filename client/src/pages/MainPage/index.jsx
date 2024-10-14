import { Map } from '@/features/mapgl'
import { Outlet, useOutlet } from 'react-router-dom'
import { AirCard } from '@/shared/components/AirCard'
import styles from './MainPage.module.scss'
import { useState, createContext, useCallback } from 'react'
import { useSpotMapLayer } from './useSpotMapLayer'
import { GET } from '@/shared/api'
import { useQuery } from '@tanstack/react-query'
import { Loader } from '@/shared/components/Loader'
import { Switch } from '@/shared/ui'

export const MapContext = createContext()

const SPOTS_MAP_ID = 'spot-list'
const HEATMAP_LAYER_ID = 'heatmap-layer'

export const MainPage = () => {
	const [mapgl, setMapgl] = useState(null)
	const [isHeatmapEnabled, setIsHeatmapEnabled] = useState(false)
	const outlet = useOutlet()

	const { data, isLoading, isSuccess } = useQuery({
		queryKey: ['spotList'],
		queryFn: () => GET('spots')
	})

	useSpotMapLayer({ isSuccess, data, mapgl })

	const toggleHeatmap = useCallback(() => {
		if (mapgl) {
			if (!isHeatmapEnabled) {
				mapgl.addLayer({
					id: HEATMAP_LAYER_ID,
					type: 'heatmap',
					source: SPOTS_MAP_ID,
					paint: {
						'heatmap-weight': 1,
						'heatmap-intensity': 1,
						'heatmap-color': [
							'interpolate',
							['linear'],
							['heatmap-density'],
							0,
							'rgba(0, 162, 255, 0.25)',
							0.2,
							'rgb(0, 162, 255)',
							0.4,
							'rgb(0, 255, 221)',
							0.6,
							'rgb(0, 255, 85)',
							0.8,
							'rgba(236, 233, 14, 1)',
							1,
							'rgba(255, 0, 21, 1)'
						],
						'heatmap-radius': [
							'interpolate',
							['linear'],
							['zoom'],
							10,
							2,
							13,
							64,
							15,
							128,
							22,
							256
						]
					}
				})
			} else {
				mapgl.removeLayer(HEATMAP_LAYER_ID)
			}

			setIsHeatmapEnabled(!isHeatmapEnabled)
		}
	}, [mapgl, isHeatmapEnabled])

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
			<div className={styles.mapActions}>
				<Switch
					label='Heatmap'
					onChange={toggleHeatmap}
				/>
			</div>
		</div>
	)
}
