<template>
<uni-shadow-root class="vant-weapp-cell-index"><view :class="'custom-class '+(utils.bem('cell', [size, { center, required, borderless: !border, clickable: isLink || clickable }]))" :style="customStyle" @click="onClick">
  <van-icon v-if="icon" :name="icon" class="van-cell__left-icon-wrap" custom-class="van-cell__left-icon"></van-icon>
  <slot v-else name="icon"></slot>

  <view :style="titleWidth ? 'max-width:' + titleWidth + ';min-width:' + titleWidth : ''" class="van-cell__title title-class">
    <block v-if="title">
      {{ title }}
      <view v-if="label" class="van-cell__label label-class">{{ label }}</view>
    </block>
    <slot v-else name="title"></slot>
  </view>

  <view class="van-cell__value value-class">
    <block v-if="value || value === 0">{{ value }}</block>
    <slot v-else></slot>
  </view>

  <van-icon v-if="isLink" :name="arrowDirection ? 'arrow' + '-' + arrowDirection : 'arrow'" class="van-cell__right-icon-wrap right-icon-class" custom-class="van-cell__right-icon"></van-icon>
  <slot v-else name="right-icon"></slot>

  <slot name="extra"></slot>
</view></uni-shadow-root>
</template>
<wxs src="../wxs/utils.wxs" module="utils"></wxs>
<script>
import VanIcon from '../icon/index.vue'
global['__wxVueOptions'] = {components:{'van-icon': VanIcon}}

global['__wxRoute'] = 'vant-weapp/cell/index'
import { link } from '../mixins/link';
import { VantComponent } from '../common/component';
VantComponent({
  classes: ['title-class', 'label-class', 'value-class', 'right-icon-class'],
  mixins: [link],
  props: {
    title: null,
    value: null,
    icon: String,
    size: String,
    label: String,
    center: Boolean,
    isLink: Boolean,
    required: Boolean,
    clickable: Boolean,
    titleWidth: String,
    customStyle: String,
    arrowDirection: String,
    border: {
      type: Boolean,
      value: true
    }
  },
  methods: {
    onClick: function onClick(event) {
      this.$emit('click', event.detail);
      this.jumpLink();
    }
  }
});
export default global['__wxComponents']['vant-weapp/cell/index']
</script>
<style platform="mp-weixin">
@import '../common/index.css';.van-cell{width:100%;display:-webkit-flex;display:flex;padding:10px 15px;box-sizing:border-box;line-height:24px;position:relative;background-color:#fff;color:#333;font-size:14px}.van-cell::after{content:' ';position:absolute;pointer-events:none;box-sizing:border-box;-webkit-transform-origin:center;transform-origin:center;top:auto;left:15px;right:0;bottom:0;-webkit-transform:scaleY(.5);transform:scaleY(.5);border-bottom:1px solid #eee}.van-cell--borderless::after{display:none}.van-cell-group{background-color:#fff}.van-cell__label{color:#999;font-size:12px;margin-top:3px;line-height:18px}.van-cell__title,.van-cell__value{-webkit-flex:1;flex:1}.van-cell__title:empty,.van-cell__value:empty{display:none}.van-cell__value{color:#999;overflow:hidden;text-align:right;vertical-align:middle}.van-cell__left-icon-wrap,.van-cell__right-icon-wrap{display:-webkit-flex;display:flex;-webkit-align-items:center;align-items:center;height:24px;font-size:16px}.van-cell__left-icon-wrap{margin-right:5px}.van-cell__right-icon-wrap{margin-left:5px;color:#999}.van-cell__left-icon{line-height:24px;vertical-align:middle}.van-cell__right-icon{line-height:24px}.van-cell--clickable:active{background-color:#e8e8e8}.van-cell--required{overflow:visible}.van-cell--required::before{content:'*';position:absolute;left:7px;font-size:14px;color:#f44}.van-cell--center{-webkit-align-items:center;align-items:center}.van-cell--large{padding-top:12px;padding-bottom:12px}.van-cell--large .van-cell__title{font-size:16px}.van-cell--large .van-cell__label{font-size:14px}
</style>