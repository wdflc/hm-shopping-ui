import Vue from 'vue'
import App from './App.vue'
import router from './router'
import '@/utils/vant-ui'
import '@/styles/common.less'
import store from '@/store'
import { Search, Swipe, SwipeItem, Grid, GridItem, Icon, Lazyload, ActionSheet } from 'vant'
Vue.config.productionTip = false

Vue.use(GridItem)
Vue.use(Search)
Vue.use(Swipe)
Vue.use(SwipeItem)
Vue.use(Grid)
Vue.use(Icon)
Vue.use(Lazyload)
Vue.use(ActionSheet)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
