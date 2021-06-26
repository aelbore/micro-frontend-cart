import { defineConfig } from 'vite'
import { resolve } from 'path'

import vuePlugin from '@vitejs/plugin-vue'
import { replaceCodePlugin } from "vite-plugin-replace";

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
      "bootstrap": resolve('./stores/bootstrap/src')
    }
  },
  plugins: [
    replaceCodePlugin({
      replacements: [
        {
          from: "process.env.NODE_ENV",
          to: 'production',
        }
      ]
    }),    
    vuePlugin() 
  ]
})