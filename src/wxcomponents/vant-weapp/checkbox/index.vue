<template>
<uni-shadow-root class="vant-weapp-checkbox-index"><view class="van-checkbox custom-class">
  <view class="van-checkbox__icon-wrap" @click="toggle">
    <slot v-if="useIconSlot" name="icon"></slot>
    <van-icon v-else name="success" :class="utils.bem('checkbox__icon', [shape, { disabled, checked: value }])" :style="checkedColor && value && !disabled ? 'border-color:' + checkedColor + '; background-color:' + checkedColor : ''" custom-class="icon-class" custom-style="line-height: 20px;"></van-icon>
  </view>
  <view :class="'label-class '+(utils.bem('checkbox__label', [labelPosition, { disabled }]))" @click="onClickLabel">
    <slot></slot>
  </view>
</view></uni-shadow-root>
</template>
<wxs src="../wxs/utils.wxs" module="utils"></wxs>
<script>
import VanIcon from '../icon/index.vue'
global['__wxVueOptions'] = {components:{'van-icon': VanIcon}}

global['__wxRoute'] = 'vant-weapp/checkbox/index'
import { VantComponent } from '../common/component';
VantComponent({
  field: true,
  relation: {
    name: 'checkbox-group',
    type: 'ancestor'
  },
  classes: ['icon-class', 'label-class'],
  props: {
    value: null,
    disabled: Boolean,
    useIconSlot: Boolean,
    checkedColor: String,
    labelPosition: String,
    labelDisabled: Boolean,
    shape: {
      type: String,
      value: 'round'
    }
  },
  methods: {
    emitChange: function emitChange(value) {
      var parent = this.getRelationNodes('../checkbox-group/index')[0];

      if (parent) {
        this.setParentValue(parent, value);
      } else {
        this.$emit('input', value);
        this.$emit('change', value);
      }
    },
    toggle: function toggle() {
      if (!this.data.disabled) {
        this.emitChange(!this.data.value);
      }
    },
    onClickLabel: function onClickLabel() {
      if (!this.data.disabled && !this.data.labelDisabled) {
        this.emitChange(!this.data.value);
      }
    },
    setParentValue: function setParentValue(parent, value) {
      var parentValue = parent.data.value.slice();
      var name = this.data.name;

      if (value) {
        if (parent.data.max && parentValue.length >= parent.data.max) {
          return;
        }
        /* istanbul ignore else */


        if (parentValue.indexOf(name) === -1) {
          parentValue.push(name);
          parent.$emit('input', parentValue);
          parent.$emit('change', parentValue);
        }
      } else {
        var index = parentValue.indexOf(name);
        /* istanbul ignore else */

        if (index !== -1) {
          parentValue.splice(index, 1);
          parent.$emit('input', parentValue);
          parent.$emit('change', parentValue);
        }
      }
    }
  }
});
export default global['__wxComponents']['vant-weapp/checkbox/index']
</script>
<style platform="mp-weixin">
@import '../common/index.css';.van-checkbox{overflow:hidden;-webkit-user-select:none;user-select:none}.van-checkbox__icon-wrap,.van-checkbox__label{display:inline-block;line-height:20px;vertical-align:middle}.van-checkbox__icon{display:block;font-size:14px;width:20px;height:20px;color:transparent;text-align:center;box-sizing:border-box;border:1px solid #e5e5e5;transition:.2s}.van-checkbox__icon--round{border-radius:100%}.van-checkbox__icon--checked{color:#fff;border-color:#1989fa;background-color:#1989fa}.van-checkbox__icon--disabled{border-color:#c9c9c9;background-color:#eee}.van-checkbox__icon--disabled.van-checkbox__icon--checked{color:#c9c9c9}.van-checkbox__label{color:#333;margin-left:10px}.van-checkbox__label--left{float:left;margin:0 10px 0 0}.van-checkbox__label--disabled{color:#c9c9c9}.van-checkbox__label:empty{margin:0}
</style>