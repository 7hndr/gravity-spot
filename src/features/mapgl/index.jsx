import { useEffect, useCallback, useRef } from 'react'
import { useLocation } from 'react-router-dom'
import { MapController } from './core'
import { useTheme } from '@/shared/hooks/useTheme'
import 'mapbox-gl/dist/mapbox-gl.css'
import styles from './Mapgl.module.scss'

const SIDEBAR_PAGES = ['spots', 'add-spot', 'spot']

export const Map = ({ onLoaded }) => {
	const { isDark } = useTheme()
	const mapController = useRef(null)

	const { pathname } = useLocation()

	const updatePadding = useCallback(() => {
		if (!mapController.current) return

		const pageWithSidebar = SIDEBAR_PAGES.some(p => pathname.includes(p))

		mapController.current.setPadding(pageWithSidebar ? 400 : 0)
	}, [pathname])

	const initMap = useCallback(async () => {
		if (!mapController.current) {
			mapController.current = new MapController({
				container: 'map',
				theme: isDark ? 'dark' : 'light'
			})

			const mapgl = await mapController.current.init()
			onLoaded(mapgl)
		} else {
			const theme = isDark ? 'dark' : 'light'

			mapController.current.updateTheme({
				theme
			})
		}

		updatePadding()
	}, [isDark, updatePadding, onLoaded])

	useEffect(() => {
		initMap()
	}, [initMap, pathname])

	return (
		<div
			id='map'
			className={styles.mapgl}
		/>
	)
}
