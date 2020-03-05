<template>
<uni-shadow-root class="vant-weapp-info-index"><view v-if="info !== null" class="custom-class van-info" :style="customStyle">
  {{ info }}
</view></uni-shadow-root>
</template>

<script>

global['__wxRoute'] = 'vant-weapp/info/index'
import { VantComponent } from '../common/component';
VantComponent({
  props: {
    info: null,
    customStyle: String
  }
});
export default global['__wxComponents']['vant-weapp/info/index']
</script>
<style platform="mp-weixin">
@import '../common/index.css';.van-info{position:absolute;right:0;top:-8px;color:#fff;font-size:12px;font-weight:500;font-family:PingFang SC,Helvetica Neue,Arial,sans-serif;text-align:center;box-sizing:border-box;padding:0 3px;min-width:16px;line-height:14px;border:1px solid #fff;border-radius:16px;background-color:#f44;-webkit-transform:translateX(50%);transform:translateX(50%);-webkit-transform-origin:100%;transform-origin:100%}
</style>