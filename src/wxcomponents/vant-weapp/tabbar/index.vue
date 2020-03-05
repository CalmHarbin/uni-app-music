<template>
<uni-shadow-root class="vant-weapp-tabbar-index"><view :class="'custom-class van-hairline--top-bottom '+(utils.bem('tabbar', { fixed, safe: isIPhoneX && safeAreaInsetBottom }))" :style="zIndex ? 'z-index: ' + zIndex : ''">
  <slot></slot>
</view></uni-shadow-root>
</template>
<wxs src="../wxs/utils.wxs" module="utils"></wxs>
<script>

global['__wxRoute'] = 'vant-weapp/tabbar/index'
import { VantComponent } from '../common/component';
import { iphonex } from '../mixins/iphonex';
VantComponent({
  mixins: [iphonex],
  relation: {
    name: 'tabbar-item',
    type: 'descendant',
    linked: function linked(target) {
      var _this = this;

      this.data.items.push(target);
      setTimeout(function () {
        _this.setActiveItem();
      });
    },
    unlinked: function unlinked(target) {
      var _this2 = this;

      this.data.items = this.data.items.filter(function (item) {
        return item !== target;
      });
      setTimeout(function () {
        _this2.setActiveItem();
      });
    }
  },
  props: {
    active: Number,
    activeColor: String,
    fixed: {
      type: Boolean,
      value: true
    },
    zIndex: {
      type: Number,
      value: 1
    }
  },
  data: {
    items: [],
    currentActive: -1
  },
  watch: {
    active: function active(_active) {
      this.set({
        currentActive: _active
      });
      this.setActiveItem();
    }
  },
  created: function created() {
    this.set({
      currentActive: this.data.active
    });
  },
  methods: {
    setActiveItem: function setActiveItem() {
      var _this3 = this;

      this.data.items.forEach(function (item, index) {
        item.setActive({
          active: index === _this3.data.currentActive,
          color: _this3.data.activeColor
        });
      });
    },
    onChange: function onChange(child) {
      var active = this.data.items.indexOf(child);

      if (active !== this.data.currentActive && active !== -1) {
        this.$emit('change', active);
        this.set({
          currentActive: active
        });
        this.setActiveItem();
      }
    }
  }
});
export default global['__wxComponents']['vant-weapp/tabbar/index']
</script>
<style platform="mp-weixin">
@import '../common/index.css';.van-tabbar{display:-webkit-flex;display:flex;width:100%;height:50px;background-color:#fff}.van-tabbar--fixed{position:fixed;bottom:0;left:0}.van-tabbar--safe{padding-bottom:34px}
</style>