const setCorpInfo = (state, corpInfo) => {
  state.corpInfo = corpInfo
  state.corpName = state.corpInfo.coNm
}

const setContextPath = (state, contextPath) => {
  state.contextPath = contextPath
}

const onClickDrawer = (state) => {
  state.drawer = !state.drawer
}

const openDrawer = (state) => {
  state.drawer = true
}

const closeDrawer = (state) => {
  state.drawer = false
}

export { setCorpInfo, setContextPath, onClickDrawer, openDrawer, closeDrawer }
