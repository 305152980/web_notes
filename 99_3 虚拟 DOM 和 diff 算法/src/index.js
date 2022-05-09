import h from './mysnabbdom/h'
import patch from './mysnabbdom/patch'

const myVnode1 = h('ul', {}, [
  h('li', { key: 'A' }, 'A'),
  h('li', { key: 'B' }, 'B'),
  h('li', { key: 'C' }, 'C'),
  h('li', { key: 'D' }, 'D'),
  h('li', { key: 'E' }, 'E')
])

const myVnode2 = h('ul', {}, [
  h('li', { key: 'QQ' }, 'QQB'),
  h('li', { key: 'C' }, 'C'),
  h('li', { key: 'D' }, 'D'),
  h('li', { key: 'B' }, 'B'),
  h('li', { key: 'F' }, 'F'),
  h('li', { key: 'G' }, 'G')
])

const container = document.getElementById('container')

patch(container, myVnode1)

const btn = document.getElementById('btn')

btn.onclick = function () {
  patch(myVnode1, myVnode2)
}