import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions'
import * as getters from './getters'
import state from './state'
import mutations from './mutations'
import createLogger from 'vuex/dist/logger'

Vue.use(Vuex)
//线下开发时开启严格模式，检测是否通过mutation修改state
//会有性能损耗
const debug = process.env.NODE_ENV !== 'production'
export default new Vuex.Store({
	actions,
	getters,
	state,
	mutations,
	strict: debug,
	plugins: debug? [createLogger()] : []
})