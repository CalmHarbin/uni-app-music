<template>
<uni-shadow-root class="vant-weapp-overlay-index"><van-transition :show="show" custom-class="van-overlay" :custom-style="'z-index: '+(zIndex)+'; '+(mask ? 'background-color: rgba(0, 0, 0, .7);' : '')+'; '+(customStyle)" @click.native="onClick" @touchmove.native.stop.prevent="noop"></van-transition></uni-shadow-root>
</template>

<script>
import VanTransition from '../transition/index.vue'
global['__wxVueOptions'] = {components:{'van-transition': VanTransition}}

global['__wxRoute'] = 'vant-weapp/overlay/index'
import { VantComponent } from '../common/component';
VantComponent({
  props: {
    show: Boolean,
    mask: Boolean,
    customStyle: String,
    zIndex: {
      type: Number,
      value: 1
    }
  },
  methods: {
    onClick: function onClick() {
      this.$emit('click');
    },
    // for prevent touchmove
    noop: function noop() {}
  }
});
export default global['__wxComponents']['vant-weapp/overlay/index']
</script>
<style platform="mp-weixin">
@import '../common/index.css';.van-overlay{position:fixed;top:0;left:0;right:0;bottom:0}
</style>