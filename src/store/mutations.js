const setCorpInfo = (state, resp) => {
  state.corpInfo = resp.data.response
  state.corpName = state.corpInfo.coNm
}

const onClickDrawer = (state) => {
  state.drawer = !state.drawer
}

const closeDrawer = (state) => {
  state.drawer = false
}

export { setCorpInfo, onClickDrawer, closeDrawer }
