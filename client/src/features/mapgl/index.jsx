import { useEffect, useCallback, useRef } from 'react'
import { useLocation } from 'react-router-dom'
import { MapController } from './core'
import { useAtomValue } from 'jotai'
import { themeAtom } from '@/shared/theme/store'
import 'mapbox-gl/dist/mapbox-gl.css'
import styles from './Mapgl.module.scss'

const SIDEBAR_PAGES = ['spots', 'add-spot', 'spot']

export const Map = ({ onLoaded }) => {
	const theme = useAtomValue(themeAtom)
	const mapController = useRef(null)

	const { pathname } = useLocation()

	const updatePadding = useCallback(() => {
		if (!mapController.current.getInstance()) return

		const pageWithSidebar = SIDEBAR_PAGES.some(p => pathname.includes(p))

		mapController.current.setPadding(pageWithSidebar ? 400 : 0)
	}, [pathname])

	const initMap = useCallback(async () => {
		if (!mapController.current?.getInstance()) {
			mapController.current = new MapController({ theme })
			const mapgl = await mapController.current.init()

			onLoaded(mapgl)
			updatePadding()
		} else {
			if (!mapController.current?.mapgl?._loaded) {
				onLoaded(null)
			} else {
				onLoaded(mapController.current.getInstance())
				updatePadding()
			}

			const mapgl = await mapController.current.updateTheme({ theme })
			setTimeout(() => {
				onLoaded(mapgl)

				updatePadding()
			}, 1111)
		}

		updatePadding()
	}, [theme, updatePadding, onLoaded])

	useEffect(() => {
		initMap()
	}, [initMap, pathname, theme])

	return (
		<div
			id='mapgl'
			className={styles.mapgl}
		/>
	)
}
