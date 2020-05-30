import fs from 'fs'

const fsPromise = fs.promises

export const readFileContent = async (filePath: string): Promise<string> => {
  const fileContent: string = await fsPromise.readFile(filePath, 'utf8')

  return fileContent
}