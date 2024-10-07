import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api/contactAPI": {
        target: "http://localhost:3001",
        secure: false,
      },
      "/api/register": {
        target: "http://localhost:3001",
        secure: false,
      },
      "/api/login": {
        target: "http://localhost:3001",
        secure: false,
      },
      "/api/logout": {
        target: "http://localhost:3001",
        secure: false,
      },
      "/api/getEstates": {
        target: "http://localhost:3001",
        secure: false,
      },
      "/api/addEstate": {
        target: "http://localhost:3001",
        secure: false,
      },
      "/api/checkLogin": {
        target: "http://localhost:3001",
        secure: false,
      },
      "/api/updateEstate": {
        target: "http://localhost:3001",
        secure: false,
      },
      "/api/deleteEstate": {
        target: "http://localhost:3001",
        secure: false,
      },
      "/api/selectEstates": {
        target: "http://localhost:3001",
        secure: false,
      },
      "/api/selectDropoffs": {
        target: "http://localhost:3001",
        secure: false,
      },
      "/api/getDropoffs": {
        target: "http://localhost:3001",
        secure: false,
      },
      "/api/addDropoff": {
        target: "http://localhost:3001",
        secure: false,
      },
      "/api/updateDropoff": {
        target: "http://localhost:3001",
        secure: false,
      },
      "/api/deleteDropoff": {
        target: "http://localhost:3001",
        secure: false,
      },
      "/api/getTransfers": {
        target: "http://localhost:3001",
        secure: false,
      },
      "/api/addTransfer": {
        target: "http://localhost:3001",
        secure: false,
      },
      "/api/updateTransfer": {
        target: "http://localhost:3001",
        secure: false,
      },
      "/api/deleteTransfer": {
        target: "http://localhost:3001",
        secure: false,
      },
      "/api/confirmTransfer": {
        target: "http://localhost:3001",
        secure: false,
      },
      "/api/getEstateAvailability": {
        target: "http://localhost:3001",
        secure: false,
      },
      "/api/addEstateAvailability": {
        target: "http://localhost:3001",
        secure: false,
      },
      "/api/updateEstateAvailability": {
        target: "http://localhost:3001",
        secure: false,
      },
      "/api/deleteEstateAvailability": {
        target: "http://localhost:3001",
        secure: false,
      },
      "/api/getAllAvailability": {
        target: "http://localhost:3001",
        secure: false,
      },
      "/api/bookAppointment": {
        target: "http://localhost:3001",
        secure: false,
      },
      "/api/getAppointments": {
        target: "http://localhost:3001",
        secure: false,
      },
      "/api/cancelAppointment": {
        target: "http://localhost:3001",
        secure: false,
      },
      "/api/getBookingRequests": {
        target: "http://localhost:3001",
        secure: false,
      },
      "/api/getWindow": {
        target: "http://localhost:3001",
        secure: false,
      },
      "/api/acceptBooking": {
        target: "http://localhost:3001",
        secure: false,
      },
      "/api/declineBooking": {
        target: "http://localhost:3001",
        secure: false,
      },
      "/api/getFullEstate": {
        target: "http://localhost:3001",
        secure: false,
      },
      "/api/getVolunteerInfo": {
        target: "http://localhost:3001",
        secure: false,
      }
    },
  },
})


