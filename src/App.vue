<template>
  <div id="app">
  	<mt-button type="primary" @click.native="uploadCroppedImage">点击触发 handleClick</mt-button>
  	<croppa v-model="myCroppa"
  		:width="200"
  		:height="200"
  		:quality="1"
  		initial-size="cover">
  	</croppa>
  </div>
</template>

<script>
	import Request from './utils/require';
export default {
  name: 'App',
  data(){
  	return {
  		myCroppa: {},
  	}
   },
  methods:{
  	uploadCroppedImage() {
       this.myCroppa.generateBlob((blob) => {
          let formdata = new FormData();
          formdata.append("file", blob, "image.png"); //封装到formdata中
          Request({
					url: 'blockchainadvert/common/upload-file',
					data: formdata,
					flag:true,
				}).then(res => {
					console.log(res);
          })
       }, 'image/jpeg', 0.8) // 80% compressed jpeg file
     },
  }
}
</script>

<style>

</style>
