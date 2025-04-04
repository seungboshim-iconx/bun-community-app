import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  css: {
    postcss: './postcss.config.js',
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@pages': path.resolve(__dirname, './src/pages'),
      '@components': path.resolve(__dirname, './src/components'),
      '@business': path.resolve(__dirname, './src/business'),
      '@hooks': path.resolve(__dirname, './src/business/hooks'),
      '@services': path.resolve(__dirname, './src/business/services'),
      '@store': path.resolve(__dirname, './src/store'),
      '@queries': path.resolve(__dirname, './src/store/queries'),
      '@stores': path.resolve(__dirname, './src/store/stores'),
      '@utils': path.resolve(__dirname, './src/utils'),
    },
  },
})
