const imgBaseUrl = 'http://45.32.9.101:9191/upload/'

export {
  imgBaseUrl
}

export function resetForm(param) {
  let form = new FormData()
  for (let key in param) {
    let value = param[key] || ''
    form.append(key, value)
  }
  return form
}
export function numformatter (value) {
  // 小数点去0
  if (value) {
    return value.replace(/\.?0+$/, '')
  }
}

export function NumberFormat(param,n) {
  // 格式化小数点
  let num = param.toString()
  let index = num.indexOf('.')
  if(index.length == 0) {
    return "0.00"
  }
  if(index.length == 1) {
    return num + ".00"
  }

  let decimal = num.substring(index + 1, num.length)
}


export function UsMoney() {
  return { type: 'money', locale: 'en-US' }
}

/**
 * 递归获取树形结构
 * @type {*|*[]}
 * @param parentId 父级id
 * @param list 数据源
 * @returns {[]}
 */
export function getTreeData (parentId, list) {
  const arr = list.filter(c => c.ParentID === parentId) || [];
  arr.forEach((item) => {
    const children = getTreeData(item.ID, list);
    if (children.length) {
      item.children = children
    }
  })
  return arr
}
