const VITE_HOST = import.meta.env.VITE_HOST
const VITE_DEV_HOST = import.meta.env.VITE_DEV_HOST
const DEV = import.meta.env.DEV
import { getCookie, deleteCookie } from '@/shared/helpers'
const BASE_URL = DEV ? `${VITE_DEV_HOST}/api` : `${VITE_HOST}/api`

const getHeaders = () => {
	const token = getCookie('accessToken')

	const headers = {
		Accept: 'application/json',
		'Content-Type': 'application/json'
	}

	token && (headers.Authorization = `Bearer ${token}`)

	return headers
}

const checkResponse = ({ response, resolve, reject }) => {
	if (response.status === 401) {
		deleteCookie('accessToken')
		// window.location.href = '/entry'
	}

	if (response.ok) {
		resolve(response.json())
	} else {
		reject(new Error(response.statusText))
	}
}

export const GET = url => {
	return new Promise((resolve, reject) => {
		fetch(`${BASE_URL}/${url}`, { method: 'GET', headers: getHeaders() })
			.then(response => checkResponse({ response, resolve, reject }))
			.catch(err => reject(err))
	})
}

export const DELETE = url => {
	return new Promise((resolve, reject) => {
		fetch(`${BASE_URL}/${url}`, { method: 'DELETE', headers: getHeaders() })
			.then(response => checkResponse({ response, resolve, reject }))
			.catch(err => reject(err))
	})
}

export const POST = (url, body) => {
	return new Promise((resolve, reject) => {
		fetch(`${BASE_URL}/${url}`, {
			method: 'POST',
			headers: getHeaders(),
			body: JSON.stringify(body),
			credentials: 'include'
		})
			.then(response => checkResponse({ response, resolve, reject }))
			.catch(err => reject(err))
	})
}

export const PUT = (url, body) => {
	return new Promise((resolve, reject) => {
		fetch(`${BASE_URL}/${url}`, {
			method: 'PUT',
			headers: getHeaders(),
			body: JSON.stringify(body)
		})
			.then(response => checkResponse({ response, resolve, reject }))
			.catch(err => reject(err))
	})
}
