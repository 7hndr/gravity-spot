import { useCallback, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { getCssVariableValue } from '@/shared/helpers'
import { themeAtom } from '@/shared/theme/store'
import { useAtomValue } from 'jotai'
const SPOTS_MAP_ID = 'spot-list'

export const useSpotMapLayer = ({ isSuccess, data = [], mapgl }) => {
	const navigate = useNavigate()
	const hoveredSpotIdRef = useRef(null)
	const theme = useAtomValue(themeAtom)
	const mapClickHandler = useCallback(
		e => {
			const features = mapgl.queryRenderedFeatures(e.point, {
				layers: [SPOTS_MAP_ID]
			})
			const feature = features?.[0]

			feature && navigate(`/spots/${feature.properties.id}`)
		},
		[mapgl, navigate]
	)

	const mapMoveHandler = useCallback(
		e => {
			mapgl.getCanvas().style.cursor = 'pointer'

			if (e.features.length > 0) {
				if (Number.isInteger(hoveredSpotIdRef.current)) {
					mapgl.setFeatureState(
						{
							source: SPOTS_MAP_ID,
							id: hoveredSpotIdRef.current
						},
						{ hover: true }
					)
				}

				hoveredSpotIdRef.current = e.features[0].id

				mapgl.setFeatureState(
					{ source: SPOTS_MAP_ID, id: hoveredSpotIdRef.current },
					{ hover: true }
				)
			}
		},
		[mapgl]
	)

	const mapLeaveHandler = useCallback(() => {
		mapgl.getCanvas().style.cursor = ''

		if (Number.isInteger(hoveredSpotIdRef.current)) {
			mapgl.setFeatureState(
				{ source: SPOTS_MAP_ID, id: hoveredSpotIdRef.current },
				{ hover: false }
			)
		}

		hoveredSpotIdRef.current = null
	}, [mapgl])

	const addSpotsLayer = useCallback(() => {
		const geojson = {
			type: 'FeatureCollection',

			features: data.map(spot => ({
				type: 'Feature',
				geometry: spot?.geom || null,
				properties: {
					id: spot._id,
					name: spot.name
				}
			}))
		}

		if (mapgl.getSource(SPOTS_MAP_ID)) {
			mapgl.getSource(SPOTS_MAP_ID).setData(geojson)
		} else {
			mapgl.addSource(SPOTS_MAP_ID, {
				type: 'geojson',
				data: geojson,
				generateId: true
			})
		}

		if (!mapgl.getLayer(SPOTS_MAP_ID)) {
			mapgl.addLayer({
				id: SPOTS_MAP_ID,
				type: 'circle',
				source: SPOTS_MAP_ID,
				paint: {
					'circle-radius': [
						'interpolate',
						['linear'],
						['zoom'],
						10,
						4,
						16,
						8,
						22,
						32
					],
					'circle-stroke-color': getCssVariableValue('text'),
					'circle-stroke-width': 2,
					'circle-color': [
						'case',
						['boolean', ['feature-state', 'hover'], false],
						getCssVariableValue('hover'),
						getCssVariableValue('accent')
					]
				}
			})

			mapgl.on('mousemove', SPOTS_MAP_ID, mapMoveHandler)
			mapgl.on('mouseleave', SPOTS_MAP_ID, mapLeaveHandler)
			mapgl.on('click', mapClickHandler)
		}
	}, [data, mapgl, mapClickHandler, mapMoveHandler, mapLeaveHandler])

	useEffect(() => {
		setTimeout(() => {
			if (data && mapgl) {
				addSpotsLayer()
			}
		}, 128)
	}, [isSuccess, data, mapgl, addSpotsLayer, theme])
}
