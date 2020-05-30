import fs from 'fs'

const fsPromise = fs.promises

export const saveFileContent = async (filePath: string, fileContent: string): Promise<void> => {
  await fsPromise.writeFile(filePath, fileContent)

  return
}
