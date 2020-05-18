import main from './main'
import renderer from './renderer'

export default (category: string) => {
  return (process && process.type === 'renderer')
    ? renderer(category)
    : main(category)
}
