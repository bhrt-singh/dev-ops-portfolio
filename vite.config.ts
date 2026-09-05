import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

export default defineConfig({
  base: '/dev-ops-portfolio/',
  plugins: [react()],
})
