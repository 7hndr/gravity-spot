export const getCookie = name => {
	const matches = document.cookie.match(
		new RegExp(
			'(?:^|; )' +
				name.replace(/([.$?*|{}()[\]\\/+^])/g, '\\$1') +
				'=([^;]*)'
		)
	)

	return matches ? decodeURIComponent(matches[1]) : undefined
}

export const setCookie = (name, value, days = 1) => {
	const d = new Date()
	d.setTime(d.getTime() + days * 24 * 60 * 60 * 1000)
	const expires = 'expires=' + d.toUTCString()

	document.cookie = name + '=' + value + ';' + expires + ';path=/'
}

export const deleteCookie = name => setCookie(name, '', -1)
