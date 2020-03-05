<template>
<uni-shadow-root class="vant-weapp-loading-index"><view class="van-loading custom-class" :style="'width: '+(size)+'; height: '+(size)">
  <view :class="'van-loading__spinner van-loading__spinner--'+(type)" :style="'color: '+(color)+';'">
    <view v-for="(item,index) in ('item in 12')" :key="item.index" v-if="type === 'spinner'" class="van-loading__dot"></view>
  </view>
</view></uni-shadow-root>
</template>

<script>

global['__wxRoute'] = 'vant-weapp/loading/index'
import { VantComponent } from '../common/component';
VantComponent({
  props: {
    size: {
      type: String,
      value: '30px'
    },
    type: {
      type: String,
      value: 'circular'
    },
    color: {
      type: String,
      value: '#c9c9c9'
    }
  }
});
export default global['__wxComponents']['vant-weapp/loading/index']
</script>
<style platform="mp-weixin">
@import '../common/index.css';.van-loading{z-index:0;line-height:0;position:relative;display:inline-block;vertical-align:middle}.van-loading__spinner{z-index:-1;width:100%;height:100%;position:relative;display:inline-block;box-sizing:border-box;-webkit-animation:van-rotate .8s linear infinite;animation:van-rotate .8s linear infinite}.van-loading__spinner--spinner{-webkit-animation-timing-function:steps(12);animation-timing-function:steps(12)}.van-loading__spinner--circular{border:1px solid;border-radius:100%;border-color:transparent;border-top-color:currentColor}.van-loading__dot{top:0;left:0;width:100%;height:100%;position:absolute}.van-loading__dot::before{width:2px;height:25%;content:' ';display:block;margin:0 auto;border-radius:40%;background-color:currentColor}.van-loading__dot:nth-of-type(1){opacity:1;-webkit-transform:rotate(30deg);transform:rotate(30deg)}.van-loading__dot:nth-of-type(2){opacity:.9375;-webkit-transform:rotate(60deg);transform:rotate(60deg)}.van-loading__dot:nth-of-type(3){opacity:.875;-webkit-transform:rotate(90deg);transform:rotate(90deg)}.van-loading__dot:nth-of-type(4){opacity:.8125;-webkit-transform:rotate(120deg);transform:rotate(120deg)}.van-loading__dot:nth-of-type(5){opacity:.75;-webkit-transform:rotate(150deg);transform:rotate(150deg)}.van-loading__dot:nth-of-type(6){opacity:.6875;-webkit-transform:rotate(180deg);transform:rotate(180deg)}.van-loading__dot:nth-of-type(7){opacity:.625;-webkit-transform:rotate(210deg);transform:rotate(210deg)}.van-loading__dot:nth-of-type(8){opacity:.5625;-webkit-transform:rotate(240deg);transform:rotate(240deg)}.van-loading__dot:nth-of-type(9){opacity:.5;-webkit-transform:rotate(270deg);transform:rotate(270deg)}.van-loading__dot:nth-of-type(10){opacity:.4375;-webkit-transform:rotate(300deg);transform:rotate(300deg)}.van-loading__dot:nth-of-type(11){opacity:.375;-webkit-transform:rotate(330deg);transform:rotate(330deg)}.van-loading__dot:nth-of-type(12){opacity:.3125;-webkit-transform:rotate(360deg);transform:rotate(360deg)}@-webkit-keyframes van-rotate{from{-webkit-transform:rotate(0);transform:rotate(0)}to{-webkit-transform:rotate(360deg);transform:rotate(360deg)}}@keyframes van-rotate{from{-webkit-transform:rotate(0);transform:rotate(0)}to{-webkit-transform:rotate(360deg);transform:rotate(360deg)}}
</style>