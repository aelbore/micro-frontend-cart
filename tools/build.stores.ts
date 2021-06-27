import { promises } from 'fs'
import { exec } from 'child_process'
import { promisify } from 'util'

(async function() {
  const execAsync = promisify(exec)
  const stores = await promises.readdir('stores')
  
  for (const pkg of stores.filter(store => !store.includes('www'))) {
    await execAsync(`yarn --cwd ./stores/${pkg} build`)
  }
})()