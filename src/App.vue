<template>
  <div id="app">
    <Header></Header>
    <div class="center"></div>
    <Footer></Footer>
  </div>
</template>

<script>
	import Footer from './pages/footer';
	import Header from './pages/header';
export default {
  name: 'App',
  components:{
    Footer,
    Header
  },
  data(){
  	return {

  	}
  },
  methods:{

  }
}
</script>

<style>
  #app{
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
  }
  .center{
    height: 800px;
    overflow-y: scroll;
    flex: 1;
  }
</style>
