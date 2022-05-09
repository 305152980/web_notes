import createElement from './createElement'
import updateChildren from './updateChildren'

// 此函数的作用是 diff 新旧虚拟 DOM 树，然后对真实 DOM 树进行相应的操作。
// 简化版的 diff 算法只对 h 函数中的第一个和第三个参数进行比较，不对第二个参数进行比较。
export default function(oldVnode, newVnode) {
  // 将新的虚拟 DOM 树的根节点标记为已上树。
  newVnode.elm = oldVnode.elm
  if (oldVnode === newVnode) {
    return
  }
  if (newVnode.text !== undefined && newVnode.children === undefined) {
    if (newVnode.text !== oldVnode.text) {
      oldVnode.elm.innerText = newVnode.text
    }
    return
  } else if(newVnode.text === undefined && newVnode.children !== undefined) {
    if (oldVnode.children === undefined) {
      oldVnode.elm.innerText = ''
      for (let i = 0; i < newVnode.children.length; i++) {
        let childVnode = newVnode.children[i]
        const childVnodeTree = createElement(childVnode)
        oldVnode.elm.appendChild(childVnodeTree)
      }
    } else {
      // diff 算法的精髓在这里。
      updateChildren(oldVnode.elm, oldVnode.children, newVnode.children)
    }
  }
}