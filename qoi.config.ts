import { copy } from '@qoi/build'
import { symlinkDir } from '@qoi/fs'
import { copyFile } from 'fs/promises'

export default {
  plugins: [
    copy({
      targets: [
        { src: './packages/products/dist/*.js', dest: './dist' },
        { src: './packages/carts/dist/*.js', dest: './dist' },
        { src: './stores/carts/dist/*.js', dest: './dist' },
        { src: './stores/products/dist/*.js', dest: './dist' },
        { src: './stores/bootstrap/dist/*.js', dest: './dist' },
        { src: './stores/store/dist/*.js', dest: './dist' },
        { src: './tools/*.html', dest: './dist' },
        { src: './tools/*.json', dest: './dist' }
      ],
      async copyEnd() {
        await copyFile('./node_modules/.vite/redux.js', './dist/redux.js')
      }
    }),
    {
      name: 'link',
      buildEnd: () => symlinkDir('./node_modules', './dist/node_modules')
    }
  ]
}