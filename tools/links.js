import { symlinkDir } from 'aria-fs'
import { promises } from 'fs'
import { join } from 'path'

const [ packages, stores ] = await Promise.all([
  promises.readdir('packages'),
  promises.readdir('stores')
])

for (const pkg of packages) {
  const destPath = join('packages', pkg, 'node_modules') 
  await symlinkDir('./node_modules', destPath)
}

for (const pkg of stores) {
  const destPath = join('stores', pkg, 'node_modules') 
  await symlinkDir('./node_modules', destPath)
}