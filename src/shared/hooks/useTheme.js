import { useContext } from 'react'
import { ThemeContext } from '@/shared/theme/ThemeProvider'

export const useTheme = () => {
	return useContext(ThemeContext)
}
