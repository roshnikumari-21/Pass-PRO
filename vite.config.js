import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()], // Add React plugin
  server: {
    port: 5173, // Specify the desired port
    strictPort: true, // Ensures the server doesn't switch to another port
  },
});
