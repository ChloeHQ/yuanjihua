// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App'
import router from './router'
import VueCookie from 'vue-cookie'

import 'common/style/reset.styl'

Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.use(VueCookie)

const EventBus = new Vue()
Vue.prototype.$bus = EventBus
Object.defineProperties(Vue.prototype, {
  $bus: { get: () => EventBus }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'

})
