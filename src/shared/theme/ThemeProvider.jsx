import { useState, createContext } from 'react'

export const ThemeContext = createContext()

export const ThemeProvider = ({ children }) => {
	const [isDark, setIsDark] = useState(() => {
		const savedTheme = localStorage.getItem('theme')

		return savedTheme ? JSON.parse(savedTheme) : false
	})

	const toggleTheme = () => {
		setIsDark(prevIsDark => {
			const newIsDark = !prevIsDark
			localStorage.setItem('theme', JSON.stringify(newIsDark))

			return newIsDark
		})
	}

	return (
		<ThemeContext.Provider value={{ isDark, toggleTheme }}>
			<div
				className={isDark ? 'dark-theme' : 'light-theme'}
				id='App'
			>
				{children}
			</div>
		</ThemeContext.Provider>
	)
}
