import vnode from './vnode'
import createElement from './createElement'
import patchVnode from './patchVnode'

// 此函数的作用是更新页面中的真实 DOM 树。
export default function(oldVnode, newVnode) {
  // 如果 oldVnode 是真实 DOM 节点，则将其包装成一个虚拟 DOM 节点。
  if (oldVnode.sel === '' || oldVnode.sel === undefined) {
    oldVnode = vnode(
      oldVnode.tagName.toLowerCase(),
      {},
      undefined,
      '',
      oldVnode
    )
  }
  // 判断 oldVnode 和 newVnode 是不是同一个虚拟 DOM 节点。
  if (oldVnode.key === newVnode.key && oldVnode.sel === newVnode.sel) {
    patchVnode(oldVnode, newVnode)
  } else {
    let newNodeTree = createElement(newVnode)
    // 插入新真实 DOM 节点。
    oldVnode.elm.parentNode.insertBefore(newNodeTree, oldVnode.elm)
    // 删除旧真实 DOM 节点。
    oldVnode.elm.parentNode.removeChild(oldVnode.elm)
  }
}