export const text = (rows, id, filterValue) => {
  return rows.filter(row => {
    const rowValue = row.values[id]
    return rowValue !== undefined
      ? String(rowValue)
          .toLowerCase()
          .includes(String(filterValue).toLowerCase())
      : true
  })
}

text.autoRemove = val => !val

export const exactText = (rows, id, filterValue) => {
  return rows.filter(row => {
    const rowValue = row.values[id]
    return rowValue !== undefined
      ? String(rowValue).toLowerCase() === String(filterValue).toLowerCase()
      : true
  })
}

exactText.autoRemove = val => !val

export const exactTextCase = (rows, id, filterValue) => {
  return rows.filter(row => {
    const rowValue = row.values[id]
    return rowValue !== undefined
      ? String(rowValue) === String(filterValue)
      : true
  })
}

exactTextCase.autoRemove = val => !val

export const includes = (rows, id, filterValue) => {
  return rows.filter(row => {
    const rowValue = row.values[id]
    return filterValue.includes(rowValue)
  })
}

includes.autoRemove = val => !val || !val.length

export const includesAll = (rows, id, filterValue) => {
  return rows.filter(row => {
    const rowValue = row.values[id]
    return filterValue.every(val => rowValue.includes(val))
  })
}

includesAll.autoRemove = val => !val || !val.length

export const exact = (rows, id, filterValue) => {
  return rows.filter(row => {
    const rowValue = row.values[id]
    return rowValue === filterValue
  })
}

exact.autoRemove = val => typeof val === 'undefined'

export const equals = (rows, id, filterValue) => {
  return rows.filter(row => {
    const rowValue = row.values[id]
    return rowValue == filterValue
  })
}

equals.autoRemove = val => val == null

export const between = (rows, id, filterValue) => {
  let [min, max] = filterValue || []

  min = typeof min === 'number' ? min : -Infinity
  max = typeof max === 'number' ? max : Infinity

  if (min > max) {
    const temp = min
    min = max
    max = temp
  }

  return rows.filter(row => {
    const rowValue = row.values[id]
    return rowValue >= min && rowValue <= max
  })
}

between.autoRemove = val =>
  console.log(val) ||
  !val ||
  (typeof val[0] !== 'number' && typeof val[1] !== 'number')
