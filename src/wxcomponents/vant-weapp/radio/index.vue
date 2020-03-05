<template>
<uni-shadow-root class="vant-weapp-radio-index"><view class="van-radio custom-class">
  <view class="van-radio__input">
    <radio-group @change="onChange">
      <radio :value="name" :checked="value === name" :disabled="disabled" class="van-radio__control"></radio>
    </radio-group>
    <van-icon :class="utils.bem('radio__icon', { disabled, checked: !disabled && name === value, check: !disabled && name !== value })" custom-class="icon-class" :color="value === name ? checkedColor : ''" :name="value === name ? 'checked' : 'circle'"></van-icon>
  </view>
  <view :class="'van-radio__label van-radio__label--'+(labelPosition)+' label-class'" @click="onClickLabel">
    <slot></slot>
  </view>
</view></uni-shadow-root>
</template>
<wxs src="../wxs/utils.wxs" module="utils"></wxs>
<script>
import VanIcon from '../icon/index.vue'
global['__wxVueOptions'] = {components:{'van-icon': VanIcon}}

global['__wxRoute'] = 'vant-weapp/radio/index'
import { VantComponent } from '../common/component';
VantComponent({
  field: true,
  relation: {
    name: 'radio-group',
    type: 'ancestor'
  },
  classes: ['icon-class', 'label-class'],
  props: {
    name: null,
    value: null,
    disabled: Boolean,
    labelDisabled: Boolean,
    labelPosition: String,
    checkedColor: String
  },
  methods: {
    emitChange: function emitChange(value) {
      var instance = this.getRelationNodes('../radio-group/index')[0] || this;
      instance.$emit('input', value);
      instance.$emit('change', value);
    },
    onChange: function onChange(event) {
      this.emitChange(event.detail.value);
    },
    onClickLabel: function onClickLabel() {
      if (!this.data.disabled && !this.data.labelDisabled) {
        this.emitChange(this.data.name);
      }
    }
  }
});
export default global['__wxComponents']['vant-weapp/radio/index']
</script>
<style platform="mp-weixin">
@import '../common/index.css';.van-radio{overflow:hidden;line-height:1;-webkit-user-select:none;user-select:none}.van-radio__input,.van-radio__label{display:inline-block;vertical-align:middle}.van-radio__input{position:relative;font-size:20px}.van-radio__control{z-index:1;position:absolute;top:0;left:0;width:100%;height:100%;margin:0;opacity:0}.van-radio__label{margin-left:10px;color:#333;font-size:16px;line-height:20px}.van-radio__label--left{margin:0 10px 0 0;float:left}.van-radio__label:empty{margin:0}.van-radio__icon{pointer-events:none;display:block;line-height:0}.van-radio__icon--disabled{color:#e5e5e5}.van-radio__icon--checked{color:#1989fa}.van-radio__icon--check{color:#999}
</style>