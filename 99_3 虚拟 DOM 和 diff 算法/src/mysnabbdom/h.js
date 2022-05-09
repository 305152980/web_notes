import vnode from './vnode'

// 此函数的作用是返回一个未上树的虚拟 DOM 节点。
/*
  （简化版 h 函数）调用的时候形式必须是下面三种之一：
    h('div', {}, '文字') ==> { sel, data, undefined, text, undefined }
    h('div', {}, []) ==> { sel, data, children, undefined, undefined }
    h('div', {}, h()) ==> { sel, data, undefined, undefined, undefined }
  注意：
    1、第二个参数为空对象，或者为只有一个 key 属性的对象。
    2、第三个参数只能是文本和子节点二选一，其中文本可以为空字符串但子节点数组不能为空数组。
*/
// Vue 在进行模板编译的时候会嵌套调用此函数生成一个未上树的虚拟 DOM 树。
export default function(sel, data, c) {
  // 注意 'string' || 'number' 要用括号包起来。
  if (typeof c === ('string' || 'number')) {
    return vnode(sel, data, undefined, c, undefined)
  } else if (Array.isArray(c)) {
    const children = []
    for (let i = 0; i < c.length; i++) {
      if (!(typeof c[i] === 'object' && c[i].hasOwnProperty('sel'))) throw Error('c 数组的元素不是虚拟 DOM 节点。')
      children.push(c[i])
    }
    return vnode(sel, data, children, undefined, undefined)
  } else if (typeof c === 'object' && c.hasOwnProperty('sel')) {
    let children = [c]
    return vnode(sel, data, children, undefined, undefined)
  }
}