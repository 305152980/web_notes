// 此函数的作用是将一颗虚拟 DOM 树渲染成真实的 DOM 树，并返回此真实的 DOM 树；
// 并且这颗虚拟 DOM 树中的节点都会被标记为已上树。
export default function(vnode) {
  let nodeTree = document.createElement(vnode.sel)
  // 将虚拟 DOM 树的根节点标记为已上树。
  vnode.elm = nodeTree
  if (vnode.text !== undefined && vnode.children === undefined) {
    domNode.innerText = vnode.text
  } else if (vnode.text === undefined && vnode.children !== undefined) {
    for (let i = 0; i < vnode.children.length; i++) {
      let childVnode = vnode.children[i]
      let childVnodeTree = createElement(childVnode)
      nodeTree.appendChild(childVnodeTree)
      // 将虚拟 DOM 树的非根节点标记为已上树。
      childVnode.elm = childVnodeTree
    }
  }
  return nodeTree
}