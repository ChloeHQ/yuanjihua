import * as types from './mutation-types'

const mutations = {
	[types.SET_ARTICLE](state, article) {
		state.article = article
	}
}

export default mutations