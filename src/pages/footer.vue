<template>
  <div class="footer">
    <ul class="footer_item">
      <li class="footer_item_li">
        <i class="custom-mint-icon-shouye"></i>
        <a class="footer_item_li_text">首页</a>
      </li>
      <li class="footer_item_li"><i class="custom-mint-icon-c-project-copy"></i><a class="footer_item_li_text">项目</a></li>
      <li class="footer_item_li"><i class="custom-mint-icon-zhongchou"></i><a class="footer_item_li_text">众筹</a></li>
      <li class="footer_item_li"><i class="custom-mint-icon-wodedangxuan"></i><a class="footer_item_li_text">我的</a></li>
    </ul>
  </div>
</template>
<script>
export default {
  data(){
    return {
      selected:'首页',
    }
  },
  methods:{
    active(){
      console.log(1);
    }
  }
}
</script>
<style lang="scss" scoped>
.footer{
  height: 50px;
  &_item{
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    &_li{
      width: 25%;
      text-align: center;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      &_text{
        color:rgba(51,51,51,1);
        font-size: 14px;
      }
    }
  }
}
</style>


