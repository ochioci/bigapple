import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/contactAPI": {
        target: "http://localhost:3001",
        secure: false,
      },
      "/register": {
        target: "http://localhost:3001",
        secure: false,
      },
      "/login": {
        target: "http://localhost:3001",
        secure: false,
      },
      "/logout": {
        target: "http://localhost:3001",
        secure: false,
      },
      "/getEstates": {
        target: "http://localhost:3001",
        secure: false,
      },
      "/addEstate": {
        target: "http://localhost:3001",
        secure: false,
      },
      "/checkLogin": {
        target: "http://localhost:3001",
        secure: false,
      },
      "/updateEstate": {
        target: "http://localhost:3001",
        secure: false,
      },
      "/deleteEstate": {
        target: "http://localhost:3001",
        secure: false,
      },
    },
  },
})

