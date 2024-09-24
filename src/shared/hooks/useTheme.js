import { useContext } from 'react'
import { ThemeContext } from '@/features/theme/ThemeProvider'

export const useTheme = () => {
	return useContext(ThemeContext)
}
