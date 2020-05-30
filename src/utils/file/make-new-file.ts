import fs from 'fs'

const fsPromise = fs.promises

export const makeNewFile = async (path: string): Promise<void> => {
  await fsPromise.writeFile(path, '')

  return
}
