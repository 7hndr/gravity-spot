import mapboxgl from 'mapbox-gl'

const VITE_MAPBOX_TOKEN = import.meta.env.VITE_MAPBOX_TOKEN

const DEFAULT_COORDS = [-74.0, 40.738]

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
		this.offset = 0
		this.userCoordsDelay = 1024
	}

	async init() {
		mapboxgl.accessToken = VITE_MAPBOX_TOKEN

		this.initCoords = await this.defineInitialCoords()

		if (!document.getElementById(this.container)) return

		this.mapgl = new mapboxgl.Map({
			container: this.container,
			language: 'auto',
			logoPosition: 'bottom-right',
			// projection: 'mercator',
			projection: 'globe',
			style: themeStylesConfig[this.theme] ?? themeStylesConfig.spare,
			zoom: 15,
			center: this.initCoords
		})

		if (import.meta.env.DEV) {
			window.mapgl = this.mapgl
		}

		if (
			this.initCoords[0] === DEFAULT_COORDS[0] &&
			this.initCoords[1] === DEFAULT_COORDS[1]
		) {
			navigator.geolocation.getCurrentPosition(
				({ coords: { latitude: lat, longitude: lon } }) => {
					this.mapgl.flyTo({
						speed: 3,
						center: [lon, lat],
						padding: { left: 400 },
						essential: true
					})
				}
			)
		}

		return this.mapgl
	}

	updateTheme({ theme }) {
		if (this.theme === theme) return

		this.theme = theme
		this.mapgl?.setStyle(
			themeStylesConfig[theme] ?? themeStylesConfig.spare
		)
	}

	setPadding(left = 0) {
		if (this.offset === left) return

		const padding = { left }

		if (this.mapgl) {
			this.mapgl?.easeTo({
				padding,
				duration: this.userCoordsDelay
			})
			this.offset = left
		}
	}

	async defineInitialCoords() {
		return new Promise(resolve => {
			if ('geolocation' in navigator) {
				const geolocationTimeout = setTimeout(() => {
					console.warn('Geolocation request timed out')
					resolve(DEFAULT_COORDS)
				}, this.userCoordsDelay)
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
		})
	}
}
