import { StrictMode } from 'react'
import { Provider } from 'react-redux'
import { createRoot } from 'react-dom/client'

import App from './App'
import { store } from './store'
import '../shared/styles/index.scss'

import { ThemeProvider } from '../providers/ThemeProvider'

createRoot(document.getElementById('root')).render(
	<StrictMode>
		<Provider store={store}>
			<ThemeProvider>
				<App />
			</ThemeProvider>
		</Provider>
	</StrictMode>
)
