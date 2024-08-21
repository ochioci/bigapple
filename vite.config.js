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
      "/selectEstates": {
        target: "http://localhost:3001",
        secure: false,
      },
      "/selectDropoffs": {
        target: "http://localhost:3001",
        secure: false,
      },
      "/getDropoffs": {
        target: "http://localhost:3001",
        secure: false,
      },
      "/addDropoff": {
        target: "http://localhost:3001",
        secure: false,
      },
      "/updateDropoff": {
        target: "http://localhost:3001",
        secure: false,
      },
      "/deleteDropoff": {
        target: "http://localhost:3001",
        secure: false,
      },
      "/getTransfers": {
        target: "http://localhost:3001",
        secure: false,
      },
      "/addTransfer": {
        target: "http://localhost:3001",
        secure: false,
      },
      "/updateTransfer": {
        target: "http://localhost:3001",
        secure: false,
      },
      "/deleteTransfer": {
        target: "http://localhost:3001",
        secure: false,
      },
      "/confirmTransfer": {
        target: "http://localhost:3001",
        secure: false,
      },
    },
  },
})

