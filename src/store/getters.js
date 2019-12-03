const getDrawer = (state) => {
  return state.drawer
}

const getItems = (state) => {
  return state.items
}

const getCorpInfo = (state) => {
  return state.corpInfo
}

const getCorpName = (state) => {
  return state.corpName
}

const getRunMode = (state) => {
  return state.runMode
}

const getContextPath = (state) => {
  console.log(state.contextPath)
  return state.contextPath
}

const getAddIcon = (state) => {
  console.log(state.icons.add)
  return state.icons.add
}

const getCloseIcon = (state) => {
  console.log(state.icons.close)
  return state.icons.close
}

const getDashboardIcon = (state) => {
  console.log(state.icons.dashboard)
  return state.icons.dashboard
}

const getEditIcon = (state) => {
  console.log(state.icons.edit)
  return state.icons.edit
}

const getMenuIcon = (state) => {
  console.log(state.icons.menu)
  return state.icons.menu
}

const getWarningIcon = (state) => {
  console.log(state.icons.warning)
  return state.icons.warning
}

export { getDrawer, getItems, getCorpInfo, getCorpName, getContextPath, getRunMode, getAddIcon, getCloseIcon, getDashboardIcon, getEditIcon, getMenuIcon, getWarningIcon }
