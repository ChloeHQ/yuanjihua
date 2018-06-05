import axios from 'axios'

export function postAvatar(url, params, config){

	 return axios.post(url, params, config)
	.then(response => {
		console.log(response)
	})
  }
