import { getInfo, setInfo } from '@/utils/storage'

export default {
  namespaced: true,
  state () {
    return {
      userInfo: getInfo()
    }
  },
  getters: {
    token (state) {
      return state.userInfo?.token || ''
    }
  },
  mutations: {
    setUserInfo (state, obj) {
      console.log('vuex&localStorage存储成功')
      state.userInfo = obj
      setInfo(obj)
    }
  },
  actions: {}
}
