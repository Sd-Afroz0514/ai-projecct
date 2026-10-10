import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// Target backend URL: uses BACKEND_URL injected by Vercel services binding if available,
// falling back to local backend port 8000
const backendUrl = process.env.BACKEND_URL || 'http://127.0.0.1:8000';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    port: 3000,
    open: false,
    proxy: {
      '/api': {
        target: backendUrl,
        changeOrigin: true,
      },
    },
  },
});
