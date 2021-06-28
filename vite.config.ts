import { defineConfig } from 'vite'
import { resolve } from 'path'

import vuePlugin from '@vitejs/plugin-vue'
import reactRefresh from '@vitejs/plugin-react-refresh'

export default defineConfig({
  resolve: {
    alias: {
      "products-store": resolve('./stores/products/src'),
      "carts-store": resolve('./stores/carts/src'),
      "koala-store": resolve('stores/store/src'),
      "bootstrap": resolve('./stores/bootstrap/src'),
      "types": resolve('./stores/types/src')
    }
  },
  plugins: [ vuePlugin(), reactRefresh() ]
})