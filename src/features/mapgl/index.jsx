import { useEffect, useCallback, useRef } from 'react'
import { MapController } from './core'
import { useTheme } from '@/shared/hooks/useTheme'
import 'mapbox-gl/dist/mapbox-gl.css'
import styles from './Mapgl.module.scss'
const DEFAULT_COORDS = [-74.0, 40.738]

export const Map = () => {
	const { isDark } = useTheme()
	const mapController = useRef(null)

	const initMap = useCallback(async () => {
		new Promise(resolve => {
			if ('geolocation' in navigator) {
				const geolocationTimeout = setTimeout(() => {
					console.warn('Geolocation request timed out')
					resolve(DEFAULT_COORDS)
				}, 1024)
				navigator.geolocation.getCurrentPosition(
					({ coords: { latitude: lat, longitude: lon } }) => {
						clearTimeout(geolocationTimeout)
						resolve([lon, lat])
					},
					() => {
						console.warn('Geolocation blocked')
						clearTimeout(geolocationTimeout)
						resolve(DEFAULT_COORDS)
					}
				)
			} else {
				resolve(DEFAULT_COORDS)
			}
		}).then(initCoords => {
			if (!mapController.current) {
				mapController.current = new MapController({
					container: 'map',
					theme: isDark ? 'dark' : 'light',
					initCoords
				})
				mapController.current.init()
			} else {
				mapController.current.updateTheme(isDark ? 'dark' : 'light')
			}
			if (
				initCoords[0] === DEFAULT_COORDS[0] &&
				initCoords[1] === DEFAULT_COORDS[1]
			) {
				navigator.geolocation.getCurrentPosition(
					({ coords: { latitude: lat, longitude: lon } }) => {
						mapController.current.flyTo({
							speed: 3,
							center: [lon, lat],
							essential: true
						})
					}
				)
			}
		})
	}, [isDark])

	useEffect(() => {
		initMap()
	}, [initMap])

	return (
		<div
			id='map'
			className={styles.mapgl}
		/>
	)
}
