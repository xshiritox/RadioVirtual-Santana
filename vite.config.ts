import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  optimizeDeps: {
    exclude: ['lucide-vue-next'],
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: undefined,
        entryFileNames: 'assets/[name]-[hash].js',
        chunkFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash].[ext]'
      },
    },
    assetsDir: 'assets',
    sourcemap: false,
    target: 'es2015',
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
  },
  server: {
    port: 5173,
    host: true,
    strictPort: true,
    headers: {
      'Content-Type': 'application/javascript; charset=utf-8'
    }
  },
  preview: {
    port: 4173,
    host: true,
    headers: {
      'Content-Type': 'application/javascript; charset=utf-8'
    }
  },
})