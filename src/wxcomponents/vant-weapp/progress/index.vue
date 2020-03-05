<template>
<uni-shadow-root class="vant-weapp-progress-index"><view class="van-progress custom-class">
  <view :class="'van-progress__portion '+(showPivot && text ? 'van-progress__portion--with-pivot' : '')" :style="portionStyle">
    <view v-if="showPivot && text" :style="pivotStyle" class="van-progress__pivot">
      {{ text }}
    </view>
  </view>
</view></uni-shadow-root>
</template>

<script>

global['__wxRoute'] = 'vant-weapp/progress/index'
import { VantComponent } from '../common/component';
import { BLUE } from '../common/color';
VantComponent({
  props: {
    inactive: Boolean,
    percentage: Number,
    pivotText: String,
    pivotColor: String,
    showPivot: {
      type: Boolean,
      value: true
    },
    color: {
      type: String,
      value: BLUE
    },
    textColor: {
      type: String,
      value: '#fff'
    }
  },
  data: {
    pivotWidth: 0,
    progressWidth: 0
  },
  watch: {
    pivotText: 'getWidth',
    showPivot: 'getWidth'
  },
  computed: {
    portionStyle: function portionStyle() {
      var width = (this.data.progressWidth - this.data.pivotWidth) * this.data.percentage / 100 + 'px';
      var background = this.getCurrentColor();
      return "width: " + width + "; background: " + background + "; ";
    },
    pivotStyle: function pivotStyle() {
      var color = this.data.textColor;
      var background = this.data.pivotColor || this.getCurrentColor();
      return "color: " + color + "; background: " + background;
    },
    text: function text() {
      return this.data.pivotText || this.data.percentage + '%';
    }
  },
  mounted: function mounted() {
    this.getWidth();
  },
  methods: {
    getCurrentColor: function getCurrentColor() {
      return this.data.inactive ? '#cacaca' : this.data.color;
    },
    getWidth: function getWidth() {
      var _this = this;

      this.getRect('.van-progress').then(function (rect) {
        _this.set({
          progressWidth: rect.width
        });
      });
      this.getRect('.van-progress__pivot').then(function (rect) {
        _this.set({
          pivotWidth: rect.width || 0
        });
      });
    }
  }
});
export default global['__wxComponents']['vant-weapp/progress/index']
</script>
<style platform="mp-weixin">
@import '../common/index.css';.van-progress{height:4px;position:relative;border-radius:4px;background:#e5e5e5}.van-progress__portion{left:0;height:100%;position:absolute;border-radius:inherit}.van-progress__portion--with-pivot{border-top-right-radius:0;border-bottom-right-radius:0}.van-progress__pivot{top:50%;right:0;min-width:2em;padding:0 5px;font-size:10px;position:absolute;line-height:1.6;text-align:center;border-radius:1em;word-break:keep-all;box-sizing:border-box;background-color:#e5e5e5;-webkit-transform:translate(100%,-50%);transform:translate(100%,-50%)}
</style>