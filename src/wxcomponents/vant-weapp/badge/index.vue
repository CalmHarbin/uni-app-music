<template>
<uni-shadow-root class="vant-weapp-badge-index"><view :class="'van-badge van-hairline custom-class '+(active ? 'van-badge--active' : '')" @click="onClick">
  <view class="van-badge__text">
    <van-info v-if="info !== null" :info="info" custom-style="right: 4px"></van-info>
    {{ title }}
  </view>
</view></uni-shadow-root>
</template>

<script>
import VanInfo from '../info/index.vue'
global['__wxVueOptions'] = {components:{'van-info': VanInfo}}

global['__wxRoute'] = 'vant-weapp/badge/index'
import { VantComponent } from '../common/component';
VantComponent({
  relation: {
    type: 'ancestor',
    name: 'badge-group'
  },
  props: {
    info: null,
    title: String
  },
  methods: {
    onClick: function onClick() {
      var group = this.getRelationNodes('../badge-group/index')[0];

      if (group) {
        group.setActive(this);
      }
    },
    setActive: function setActive(active) {
      this.set({
        active: active
      });
    }
  }
});
export default global['__wxComponents']['vant-weapp/badge/index']
</script>
<style platform="mp-weixin">
@import '../common/index.css';.van-badge{display:block;overflow:hidden;font-size:14px;line-height:1.4;-webkit-user-select:none;user-select:none;color:#7d7e80;word-break:break-all;box-sizing:border-box;padding:20px 12px 20px 9px;background-color:#f8f8f8;border-left:3px solid transparent}.van-badge:active{background-color:#e8e8e8}.van-badge::after{border-bottom-width:1px}.van-badge--active{font-weight:700;color:#333;border-color:#f44}.van-badge--active::after{border-right-width:1px}.van-badge--active,.van-badge--active:active{background-color:#fff}.van-badge__text{position:relative}
</style>