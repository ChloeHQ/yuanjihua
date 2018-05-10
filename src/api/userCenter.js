import axios from 'axios'
import { getUserInfo } from 'common/js/userinfo'

export const STATUS = 1
const URL = 'http://www.ftusix.com/static/data/'
const uid =  getUserInfo().user_id

export function getMyCollection(params) {
	let url = URL + 'myColl.php'
	let defaultPara = {
		user_id: uid,
		page: null,   //页码
	}
	let finally_params = Object.assign({}, defaultPara, params)

	return axios.get(url, {
		params: finally_params
	}).then(res => {
		return Promise.resolve(res.data)
	})
}

export function getMyPosts(params) {
	let url = URL + 'myNote.php'
	let defaultPara = {
		user_id: uid,
		page: null,   //页码
	}
	let finally_params = Object.assign({}, defaultPara, params)
	return axios.get(url, {
		params: finally_params
	}).then(res => {
		return Promise.resolve(res.data)
	})
}