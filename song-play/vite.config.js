import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
const SERVER_PORT = 8090
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: `http://localhost:${SERVER_PORT}`,
        changeOrigin: true,
      },
    },
  },
});
//redirceting our front end to be served by the backend endpoint 
//instead of the vite port thats given in the front end
