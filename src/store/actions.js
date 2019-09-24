const setCorpInfo = (state, corpInfo) => {
  state.corpInfo = corpInfo
  state.corpName = corpInfo.coNm
}

export { setCorpInfo }
