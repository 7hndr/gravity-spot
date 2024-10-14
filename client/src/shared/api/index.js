import axios from 'axios'
import { getCookie, deleteCookie } from '@/shared/helpers'

const VITE_HOST = import.meta.env.VITE_HOST || ''
const VITE_DEV_HOST = import.meta.env.VITE_DEV_HOST
const DEV = import.meta.env.DEV
const BASE_URL = DEV ? `${VITE_DEV_HOST}/api` : `${VITE_HOST}/api`

const api = axios.create({
	baseURL: BASE_URL,
	withCredentials: true
})

api.interceptors.request.use(config => {
	const token = getCookie('accessToken')

	if (token) {
		config.headers.Authorization = `Bearer ${token}`
	}

	return config
})

api.interceptors.response.use(
	response => response.data,
	error => {
		if (error.response && error.response.status === 401) {
			deleteCookie('accessToken')
			// window.location.href = '/entry';
		}

		return Promise.reject(error)
	}
)

export const GET = url => api.get(url)

export const DELETE = url => api.delete(url)

export const POST = (url, body, headers) =>
	api.post(url, body, { headers, withCredentials: true })

export const PUT = (url, body) => api.put(url, body, { withCredentials: true })
