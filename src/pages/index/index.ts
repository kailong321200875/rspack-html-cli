import './index.less'

const app = document.getElementById('app')
if (app) {
  app.innerHTML = '这是首页的 TypeScript 内容'
}

function addNumber(a: number, b: number): number {
  return a + b
}

addNumber(2, 3)

interface Person {
  name: string
}

const object: Person = {
  name: 'zhangsan',
}

object.name = 'lisi'

// eslint-disable-next-line no-console
console.log(process.env)
