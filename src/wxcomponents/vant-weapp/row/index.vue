<template>
<uni-shadow-root class="vant-weapp-row-index"><view class="custom-class van-row" :style="style">
  <slot></slot>
</view></uni-shadow-root>
</template>

<script>

global['__wxRoute'] = 'vant-weapp/row/index'
import { VantComponent } from '../common/component';
VantComponent({
  relation: {
    name: 'col',
    type: 'descendant',
    linked: function linked(target) {
      if (this.data.gutter) {
        target.setGutter(this.data.gutter);
      }
    }
  },
  props: {
    gutter: Number
  },
  watch: {
    gutter: 'setGutter'
  },
  mounted: function mounted() {
    if (this.data.gutter) {
      this.setGutter();
    }
  },
  methods: {
    setGutter: function setGutter() {
      var _this = this;

      var gutter = this.data.gutter;
      var margin = "-" + Number(gutter) / 2 + "px";
      var style = gutter ? "margin-right: " + margin + "; margin-left: " + margin + ";" : '';
      this.set({
        style: style
      });
      this.getRelationNodes('../col/index').forEach(function (col) {
        col.setGutter(_this.data.gutter);
      });
    }
  }
});
export default global['__wxComponents']['vant-weapp/row/index']
</script>
<style platform="mp-weixin">
@import '../common/index.css';.van-row::after{content:"";display:table;clear:both}
</style>