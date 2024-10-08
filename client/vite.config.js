import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
	css: {
		preprocessorOptions: {
			scss: {
				api: 'modern-compiler' // or "modern"
			}
		}
	},
	resolve: {
		alias: [
			// eslint-disable-next-line no-undef
			{ find: '@', replacement: path.resolve(__dirname, 'src') }
		]
	},
	plugins: [react()]
})
