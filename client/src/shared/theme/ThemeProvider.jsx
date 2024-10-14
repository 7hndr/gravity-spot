import { useAtom } from 'jotai'
import { themeAtom } from './store'

export const ThemeProvider = ({ children }) => {
	const [theme] = useAtom(themeAtom)

	return (
		<div
			className={`${theme}-theme`}
			id='App'
		>
			{children}
		</div>
	)
}
