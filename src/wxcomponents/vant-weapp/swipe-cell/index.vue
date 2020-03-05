<template>
<uni-shadow-root class="vant-weapp-swipe-cell-index"><view class="van-swipe-cell" data-key="cell" @click="onClick" @touchstart="startDrag" @touchmove="onDrag" @touchend="endDrag" @touchcancel="endDrag">
  <view :style="wrapperStyle" @transitionend="onTransitionend">
    <view v-if="leftWidth" class="van-swipe-cell__left" data-key="left" @click.stop.prevent="onClick">
      <slot name="left"></slot>
    </view>
    <slot></slot>
    <view v-if="rightWidth" class="van-swipe-cell__right" data-key="right" @click.stop.prevent="onClick">
      <slot name="right"></slot>
    </view>
  </view>
</view></uni-shadow-root>
</template>

<script>

global['__wxRoute'] = 'vant-weapp/swipe-cell/index'
import { VantComponent } from '../common/component';
import { touch } from '../mixins/touch';
var THRESHOLD = 0.15;
VantComponent({
  props: {
    disabled: Boolean,
    leftWidth: {
      type: Number,
      value: 0
    },
    rightWidth: {
      type: Number,
      value: 0
    },
    asyncClose: Boolean
  },
  mixins: [touch],
  data: {
    offset: 0,
    draging: false
  },
  computed: {
    wrapperStyle: function wrapperStyle() {
      var _this$data = this.data,
          offset = _this$data.offset,
          draging = _this$data.draging;
      var transform = "translate3d(" + offset + "px, 0, 0)";
      var transition = draging ? 'none' : '.6s cubic-bezier(0.18, 0.89, 0.32, 1)';
      return "\n        -webkit-transform: " + transform + ";\n        -webkit-transition: " + transition + ";\n        transform: " + transform + ";\n        transition: " + transition + ";\n      ";
    }
  },
  methods: {
    onTransitionend: function onTransitionend() {
      this.swipe = false;
    },
    open: function open(position) {
      var _this$data2 = this.data,
          leftWidth = _this$data2.leftWidth,
          rightWidth = _this$data2.rightWidth;
      var offset = position === 'left' ? leftWidth : -rightWidth;
      this.swipeMove(offset);
      this.resetSwipeStatus();
    },
    close: function close() {
      this.set({
        offset: 0
      });
    },
    resetSwipeStatus: function resetSwipeStatus() {
      this.swiping = false;
      this.opened = true;
    },
    swipeMove: function swipeMove(offset) {
      if (offset === void 0) {
        offset = 0;
      }

      this.set({
        offset: offset
      });
      offset && (this.swiping = true);
      !offset && (this.opened = false);
    },
    swipeLeaveTransition: function swipeLeaveTransition(direction) {
      var _this$data3 = this.data,
          offset = _this$data3.offset,
          leftWidth = _this$data3.leftWidth,
          rightWidth = _this$data3.rightWidth;
      var threshold = this.opened ? 1 - THRESHOLD : THRESHOLD; // right

      if (direction > 0 && -offset > rightWidth * threshold && rightWidth > 0) {
        this.open('right'); // left
      } else if (direction < 0 && offset > leftWidth * threshold && leftWidth > 0) {
        this.open('left');
      } else {
        this.swipeMove();
      }
    },
    startDrag: function startDrag(event) {
      if (this.data.disabled) {
        return;
      }

      this.set({
        draging: true
      });
      this.touchStart(event);

      if (this.opened) {
        this.startX -= this.data.offset;
      }
    },
    onDrag: function onDrag(event) {
      if (this.data.disabled) {
        return;
      }

      this.touchMove(event);
      var deltaX = this.deltaX;
      var _this$data4 = this.data,
          leftWidth = _this$data4.leftWidth,
          rightWidth = _this$data4.rightWidth;

      if (deltaX < 0 && (-deltaX > rightWidth || !rightWidth) || deltaX > 0 && (deltaX > leftWidth || deltaX > 0 && !leftWidth)) {
        return;
      }

      if (this.direction === 'horizontal') {
        this.swipeMove(deltaX);
      }
    },
    endDrag: function endDrag() {
      if (this.data.disabled) {
        return;
      }

      this.set({
        draging: false
      });

      if (this.swiping) {
        this.swipeLeaveTransition(this.data.offset > 0 ? -1 : 1);
      }
    },
    onClick: function onClick(event) {
      var _event$currentTarget$ = event.currentTarget.dataset.key,
          position = _event$currentTarget$ === void 0 ? 'outside' : _event$currentTarget$;
      this.$emit('click', position);

      if (!this.data.offset) {
        return;
      }

      if (this.data.asyncClose) {
        this.$emit('close', {
          position: position,
          instance: this
        });
      } else {
        this.swipeMove(0);
      }
    }
  }
});
export default global['__wxComponents']['vant-weapp/swipe-cell/index']
</script>
<style platform="mp-weixin">
@import '../common/index.css';.van-swipe-cell{position:relative;overflow:hidden}.van-swipe-cell__left,.van-swipe-cell__right{position:absolute;top:0;height:100%}.van-swipe-cell__left{left:0;-webkit-transform:translate3d(-100%,0,0);transform:translate3d(-100%,0,0)}.van-swipe-cell__right{right:0;-webkit-transform:translate3d(100%,0,0);transform:translate3d(100%,0,0)}
</style>