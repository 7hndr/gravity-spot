import mapboxgl from 'mapbox-gl'

const VITE_MAPBOX_TOKEN = import.meta.env.VITE_MAPBOX_TOKEN

const themeStylesConfig = {
	light: 'mapbox://styles/mapbox/navigation-day-v1',
	dark: 'mapbox://styles/mapbox/navigation-night-v1',
	spare: `https://api.mapbox.com/styles/v1/mapbox/cj3kbeqzo00022smj7akz3o1e?access_token=${VITE_MAPBOX_TOKEN}`
}

export class MapController {
	constructor({ container, initCoords, theme }) {
		this.theme = theme
		this.container = container
		this.initCoords = initCoords

		this.mapgl = null
	}

	init() {
		mapboxgl.accessToken = VITE_MAPBOX_TOKEN

		this.mapgl = new mapboxgl.Map({
			container: this.container,
			// projection: 'mercator',
			projection: 'globe',
			style: themeStylesConfig[this.theme] ?? themeStylesConfig.spare,
			zoom: 13,
			center: this.initCoords
		})

		if (import.meta.env.DEV) {
			window.mapgl = this.mapgl
		}

		return this.mapgl
	}

	flyTo = (...args) => this.mapgl.flyTo(...args)
}
