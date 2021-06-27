import { promises, existsSync } from 'fs'
import { join } from 'path'

(async function() {

  existsSync('./packages/.DS_Store') 
    && await promises.unlink('./packages/.DS_Store')

  const directories = await promises.readdir('./packages')

  await Promise.all(directories.map(async directory => {
    const destination = join('packages', directory, 'node_modules')
    try {
      const stat = await promises.lstat(destination)
      if (stat.isSymbolicLink()) {
      await promises.unlink(destination) 
      }
    } catch (error) {}
  }))

})()