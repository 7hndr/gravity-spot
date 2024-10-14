import { useState, useContext, useEffect, useCallback } from 'react'
import { MapContext } from '@/pages/MainPage/index'
import { transformLngLatToGeom, loadMapIcon } from '@/shared/helpers'
import pinIcon from '@/shared/assets/images/pin.svg'

const NEW_SPOT_MAP_ID = 'new-spot'

export const useMapPin = (defaultValue = null) => {
	const [pickedPoint, setPickedPoint] = useState(defaultValue)
	const [isPickingPoint, setIsPickingPoint] = useState(false)
	const { mapgl } = useContext(MapContext)

	const addNewPointToMap = useCallback(
		point => {
			if (!mapgl || !point) return

			const geojson = {
				type: 'FeatureCollection',
				features: [{ type: 'Feature', geometry: point }]
			}
			const iconName = 'pin-icon'

			if (!mapgl.hasImage(iconName)) {
				loadMapIcon(mapgl, {
					name: iconName,
					url: pinIcon
				})
			}

			if (!mapgl.getSource(NEW_SPOT_MAP_ID)) {
				mapgl.addSource(NEW_SPOT_MAP_ID, {
					type: 'geojson',
					data: geojson
				})
			} else {
				mapgl.getSource(NEW_SPOT_MAP_ID).setData(geojson)
			}

			if (!mapgl.getLayer(NEW_SPOT_MAP_ID)) {
				mapgl.addLayer({
					id: NEW_SPOT_MAP_ID,
					type: 'symbol',
					source: NEW_SPOT_MAP_ID,
					layout: {
						'icon-image': iconName,
						'icon-size': [
							'interpolate',
							['linear'],
							['zoom'],
							10,
							0.25,
							15,
							0.5,
							22,
							1
						],
						'icon-anchor': 'bottom',
						'icon-allow-overlap': true
					}
				})
			}
		},
		[mapgl]
	)

	const handleMapClick = useCallback(
		e => {
			const newPoint = transformLngLatToGeom(e.lngLat)
			setPickedPoint(newPoint)
			setIsPickingPoint(false)
			mapgl.getCanvas().style.cursor = ''
			addNewPointToMap(newPoint)
		},
		[addNewPointToMap, mapgl]
	)

	const pickPointHandler = () => {
		setIsPickingPoint(true)

		mapgl.getCanvas().style.cursor = 'pointer'

		mapgl.once('click', handleMapClick)
	}

	useEffect(() => {
		return () => {
			if (mapgl && !mapgl._removed) {
				mapgl.off('click', handleMapClick)
				mapgl.getLayer(NEW_SPOT_MAP_ID) &&
					mapgl.removeLayer(NEW_SPOT_MAP_ID)
				mapgl.getSource(NEW_SPOT_MAP_ID) &&
					mapgl.removeSource(NEW_SPOT_MAP_ID)
			}
		}
	}, [handleMapClick, mapgl])

	return { pickedPoint, isPickingPoint, pickPointHandler }
}
