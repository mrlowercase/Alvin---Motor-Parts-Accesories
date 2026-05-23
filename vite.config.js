import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig({
  base: '/Alvin---Motor-Parts-Accesories/',
  build: {
    outDir: 'docs',
    rollupOptions: {
      input: {
        main:    resolve(__dirname, 'index.html'),
        parts:   resolve(__dirname, 'parts.html'),
        product: resolve(__dirname, 'product.html'),
      }
    }
  }
})
