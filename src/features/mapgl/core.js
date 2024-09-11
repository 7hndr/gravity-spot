import mapboxgl from 'mapbox-gl'

const VITE_MAPBOX_TOKEN = import.meta.env.VITE_MAPBOX_TOKEN

const themeStylesConfig = {
	light: 'mapbox://styles/mapbox/light-v11',
	dark: 'mapbox://styles/thndr-/cm0wy94nv00y901pbdmdj3f24',
	spare: `https://api.mapbox.com/styles/v1/mapbox/cj3kbeqzo00022smj7akz3o1e?access_token=${VITE_MAPBOX_TOKEN}`
}

export class MapController {
	constructor({ container, initCoords, theme }) {
		this.theme = theme
		this.container = container
		this.initCoords = initCoords
		this.updateTheme = this.updateTheme.bind(this)
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

	updateTheme(theme) {
		this.mapgl.setStyle(themeStylesConfig[theme] ?? themeStylesConfig.spare)
	}

	// flyTo = (...args) => this.mapgl.flyTo(...args)
}
