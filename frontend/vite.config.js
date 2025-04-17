import { defineConfig } from 'vite'; // ✅ This is missing!
import react from '@vitejs/plugin-react';
import { viteStaticCopy } from 'vite-plugin-static-copy';

export default defineConfig({
  plugins: [
    react(),
    viteStaticCopy({
      targets: [
        { src: 'public/manifest.json', dest: '.' },
        { src: 'public/icon.png', dest: '.' },
        { src: 'src/content.js', dest: '.' },
        { src: 'src/background.js', dest: '.' }
      ]
    })
  ],
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: 'popup.html'
    }
  }
});
