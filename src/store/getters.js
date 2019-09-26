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

export { getDrawer, getItems, getCorpInfo, getCorpName, getContextPath, getRunMode }
