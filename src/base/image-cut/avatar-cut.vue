<template>
	<section>
		<form name='test'>
			<!-- <input type="file" class='ipt-file' @change="fileChange" ref="fileipt"> -->
			<input type="file" id="file" name="file" class='ipt-file' ref="fileipt">
			<button id="clip" class="clipbtn">裁剪</button>
			<button id="grey">灰度</button>
			<input type="submit" value="提交" @click="submit_avatar">
		</form>

		<canvas :width="canvas_width" :height="canvas_width" 
		ref="mycanvas"
		></canvas>
	</section>
</template>

<script type="text/ecmascript-6">
import {InitCanvas} from 'base/image-cut/init.js'
import {InitGrey} from 'base/image-cut/grey.js'
import {postAvatar} from 'base/image-cut/postAvatar.js'

	export default{
		data(){
			return{
				showClipBtn: false,
				showGreyBtn: false,
				canvas_width: 0,
				canvas_height: 0,
				ctx : {},
				preview: new Image(),
				cutAvater: null,
				blob: null
			}
		},
		props:{
			prewidth:{
				type: Number,
				default: function(){
					return 400
				},
				uploadUrl:{
					type: String,
					default: function(){
						return ''
					}
				}
			}
		},
		computed: {
			ImageWidth(){
				return this.prewidth+'px'
			}
		},
		mounted(){
			let canvas = document.querySelector('canvas');
			InitCanvas(canvas, this.prewidth)
		},
		methods: {
			convertBase64UrlToBlob(urlData) {   
				var bytes = window.atob(urlData.split(',')[1]); //去掉url的头，并转换为byte   
				//处理异常,将ascii码小于0的转换为大于0   
				var ab = new ArrayBuffer(bytes.length);  
				var ia = new Uint8Array(ab);   
				for(var i = 0; i < bytes.length; i++) {   
				    ia[i] = bytes.charCodeAt(i);   
				}  
				return new Blob([ab], { type: 'image/png' });  
			},   
			getBlobBydataURI(dataURI,type) {       
				var binary = atob(dataURI.split(',')[1]);       
				var array = [];       
				for(var i = 0; i < binary.length; i++) {       
				  array.push(binary.charCodeAt(i));       
				}       
				return new Blob([new Uint8Array(array)], {type:type });       
			}, 
			submit_avatar(e) {
      	e.preventDefault();

	      var formData = new FormData()
        var xhr = new XMLHttpRequest()
	      // var mime = 'image/jpeg'
        this.cutAvater = this.$refs.mycanvas.toDataURL()
        //将dataURL转换成Blob对象
				let arr = this.cutAvater.split(',')
				let data = window.atob(arr[1])
				let mime = arr[0].match(/:(.*?);/)[1]
				let ia = new Uint8Array(data.length)
				for (var i = 0; i < data.length; i++) {
					ia[i] = data.charCodeAt(i)
				}
				this.blob = new Blob([ia], {type: mime})
				//将Blob对象转化为File对象
				 let files = new window.File([this.blob], file.name, {type: file.type})
				 console.log(files)
				 formData.append('file', files, 'avatar.jpg');
         let config = {
						headers: {'Content-Type': 'multipart/form-data'}
      	}

        /*start
	          dataUrl = this.$refs.mycanvas.toDataURL(mime, 0.8)
	          data = atob(dataUrl.split(',')[1]),
	          n = data.length,
	          uInt8 = new Uint8Array(n),
	          blob;
	      while(n--) {
	        uInt8[n] = data.charCodeAt(n);
	      }
	      blob = new Blob([uInt8.buffer], {type: mime});
	      console.log('blob: ', blob)
	      formData.append('file', blob, 'avatar.jpg');
				*/

				/*用XHR对象
	      xhr.onreadystatechange = function(){
	      	if(xhr.readyState === 4 && xhr.status === 200){
	      		console.log(xhr.responseText)
	      	}
      	}
      	*/

			// xhr.open('post', 'http://www.ftusix.com/static/data/upload.php');
			// xhr.send(formData);
      
	      // 用axios
	      postAvatar(this.uploadUrl, formData, config)
	      
	    }
		}

	}

</script>

<style lang="stylus" scoped>
	.clipbtn
		&.show-clipbtn
			display: inline-block
</style>