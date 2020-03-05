<template>
<uni-shadow-root class="vant-weapp-nav-bar-index"><view :class="'custom-class van-nav-bar '+(border ? 'van-hairline--bottom' : '')+' '+(fixed ? 'van-nav-bar--fixed' : '')" :style="'z-index: '+(zIndex)">
  <view class="van-nav-bar__left" @click="onClickLeft">
    <block v-if="leftArrow || leftText">
      <van-icon v-if="leftArrow" size="16px" name="arrow-left" custom-class="van-nav-bar__arrow"></van-icon>
      <view v-if="leftText" class="van-nav-bar__text">{{ leftText }}</view>
    </block>
    <slot v-else name="left"></slot>
  </view>
  <view class="van-nav-bar__title title-class van-ellipsis">
    <block v-if="title">{{ title }}</block>
    <slot v-else name="title"></slot>
  </view>
  <view class="van-nav-bar__right" @click="onClickRight">
    <view v-if="rightText" class="van-nav-bar__text">{{ rightText }}</view>
    <slot v-else name="right"></slot>
  </view>
</view></uni-shadow-root>
</template>

<script>
import VanIcon from '../icon/index.vue'
global['__wxVueOptions'] = {components:{'van-icon': VanIcon}}

global['__wxRoute'] = 'vant-weapp/nav-bar/index'
import { VantComponent } from '../common/component';
VantComponent({
  classes: ['title-class'],
  props: {
    title: String,
    fixed: Boolean,
    leftText: String,
    rightText: String,
    leftArrow: Boolean,
    border: {
      type: Boolean,
      value: true
    },
    zIndex: {
      type: Number,
      value: 1
    }
  },
  methods: {
    onClickLeft: function onClickLeft() {
      this.$emit('click-left');
    },
    onClickRight: function onClickRight() {
      this.$emit('click-right');
    }
  }
});
export default global['__wxComponents']['vant-weapp/nav-bar/index']
</script>
<style platform="mp-weixin">
@import '../common/index.css';.van-nav-bar{height:46px;position:relative;-webkit-user-select:none;user-select:none;text-align:center;line-height:46px;background-color:#fff}.van-nav-bar__arrow{color:#1989fa;vertical-align:middle}.van-nav-bar__arrow+.van-nav-bar__text{margin-left:-20px;padding-left:25px}.van-nav-bar--fixed{top:0;left:0;width:100%;position:fixed}.van-nav-bar__title{margin:0 auto;max-width:60%;font-size:16px;font-weight:500}.van-nav-bar__left,.van-nav-bar__right{bottom:0;font-size:14px;position:absolute}.van-nav-bar__left{left:15px}.van-nav-bar__right{right:15px}.van-nav-bar__text{color:#1989fa;margin:0 -15px;padding:0 15px;display:inline-block;vertical-align:middle}.van-nav-bar__text:active{background-color:#e8e8e8}
</style>