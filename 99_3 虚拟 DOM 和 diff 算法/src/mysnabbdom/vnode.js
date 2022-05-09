export default function(sel, data, children, text, elm) {
  const key = data.key
  // 注意这是 es6 写法。
  return { sel, data, children, text, elm, key }
}