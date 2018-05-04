import axios from 'axios'

export const STATUS = 1
const URL = 'http://www.ftusix.com/static/data/'

export function registe(params) {
	const url = URL + 'register.php'
	const data = params
	return axios.post(url, data).then( (res) => {
		return Promise.resolve(res.data)
	})

}

export function getVcode(number) {
	const url= URL + 'sendsms.php'
	const data = number
	return axios.post(url, data).then((res) => {
		return Promise.resolve(res.data)
	})
}