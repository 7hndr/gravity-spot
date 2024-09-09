import { routeList } from './routes.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

function App() {
	const router = createBrowserRouter(routeList)
	return <RouterProvider router={router} />
}

export default App
