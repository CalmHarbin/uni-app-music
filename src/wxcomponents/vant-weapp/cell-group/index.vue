<template>
<uni-shadow-root class="vant-weapp-cell-group-index"><view :class="'custom-class van-cell-group '+(border ? 'van-hairline--top-bottom' : '')">
  <slot></slot>
</view></uni-shadow-root>
</template>

<script>

global['__wxRoute'] = 'vant-weapp/cell-group/index'
import { VantComponent } from '../common/component';
VantComponent({
  props: {
    border: {
      type: Boolean,
      value: true
    }
  }
});
export default global['__wxComponents']['vant-weapp/cell-group/index']
</script>
<style platform="mp-weixin">
@import '../common/index.css';
</style>