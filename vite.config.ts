import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    server: {
        proxy: {
            '/media': {
                target: 'https://darzonktt5ywx.cloudfront.net',
                changeOrigin: true,
                secure: true
            }
        }
    }
})
