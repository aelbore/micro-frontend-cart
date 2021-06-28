import { defineConfig } from 'vite'
import { resolve } from 'path'

import vuePlugin from '@vitejs/plugin-vue'

export default defineConfig({
  esbuild: {
    jsxFactory: 'h',
    jsxFragment: 'Fragment'
  },
  resolve: {
    alias: {
      "products-store": resolve('./stores/products/src'),
      "carts-store": resolve('./stores/carts/src'),
      "koala-store": resolve('stores/store/src'),
      "bootstrap": resolve('./stores/bootstrap/src'),
      "types": resolve('./stores/types/src')
    }
  },
  plugins: [ vuePlugin() ]
})