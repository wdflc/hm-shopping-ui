export default {
  namespaced: true,
  state () {
    return {
      userInfo: {
        token: '',
        userId: ''
      }
    }
  },
  mutations: {
    setUserInfo (state, obj) {
      console.log('vuex成功存用户信息')
      state.userInfo = obj
    }
  },
  actions: {}
}
