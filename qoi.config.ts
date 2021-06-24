import { copy } from '@qoi/build'
import { symlinkDir } from '@qoi/fs'

export default {
  plugins: [
    copy({
      targets: [
        { src: './packages/products/dist/*.js', dest: './dist' },
        { src: './packages/carts/dist/*.js', dest: './dist' },
        { src: './stores/carts/dist/*.js', dest: './dist' },
        { src: './stores/products/dist/*.js', dest: './dist' },
        { src: './stores/bootstrap/dist/*.js', dest: './dist' },
        { src: './stores/store/dist/*.js', dest: './dist' }
      ]
    }),
    {
      name: 'link',
      buildEnd: () => symlinkDir('./node_modules', './dist/node_modules')
    }
  ]
}