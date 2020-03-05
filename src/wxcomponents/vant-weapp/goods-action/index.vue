<template>
<uni-shadow-root class="vant-weapp-goods-action-index"><view :class="'custom-class '+(utils.bem('goods-action', { safe: isIPhoneX && safeAreaInsetBottom }))">
  <slot></slot>
</view></uni-shadow-root>
</template>
<wxs src="../wxs/utils.wxs" module="utils"></wxs>
<script>

global['__wxRoute'] = 'vant-weapp/goods-action/index'
import { VantComponent } from '../common/component';
import { iphonex } from '../mixins/iphonex';
VantComponent({
  mixins: [iphonex]
});
export default global['__wxComponents']['vant-weapp/goods-action/index']
</script>
<style platform="mp-weixin">
@import '../common/index.css';.van-goods-action{position:fixed;right:0;bottom:0;left:0;display:-webkit-flex;display:flex;background-color:#fff}.van-goods-action--safe{padding-bottom:34px}
</style>