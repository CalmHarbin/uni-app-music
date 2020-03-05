<template>
<uni-shadow-root class="vant-weapp-toast-index"><van-overlay v-if="mask || forbidClick" :show="show" :mask="mask" :z-index="zIndex"></van-overlay>
<van-transition :show="show" :custom-style="'z-index: '+(zIndex)" custom-class="van-toast__container">
  <view :class="'van-toast van-toast--'+(type === 'text' ? 'text' : 'icon')+' van-toast--'+(position)" @touchmove.stop.prevent="noop">
    
    <text v-if="type === 'text'">{{ message }}</text>

    
    <block v-else>
      <van-loading v-if="type === 'loading'" color="white" :type="loadingType" custom-class="van-toast__loading"></van-loading>
      <van-icon v-else class="van-toast__icon" :name="type"></van-icon>
      <text v-if="message" class="van-toast__text">{{ message }}</text>
    </block>
  </view>
</van-transition></uni-shadow-root>
</template>

<script>
import VanIcon from '../icon/index.vue'
import VanLoading from '../loading/index.vue'
import VanOverlay from '../overlay/index.vue'
import VanTransition from '../transition/index.vue'
global['__wxVueOptions'] = {components:{'van-icon': VanIcon,'van-loading': VanLoading,'van-overlay': VanOverlay,'van-transition': VanTransition}}

global['__wxRoute'] = 'vant-weapp/toast/index'
import { VantComponent } from '../common/component';
VantComponent({
  props: {
    show: Boolean,
    mask: Boolean,
    message: String,
    forbidClick: Boolean,
    zIndex: {
      type: Number,
      value: 1000
    },
    type: {
      type: String,
      value: 'text'
    },
    loadingType: {
      type: String,
      value: 'circular'
    },
    position: {
      type: String,
      value: 'middle'
    }
  },
  methods: {
    clear: function clear() {
      this.set({
        show: false
      });
    },
    // for prevent touchmove
    noop: function noop() {}
  }
});
export default global['__wxComponents']['vant-weapp/toast/index']
</script>
<style platform="mp-weixin">
@import '../common/index.css';.van-toast{display:-webkit-flex;display:flex;color:#fff;font-size:14px;line-height:20px;border-radius:4px;word-break:break-all;-webkit-align-items:center;align-items:center;-webkit-flex-direction:column;flex-direction:column;-webkit-justify-content:center;justify-content:center;box-sizing:content-box;background-color:rgba(51,51,51,.88)}.van-toast__container{position:fixed;top:50%;left:50%;max-width:70%;width:-webkit-fit-content;width:fit-content;-webkit-transform:translate(-50%,-50%);transform:translate(-50%,-50%)}.van-toast--text{padding:8px 12px;min-width:96px}.van-toast--icon{width:90px;padding:15px;min-height:90px}.van-toast--icon .van-toast__icon{font-size:48px}.van-toast--icon .van-toast__text{padding-top:5px}.van-toast__loading{margin:10px 0}.van-toast--top{-webkit-transform:translate(0,-30vh);transform:translate(0,-30vh)}.van-toast--bottom{-webkit-transform:translate(0,30vh);transform:translate(0,30vh)}
</style>