import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/contactAPI": {
        target: "https://bigappleserver-a2c91f738c7f.herokuapp.com/",
        secure: true,
      },
      "/register": {
        target: "https://bigappleserver-a2c91f738c7f.herokuapp.com/",
        secure: true,
      },
      "/login": {
        target: "https://bigappleserver-a2c91f738c7f.herokuapp.com/",
        secure: true,
      },
      "/logout": {
        target: "https://bigappleserver-a2c91f738c7f.herokuapp.com/",
        secure: true,
      },
      "/getEstates": {
        target: "https://bigappleserver-a2c91f738c7f.herokuapp.com/",
        secure: true,
      },
      "/addEstate": {
        target: "https://bigappleserver-a2c91f738c7f.herokuapp.com/",
        secure: true,
      },
      "/checkLogin": {
        target: "https://bigappleserver-a2c91f738c7f.herokuapp.com/",
        secure: true,
      },
      "/updateEstate": {
        target: "https://bigappleserver-a2c91f738c7f.herokuapp.com/",
        secure: true,
      },
      "/deleteEstate": {
        target: "https://bigappleserver-a2c91f738c7f.herokuapp.com/",
        secure: true,
      },
      "/selectEstates": {
        target: "https://bigappleserver-a2c91f738c7f.herokuapp.com/",
        secure: true,
      },
      "/selectDropoffs": {
        target: "https://bigappleserver-a2c91f738c7f.herokuapp.com/",
        secure: true,
      },
      "/getDropoffs": {
        target: "https://bigappleserver-a2c91f738c7f.herokuapp.com/",
        secure: true,
      },
      "/addDropoff": {
        target: "https://bigappleserver-a2c91f738c7f.herokuapp.com/",
        secure: true,
      },
      "/updateDropoff": {
        target: "https://bigappleserver-a2c91f738c7f.herokuapp.com/",
        secure: true,
      },
      "/deleteDropoff": {
        target: "https://bigappleserver-a2c91f738c7f.herokuapp.com/",
        secure: true,
      },
      "/getTransfers": {
        target: "https://bigappleserver-a2c91f738c7f.herokuapp.com/",
        secure: true,
      },
      "/addTransfer": {
        target: "https://bigappleserver-a2c91f738c7f.herokuapp.com/",
        secure: true,
      },
      "/updateTransfer": {
        target: "https://bigappleserver-a2c91f738c7f.herokuapp.com/",
        secure: true,
      },
      "/deleteTransfer": {
        target: "https://bigappleserver-a2c91f738c7f.herokuapp.com/",
        secure: true,
      },
      "/confirmTransfer": {
        target: "https://bigappleserver-a2c91f738c7f.herokuapp.com/",
        secure: true,
      },
    },
  },
})

