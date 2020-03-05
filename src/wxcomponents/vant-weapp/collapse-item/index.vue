<template>
<uni-shadow-root class="vant-weapp-collapse-item-index"><view class="van-collapse-item van-hairline--top custom-class">
  <van-cell :title="title" :icon="icon" :is-link="isLink" :value="value" :label="label" :border="border && expanded" :class="utils.bem('collapse-item__title', { disabled, expanded })" right-icon-class="van-cell__right-icon" custom-class="van-cell" @click="onClick">
    <slot name="title" slot="title"></slot>
    <slot name="icon" slot="icon"></slot>
    <slot name="value"></slot>
    <slot name="right-icon" slot="right-icon"></slot>
  </van-cell>
  <view class="van-collapse-item__wrapper" :style="'height: '+(contentHeight)+';'" :animation="animationData" @transitionend="onTransitionEnd">
    <view class="van-collapse-item__content content-class">
      <slot></slot>
    </view>
  </view>
</view></uni-shadow-root>
</template>
<wxs src="../wxs/utils.wxs" module="utils"></wxs>
<script>
import VanCell from '../cell/index.vue'
global['__wxVueOptions'] = {components:{'van-cell': VanCell}}

global['__wxRoute'] = 'vant-weapp/collapse-item/index'
import { VantComponent } from '../common/component';
VantComponent({
  classes: ['content-class'],
  relation: {
    name: 'collapse',
    type: 'ancestor',
    linked: function linked(parent) {
      this.parent = parent;
    }
  },
  props: {
    name: null,
    title: null,
    value: null,
    icon: String,
    label: String,
    disabled: Boolean,
    border: {
      type: Boolean,
      value: true
    },
    isLink: {
      type: Boolean,
      value: true
    }
  },
  data: {
    contentHeight: 0,
    expanded: false
  },
  beforeCreate: function beforeCreate() {
    this.animation = wx.createAnimation({
      duration: 300,
      timingFunction: 'ease-in-out'
    });
  },
  methods: {
    updateExpanded: function updateExpanded() {
      if (!this.parent) {
        return null;
      }

      var _this$parent$data = this.parent.data,
          value = _this$parent$data.value,
          accordion = _this$parent$data.accordion,
          items = _this$parent$data.items;
      var name = this.data.name;
      var index = items.indexOf(this);
      var currentName = name == null ? index : name;
      var expanded = accordion ? value === currentName : value.some(function (name) {
        return name === currentName;
      });

      if (expanded !== this.data.expanded) {
        this.updateStyle(expanded);
      }

      this.set({
        expanded: expanded
      });
    },
    updateStyle: function updateStyle(expanded) {
      var _this = this;

      this.getRect('.van-collapse-item__content').then(function (res) {
        var animationData = _this.animation.height(expanded ? res.height : 0).step().export();

        if (expanded) {
          _this.set({
            animationData: animationData
          });
        } else {
          _this.set({
            contentHeight: res.height + 'px'
          }, function () {
            setTimeout(function () {
              _this.set({
                animationData: animationData
              });
            }, 20);
          });
        }
      });
    },
    onClick: function onClick() {
      if (this.data.disabled) {
        return;
      }

      var _this$data = this.data,
          name = _this$data.name,
          expanded = _this$data.expanded;
      var index = this.parent.data.items.indexOf(this);
      var currentName = name == null ? index : name;
      this.parent.switch(currentName, !expanded);
    },
    onTransitionEnd: function onTransitionEnd() {
      if (this.data.expanded) {
        this.set({
          contentHeight: 'auto'
        });
      }
    }
  }
});
export default global['__wxComponents']['vant-weapp/collapse-item/index']
</script>
<style platform="mp-weixin">
@import '../common/index.css';.van-collapse-item__title .van-cell__right-icon{-webkit-transform:rotate(90deg);transform:rotate(90deg);transition:.3s}.van-collapse-item__title--expanded .van-cell__right-icon{-webkit-transform:rotate(-90deg);transform:rotate(-90deg)}.van-collapse-item__title--disabled .van-cell,.van-collapse-item__title--disabled .van-cell__right-icon{color:#c9c9c9!important}.van-collapse-item__title--disabled .van-cell:active{background-color:#fff!important}.van-collapse-item__wrapper{overflow:hidden}.van-collapse-item__content{color:#999;padding:15px;font-size:13px;line-height:1.5;background-color:#fff}
</style>