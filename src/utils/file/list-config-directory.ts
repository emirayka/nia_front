import path from 'path'
import {homedir} from 'os'
import globby from 'globby'
import fs from 'fs'

const fsPromises = fs.promises

export interface TreePart {
  name: string
  fullPath: string
  isDirectory: boolean
  children: Array<TreePart>
}

const CONFIG_DIR_NAME = '.nia.d'
const CONFIG_DIR = path.join(homedir(), CONFIG_DIR_NAME)

const walk = (dir: string) => {
  let results: Array<string> = []
  const list = fs.readdirSync(dir)

  list.forEach(function(file) {
    file = dir + '/' + file

    const stat = fs.statSync(file)

    if (stat && stat.isDirectory()) {
      const walkResults: Array<string> = walk(file)
      if (walkResults.length === 0) {
        console.log(file)
        results.push(file)
      } else {
        results = results.concat(walkResults)
      }
    } else {
      results.push(file)
    }
  })

  return results
}

const find = (children: Array<TreePart>, name: string): TreePart | null => {
  for (const part of children) {
    if (part.name === name) {
      return part
    }
  }

  return null
}

const constructTree = async (base: string, fullPaths: Array<Array<string>>) => {
  console.log(fullPaths)
  const object: TreePart = {
    name: base,
    fullPath: CONFIG_DIR,
    isDirectory: true,
    children: [],
  }

  for (const splittedFullPath of fullPaths) {
    let current: TreePart = object
    let currentPath: string = current.fullPath

    for (const part of splittedFullPath) {
      currentPath += path.sep
      currentPath += part

      let found: TreePart | null = find(current.children, part)

      if (found === null) {
        const stats = await fsPromises.lstat(currentPath)
        const isDirectory: boolean = stats.isDirectory()

        found = {
          name: part,
          children: [],
          isDirectory: isDirectory,
          fullPath: currentPath,
        }

        current.children.push(found)
      }

      current = found
    }
  }

  return object
}

export const getConfigDirectoryTree = async () => {
  const result: Array<string> = walk(CONFIG_DIR)
  const relativePaths: Array<string> = result.map(file => path.relative(CONFIG_DIR, file))
  const fullPaths: Array<Array<string>> = relativePaths.map(file => file.split(path.sep))

  return constructTree(CONFIG_DIR_NAME, fullPaths)
}
