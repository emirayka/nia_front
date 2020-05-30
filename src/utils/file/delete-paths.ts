import rimraf from 'rimraf'

import fs from 'fs'

const fsPromises = fs.promises

const deletePath = async (path: string): Promise<void> => {
  try {
    const stats = await fsPromises.stat(path)

     await new Promise((resolve, reject) => {
      rimraf(path, {glob: false}, (err) => {
        if (err) {
          reject(err)
        }

        resolve()
      })
    })

    return
  }
  catch (e) {
    if (e.code !== 'ENOENT') {
      throw new Error(e)
    }
  }
}

export const deletePaths = async (paths: Array<string>): Promise<void> => {
  await Promise.all(paths.map(deletePath))

  return
}
