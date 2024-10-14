export * from './cookies'

export const debounce = (cb, d) => {
	let t

	return function (...args) {
		clearTimeout(t)

		const ctx = this

		t = setTimeout(() => {
			cb.call(ctx, ...args)
		}, d)
	}
}

export const sortByField = (array, field) => {
	return [...array].sort((a, b) => {
		switch (typeof a[field]) {
			case 'string':
				return a[field].localeCompare(b[field], 'en')

			default:
				return a > b
		}
	})
}

export const parseTimeStampToDate = ts => {
	if (!ts) return '—'

	return new Intl.DateTimeFormat('ru-RU', {
		year: '2-digit',
		month: '2-digit',
		day: '2-digit',
		hour: '2-digit',
		minute: '2-digit'
	}).format(new Date(ts))
}

export const getCurrentIsoDateTime = date => {
	if (!date) return '—'

	let year = date.getFullYear()
	let month = String(date.getMonth() + 1).padStart(2, '0')
	let day = String(date.getDate()).padStart(2, '0')
	let hours = String(date.getHours()).padStart(2, '0')
	let minutes = String(date.getMinutes()).padStart(2, '0')
	let seconds = String(date.getSeconds()).padStart(2, '0')

	let formattedDate = `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`

	return formattedDate
}

export const formatDate = date => {
	if (!date) return '—'

	return date.toLocaleDateString('en-GB', {
		month: 'short',
		day: 'numeric',
		weekday: 'long'
	})
}

export const transformLngLatToGeom = lngLat => {
	return {
		type: 'Point',
		coordinates: [lngLat.lng, lngLat.lat]
	}
}

export const loadMapIcon = (mapgl, icon) => {
	if (!mapgl || mapgl._removed) return

	const MAP_ICON_SIZE = 64

	const addImageToMap = (name, image, sdf) => {
		if (mapgl && !mapgl._removed && !mapgl.hasImage(name)) {
			mapgl.addImage(name, image, { sdf })
		}
	}

	return new Promise(resolve => {
		const size = icon.size ?? MAP_ICON_SIZE
		const image = new Image(size, size)
		image.crossOrigin = 'Anonymous'

		image.addEventListener('load', () => {
			addImageToMap(icon.name, image, icon.sdf)
			resolve()
		})

		image.src = icon.url
	})
}

export const getCssVariableValue = cssVariableName => {
	return (
		getComputedStyle(document.getElementById('App'))
			.getPropertyValue(`--${cssVariableName}`)
			.trim() || '#000000'
	)
}
