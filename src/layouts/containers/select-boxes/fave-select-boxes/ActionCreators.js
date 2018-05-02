function mountFaveSelectBoxes(category, selected) {
  return({
    type: 'MOUNT_NEW_FAVE_SELECT_BOXES',
      category: category,
      selected: selected
    }
  )
}

function selectFaveSelectBox(category, index) {
  return({
      type: 'SELECT_FAVE_SELECT_BOX',
      category: category,
      id: index
    }
  )
}

function faveFaveSelectBox(category, index) {
  return({
      type: 'FAVE_FAVE_SELECT_BOX',
      category: category,
      id: index
    }
  )
}

function clearFaveSelectBox(category, clearSelect) {
  return({
      type: 'CLEAR_FAVE_SELECT_BOX',
      category: category,
      selected: clearSelect,
      id: ''
    }
  )
}

const faveSelectActions = {
  mount: mountFaveSelectBoxes,
  select: selectFaveSelectBox,
  fave: faveFaveSelectBox,
  clear: clearFaveSelectBox
}

export default faveSelectActions
