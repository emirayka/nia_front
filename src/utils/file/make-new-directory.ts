import fs from 'fs'

const fsPromise = fs.promises

export const makeNewDirectory = async (path: string): Promise<void> => {
  await fsPromise.mkdir(path)

  return
}
