<template>
<uni-shadow-root class="vant-weapp-notify-index"><van-transition name="slide-down" :show="show" custom-class="van-notify" :custom-style="'background-color:'+(backgroundColor)+'; color: '+(color)">
  {{ text }}
</van-transition></uni-shadow-root>
</template>

<script>
import VanTransition from '../transition/index.vue'
global['__wxVueOptions'] = {components:{'van-transition': VanTransition}}

global['__wxRoute'] = 'vant-weapp/notify/index'
import { VantComponent } from '../common/component';
import { RED } from '../common/color';
VantComponent({
  props: {
    text: String,
    color: {
      type: String,
      value: '#fff'
    },
    backgroundColor: {
      type: String,
      value: RED
    },
    duration: {
      type: Number,
      value: 3000
    }
  },
  methods: {
    show: function showNotify() {
      var _this = this;

      var duration = this.data.duration;
      clearTimeout(this.timer);
      this.set({
        show: true
      });

      if (duration > 0 && duration !== Infinity) {
        this.timer = setTimeout(function () {
          _this.hide();
        }, duration);
      }
    },
    hide: function hide() {
      clearTimeout(this.timer);
      this.set({
        show: false
      });
    }
  }
});
export default global['__wxComponents']['vant-weapp/notify/index']
</script>
<style platform="mp-weixin">
@import '../common/index.css';.van-notify{z-index:110;position:fixed;top:0;width:100%;text-align:center;box-sizing:border-box;padding:6px 15px;font-size:14px;line-height:20px}
</style>