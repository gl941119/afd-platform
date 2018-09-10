<template>
    <div class="freshman-title">
        <img src="../../../assets/imgs/img/title-start.png" >
        <slot>
            <span>常见问题</span>
        </slot>
        <img src="../../../assets/imgs/img/title-end.png" >
    </div>
</template>
<script>
export default {
    data() {
        return {};
    },
};
</script>
<style lang="scss" scoped>
@import '~@/assets/css/global.scss';
.freshman-title {
    @include content-flex(space-between);
    width: pxTorem(104px);
    margin: 0 auto;
    span {
        font-size: 16px;
        line-height: 22px;
        font-weight: 700;
    }
    img {
        width: pxTorem(12px);
        vertical-align: middle;
    }
}
</style>
