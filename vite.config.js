import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main:    resolve(__dirname, 'index.html'),
        parts:   resolve(__dirname, 'parts.html'),
        product: resolve(__dirname, 'product.html'),
      }
    }
  }
})
