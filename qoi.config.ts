import { copy } from '@qoi/build'
import { symlinkDir, clean, globFiles } from '@qoi/fs'

import { copyFile, mkdir, writeFile } from 'fs/promises'
import { basename, join } from 'path'

export default {
  plugins: [
    copy({
      targets: [
        { src: './tools/*.html', dest: './dist' },
        { src: './tools/*.json', dest: './dist' }
      ],
      async copyEnd() {
        const STORE_WWW = './stores/www'

        await clean(STORE_WWW)

        /// create `./stores/www folder
        /// static folder for stores
        await mkdir(STORE_WWW, { recursive: true })
        
        /// create package.json with scripts
        /// to execute the static server
        await writeFile(
          `${STORE_WWW}/package.json`, 
          JSON.stringify({ 
            'name': 'shared',
            'scripts': { 'serve': 'sirv . --port 3012' } 
          },
           null, 2)
        )

        /// Get all build files of stores
        /// Copy all the files in ./stores folder
        const files = await globFiles([
          './stores/store/dist/*.js',
          './stores/carts/dist/*.js',
          './stores/products/dist/*.js'
        ], true)
        await Promise.all(files.map(async file => {
          const destPath = join(STORE_WWW, basename(file))
          await copyFile(file, destPath)
        }))

        await copyFile(
          './node_modules/.vite/redux.js', 
          './dist/redux.js'
        )
        await symlinkDir('./node_modules', join(STORE_WWW, 'node_modules'))
      }
    }),
    {
      name: 'link',
      buildEnd: () => symlinkDir('./node_modules', './dist/node_modules')
    }
  ]
}