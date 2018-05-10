import axios from 'axios'

export const STATUS = 1
const URL = 'http://www.ftusix.com/static/data/'

export function getTopicList(params) {
	let url = URL + 'topicList.php'
	let defaultParam = {
		type:0,    //类型，0为全部 ，如果index为true则1.html 2.php 3.java     index为false则 1.经验分享 2.入门学习 3.成果分享,
        sort:"hot",  //排序
        page:null,   //页码 null则为第一页默认页
        index:true //是否为首页列表
	}	
	let data = Object.assign({}, defaultParam, params)
	return axios.get("http://www.ftusix.com/static/data/topicList.php", {
		      params: {
		        type: 0,
		        index: true,
		        sort: "hot",
		        page:null
		      }
		    }).then(res => {
		     return Promise.resolve(res.data)
		    })
}

