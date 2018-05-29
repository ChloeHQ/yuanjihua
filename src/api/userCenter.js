import axios from 'axios'
import { getUserInfo } from 'common/js/userinfo'

export const STATUS = 1
export const URL = 'http://www.ftusix.com/static/data/'
const uid =  getUserInfo().user_id

export function getMyCollection(params) {
	let url = URL + 'myColl.php'
	let defaultPara = {
		user_id: -1,
		page: null,   //页码
	}
	let finally_params = Object.assign({}, defaultPara, params)

	return axios.get(url, {
		params: finally_params
	}).then(res => {
		console.log(res)
		return Promise.resolve(res.data)
	})
}

/*
getMyPosts的response.
data:
		commentList:["3"]
		data:(3) [{…}, {…}, {…}, __ob__: Observer]
		info:"查询成功"
		status:1
*/
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
		// console.log(res.data)
		return Promise.resolve(res.data)
	})
}

/*
更改个人信息
*/
export function updateProfile(params) {
	let url = URL + 'update.php'
	let defaultPara = {
        sex: 1,     //  性别
        nick_name :"默认",   //  昵称
        token :"",    //  token   用户token
    }
    let finally_params = Object.assign({}, defaultPara, params)
    return axios.post(url, finally_params).then(res => {
    	console.log(res.data)
    	return Promise.resolve(res.data)
    })
}