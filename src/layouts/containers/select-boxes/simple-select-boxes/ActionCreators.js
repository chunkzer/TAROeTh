function mountSimpleSelectBoxes(category, selected) {
  return({
    type: 'MOUNT_NEW_SIMPLE_SELECT_BOXES',
    category: category,
    selected: selected
    }
  )
}

function selectSimpleSelectBox(category, selected) {
  return({
      type: 'SELECT_SIMPLE_SELECT_BOX',
      category: category,
      selected: selected
    }
  )
}

function clearSimpleSelectBox(category) {
  return({
      type: 'CLEAR_SIMPLE_SELECT_BOX',
      category: category,
      selected: ''
    }
  )
}

const simpleSelectActions = {
  mount: mountSimpleSelectBoxes,
  select: selectSimpleSelectBox,
  clear: clearSimpleSelectBox
}

export default simpleSelectActions
