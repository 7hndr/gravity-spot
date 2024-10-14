import { useEffect, useCallback, useRef, useState } from 'react'
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
	const updateTimeoutRef = useRef(null)

	const { pathname } = useLocation()
	const [lastPathname, setLastPathname] = useState(pathname)

	const updatePadding = useCallback(() => {
		if (!mapController.current.getInstance()) return

		const pageWithSidebar = SIDEBAR_PAGES.some(p =>
			lastPathname.includes(p)
		)

		mapController.current.setPadding(pageWithSidebar ? 400 : 0)
	}, [lastPathname])

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

			if (updateTimeoutRef.current) {
				clearTimeout(updateTimeoutRef.current)
			}

			updateTimeoutRef.current = setTimeout(() => {
				onLoaded(mapgl)
				updatePadding()
			}, 1024)
		}
	}, [theme, updatePadding, onLoaded])

	useEffect(() => {
		initMap()
	}, [initMap, theme])

	useEffect(() => {
		const timer = setTimeout(() => {
			setLastPathname(pathname)
		}, 100)

		return () => clearTimeout(timer)
	}, [pathname])

	return (
		<div
			id='mapgl'
			className={styles.mapgl}
		/>
	)
}
