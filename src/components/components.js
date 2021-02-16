import Page from './page'
import Teaser from './teaser'
import ComponentNotFound from './component_not_found'

const ComponentList = {
  page: Page,
  teaser: Teaser,
}

const Components = (type) => {
  if (typeof ComponentList[type] === 'undefined') {
    return ComponentNotFound
  }
  return ComponentList[type]
}

export default Components
