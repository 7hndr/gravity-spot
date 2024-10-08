import { getCookie } from '@/shared/helpers'
import { useState, createContext, useEffect } from 'react'
// import { useNavigate } from 'react-router-dom'

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
	// const navigate = useNavigate()
	const [token, setToken] = useState(null)

	useEffect(() => {
		setToken(getCookie('token'))

		// if (!token) navigate('/')
	}, [])

	return (
		<AuthContext.Provider value={{ hasToken: token }}>
			{children}
		</AuthContext.Provider>
	)
}
