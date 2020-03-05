<template>
<uni-shadow-root class="vant-weapp-notice-bar-index"><view v-if="show" :class="'custom-class van-notice-bar '+(hasRightIcon ? 'van-notice-bar--within-icon' : '')" :style="'color: '+(color)+';background-color: '+(backgroundColor)" @click="onClick">
  <view v-if="leftIcon" class="van-notice-bar__left-icon">
    <image :src="leftIcon"></image>
  </view>
  <view class="van-notice-bar__content-wrap">
    <view :class="'van-notice-bar__content '+(scrollable ? '' : 'van-ellipsis')" :animation="animationData">
      {{ text }}
    </view>
  </view>

  <block v-if="mode">
    <van-icon v-if="mode === 'closeable'" class="van-notice-bar__right-icon" name="cross" @click.native="onClickIcon"></van-icon>
    <navigator v-if="mode === 'link'" :url="url" :open-type="openType">
      <van-icon class="van-notice-bar__right-icon" name="arrow"></van-icon>
    </navigator>
  </block>
</view></uni-shadow-root>
</template>

<script>
import VanIcon from '../icon/index.vue'
global['__wxVueOptions'] = {components:{'van-icon': VanIcon}}

global['__wxRoute'] = 'vant-weapp/notice-bar/index'
import { VantComponent } from '../common/component';
var FONT_COLOR = '#ed6a0c';
var BG_COLOR = '#fffbe8';
VantComponent({
  props: {
    text: {
      type: String,
      value: ''
    },
    mode: {
      type: String,
      value: ''
    },
    url: {
      type: String,
      value: ''
    },
    openType: {
      type: String,
      value: 'navigate'
    },
    delay: {
      type: Number,
      value: 0
    },
    speed: {
      type: Number,
      value: 50
    },
    scrollable: {
      type: Boolean,
      value: true
    },
    leftIcon: {
      type: String,
      value: ''
    },
    color: {
      type: String,
      value: FONT_COLOR
    },
    backgroundColor: {
      type: String,
      value: BG_COLOR
    }
  },
  data: {
    show: true,
    hasRightIcon: false,
    width: undefined,
    wrapWidth: undefined,
    elapse: undefined,
    animation: null,
    resetAnimation: null,
    timer: null
  },
  watch: {
    text: function text() {
      this.set({}, this.init);
    }
  },
  created: function created() {
    if (this.data.mode) {
      this.set({
        hasRightIcon: true
      });
    }
  },
  destroyed: function destroyed() {
    var timer = this.data.timer;
    timer && clearTimeout(timer);
  },
  methods: {
    init: function init() {
      var _this = this;

      this.getRect('.van-notice-bar__content').then(function (rect) {
        if (!rect || !rect.width) {
          return;
        }

        _this.set({
          width: rect.width
        });

        _this.getRect('.van-notice-bar__content-wrap').then(function (rect) {
          if (!rect || !rect.width) {
            return;
          }

          var wrapWidth = rect.width;
          var _this$data = _this.data,
              width = _this$data.width,
              speed = _this$data.speed,
              scrollable = _this$data.scrollable,
              delay = _this$data.delay;

          if (scrollable && wrapWidth < width) {
            var elapse = width / speed * 1000;
            var animation = wx.createAnimation({
              duration: elapse,
              timeingFunction: 'linear',
              delay: delay
            });
            var resetAnimation = wx.createAnimation({
              duration: 0,
              timeingFunction: 'linear'
            });

            _this.set({
              elapse: elapse,
              wrapWidth: wrapWidth,
              animation: animation,
              resetAnimation: resetAnimation
            }, function () {
              _this.scroll();
            });
          }
        });
      });
    },
    scroll: function scroll() {
      var _this2 = this;

      var _this$data2 = this.data,
          animation = _this$data2.animation,
          resetAnimation = _this$data2.resetAnimation,
          wrapWidth = _this$data2.wrapWidth,
          elapse = _this$data2.elapse,
          speed = _this$data2.speed;
      resetAnimation.translateX(wrapWidth).step();
      var animationData = animation.translateX(-(elapse * speed) / 1000).step();
      this.set({
        animationData: resetAnimation.export()
      });
      setTimeout(function () {
        _this2.set({
          animationData: animationData.export()
        });
      }, 100);
      var timer = setTimeout(function () {
        _this2.scroll();
      }, elapse);
      this.set({
        timer: timer
      });
    },
    onClickIcon: function onClickIcon() {
      var timer = this.data.timer;
      timer && clearTimeout(timer);
      this.set({
        show: false,
        timer: null
      });
    },
    onClick: function onClick(event) {
      this.$emit('click', event);
    }
  }
});
export default global['__wxComponents']['vant-weapp/notice-bar/index']
</script>
<style platform="mp-weixin">
@import '../common/index.css';.van-notice-bar{display:-webkit-flex;display:flex;height:40px;padding:0 15px;font-size:14px;line-height:24px;-webkit-align-items:center;align-items:center}.van-notice-bar--within-icon{position:relative;padding-right:40px}.van-notice-bar__left-icon{height:18px;min-width:20px;box-sizing:border-box}.van-notice-bar__left-icon>image{width:16px;height:16px}.van-notice-bar__right-icon{position:absolute;top:10px;right:15px;font-size:16px}.van-notice-bar__content-wrap{-webkit-flex:1;flex:1;height:24px;overflow:hidden;position:relative}.van-notice-bar__content{position:absolute;white-space:nowrap}.van-notice-bar__content.van-ellipsis{max-width:100%}
</style>