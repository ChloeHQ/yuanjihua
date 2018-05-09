import axios from 'axios'

export const STATUS = 1
const URL = 'http://www.ftusix.com/static/data/'

export function logIn(params) {
	const url= URL + 'login.php'
	return axios.post(url, params).then((res) => {
		return Promise.resolve(res.data)
	})
}