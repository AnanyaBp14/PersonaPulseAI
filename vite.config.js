import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  resolve: {
    // This forces Vite to merge the duplicate Amplify instances into one!
    dedupe: ['aws-amplify', '@aws-amplify/ui-react']
  }
});