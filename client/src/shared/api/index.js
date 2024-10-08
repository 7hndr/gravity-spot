export const GET = url => {
	return new Promise((resolve, reject) => {
		fetch(`http://localhost:666/api/${url}`, { method: 'GET' })
			.then(res => {
				if (res.ok) {
					resolve(res.json())
				} else {
					reject(new Error(res.statusText))
				}
			})
			.catch(err => reject(err))
	})
}

export const DELETE = url => {
	return new Promise((resolve, reject) => {
		fetch(`/api/${url}`, { method: 'DELETE' })
			.then(res => resolve(res.json()))
			.catch(err => reject(err))
	})
}

export const POST = (url, body) => {
	return new Promise((resolve, reject) => {
		fetch(`/api/${url}`, {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(body)
		})
			.then(res => resolve(res.json()))
			.catch(err => reject(err))
	})
}

export const PUT = (url, body) => {
	return new Promise((resolve, reject) => {
		fetch(`/api/${url}`, {
			method: 'PUT',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(body)
		})
			.then(res => resolve(res.json()))
			.catch(err => reject(err))
	})
}

export const PATCH = (url, body) => {
	return new Promise((resolve, reject) => {
		fetch(`/api/${url}`, {
			method: 'PATCH',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(body)
		})
			.then(res => resolve(res.json()))
			.catch(err => reject(err))
	})
}
