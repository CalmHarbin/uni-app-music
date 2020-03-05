<template>
<uni-shadow-root class="vant-weapp-switch-index"><view :class="'custom-class '+(utils.bem('switch', { on: checked, disabled }))" :style="'font-size: '+(size)+'; '+((checked ? activeColor : inactiveColor) ? 'background-color: ' + (checked ? activeColor : inactiveColor ) : '')" @click="onClick">
  <view class="van-switch__node node-class">
    <van-loading v-if="loading" size="50%" custom-class="van-switch__loading"></van-loading>
  </view>
</view></uni-shadow-root>
</template>
<wxs src="../wxs/utils.wxs" module="utils"></wxs>
<script>
import VanLoading from '../loading/index.vue'
global['__wxVueOptions'] = {components:{'van-loading': VanLoading}}

global['__wxRoute'] = 'vant-weapp/switch/index'
import { VantComponent } from '../common/component';
VantComponent({
  field: true,
  classes: ['node-class'],
  props: {
    checked: Boolean,
    loading: Boolean,
    disabled: Boolean,
    activeColor: String,
    inactiveColor: String,
    size: {
      type: String,
      value: '30px'
    }
  },
  watch: {
    checked: function checked(value) {
      this.set({
        value: value
      });
    }
  },
  created: function created() {
    this.set({
      value: this.data.checked
    });
  },
  methods: {
    onClick: function onClick() {
      if (!this.data.disabled && !this.data.loading) {

        var checked = !this.data.checked;
        this.$emit('input', checked);
        this.$emit('change', checked);
      }
    }
  }
});
export default global['__wxComponents']['vant-weapp/switch/index']
</script>
<style platform="mp-weixin">
@import '../common/index.css';.van-switch{display:inline-block;position:relative;width:2em;height:1em;border:1px solid rgba(0,0,0,.1);border-radius:1em;box-sizing:content-box;background-color:#fff;transition:background-color .3s}.van-switch__node{top:0;left:0;position:absolute;border-radius:100%;width:1em;height:1em;z-index:1;transition:.3s;box-shadow:0 3px 1px 0 rgba(0,0,0,.05),0 2px 2px 0 rgba(0,0,0,.1),0 3px 3px 0 rgba(0,0,0,.05);background-color:#fff}.van-switch__loading{top:25%;left:25%;position:absolute!important}.van-switch--on{background-color:#1989fa}.van-switch--on .van-switch__node{-webkit-transform:translateX(1em);transform:translateX(1em)}.van-switch--disabled{opacity:.4}
</style>