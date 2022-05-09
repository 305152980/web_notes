import createElement from './createElement'
import patchVnode from './patchVnode'

// 判断 a 和 b 是否是同一个虚拟节点。
function checkSameVnode(a, b) {
  return a.sel === b.sel && a.key === b.key
}

export default function(parentNode, oldChildren, newChildren) {
  // 注意：这些标记都是待处理虚拟节点的标记。
  let oldStartIdx = 0 // 旧前
  let oldStartVnode = oldChildren[oldStartIdx] // 旧前虚拟节点
  let newStartIdx = 0 // 新前
  let newStartVnode = newChildren[newStartIdx] // 新前虚拟节点
  let oldEndIdx = oldChildren.length - 1 // 旧后
  let oldEndVnode = oldChildren[oldEndIdx] // 旧后虚拟节点
  let newEndIdx = newChildren.length - 1 // 新后
  let newEndVnode = newChildren[newEndIdx] // 新后虚拟节点

  while (oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx) {
    // 首先不是判断命中，而是要掠过已经加了 undefined 标记的虚拟节点。
    if (oldStartVnode === null || oldChildren[oldStartIdx] === undefined) {
      oldStartVnode = oldChildren[++oldStartIdx]
    } else if (oldEndVnode === null || oldChildren[oldEndIdx] === undefined) {
      oldEndVnode = oldChildren[--oldEndIdx]
    } else if (newStartVnode === null || newChildren[newStartIdx] === undefined) {
      newStartVnode = newChildren[++newStartIdx]
    } else if (newEndVnode === null || newChildren[newEndIdx] === undefined) {
      newEndVnode = newChildren[--newEndIdx]
    } else if (checkSameVnode(oldStartVnode, newStartVnode)) {
      // 新前和旧前
      patchVnode(oldStartVnode, newStartVnode)
      oldStartVnode = oldChildren[++oldStartIdx]
      newStartVnode = newChildren[++newStartIdx]
    } else if (checkSameVnode(oldEndVnode, newEndVnode)) {
      // 新后和旧后
      patchVnode(oldEndVnode, newEndVnode)
      oldEndVnode = oldChildren[--oldEndIdx]
      newEndVnode = newChildren[--newEndIdx]
    } else if (checkSameVnode(oldStartVnode, newEndVnode)) {
      // 新后和旧前
      patchVnode(oldStartVnode, newEndVnode)
      parentNode.insertBefore(oldStartVnode.elm, oldEndVnode.elm.nextSibling)
      newEndVnode = newChildren[--newEndIdx]
      oldStartVnode = oldChildren[++oldStartIdx]
    } else if (checkSameVnode(oldEndVnode, newStartVnode)) {
      // 新前和旧后
      patchVnode(oldEndVnode, newStartVnode)
      parentNode.insertBefore(oldEndVnode.elm, oldStartVnode.elm)
      newStartVnode = newChildren[++newStartIdx]
      oldEndVnode = oldChildren[--oldEndIdx]
    } else {
      let flag = false
      for (let i = oldStartIdx; i <= oldEndIdx; i++) {
        if(checkSameVnode(oldChildren[i], newStartVnode)){
          flag = true
          const elmToMove = oldChildren[i]
          patchVnode(elmToMove, newStartVnode)
          oldChildren[i] = undefined
          parentNode.insertBefore(elmToMove.elm, oldStartVnode.elm)
        }
      }
      if(!flag){
        parentNode.insertBefore(createElement(newStartVnode), oldStartVnode.elm)
      }
      newStartVnode = newChildren[++newStartIdx]
    }
  }
  
  if (newStartIdx <= newEndIdx) {
    // 处理（新增）新的剩余虚拟节点。
    for (let i = newStartIdx; i <= newEndIdx; i++) {
      parentNode.insertBefore(createElement(newChildren[i]), oldChildren[oldStartIdx].elm)
    }
  } else if (oldStartIdx <= oldEndIdx) {
    // 处理（删除）旧的多余虚拟节点。
    for (let i = oldStartIdx; i <= oldEndIdx; i++) {
      if (oldChildren[i]) {
        parentNode.removeChild(oldChildren[i].elm)
      }
    }
  }
}