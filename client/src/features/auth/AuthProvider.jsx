import { useSetAtom } from 'jotai'
import { POST } from '@/shared/api'
import { deleteCookie, getCookie, setCookie } from '@/shared/helpers'
import { useState, createContext, useEffect, useCallback } from 'react'
import { isAuthenticatedAtom, userAtom } from './state'

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
	const setIsAuthenticated = useSetAtom(isAuthenticatedAtom)
	const setUser = useSetAtom(userAtom)
	const [token, setToken] = useState(null)

	const checkToken = useCallback(async () => {
		const coockieAccessToken = getCookie('accessToken')

		const clearAuthData = () => {
			setToken(null)
			deleteCookie('accessToken')
			deleteCookie('refreshToken')
			setIsAuthenticated(false)
			setUser(null)
		}

		if (coockieAccessToken) {
			try {
				const { accessToken, user } = await POST('users/refresh')

				if (accessToken && user) {
					setIsAuthenticated(true)
					setUser(user)
					setToken(accessToken)
					setCookie('accessToken', accessToken)
				} else {
					clearAuthData()
				}
			} catch (e) {
				clearAuthData()
				throw new Error(e)
			}
		} else {
			clearAuthData()
		}
	}, [setIsAuthenticated, setUser])

	useEffect(() => {
		checkToken()
	}, [checkToken])

	return (
		<AuthContext.Provider value={{ hasToken: token }}>
			{children}
		</AuthContext.Provider>
	)
}
