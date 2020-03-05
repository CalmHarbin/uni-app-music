<template>
<uni-shadow-root class="vant-weapp-tabs-index"><view :class="'custom-class van-tabs van-tabs--'+(type)">
  <view :style="'z-index: '+(zIndex)+'; '+(wrapStyle)" :class="'van-tabs__wrap '+(scrollable ? 'van-tabs__wrap--scrollable' : '')+' '+(type === 'line' && border ? 'van-hairline--top-bottom' : '')">
    <scroll-view :scroll-x="scrollable" scroll-with-animation :scroll-left="scrollLeft" :class="'van-tabs__scroll--'+(type)" :style="color ? 'border-color: ' + color : ''">
      <view :class="'van-tabs__nav van-tabs__nav--'+(type)">
        <view v-if="type === 'line'" class="van-tabs__line" :style="lineStyle"></view>
        <view v-for="(item,index) in (tabs)" :key="item.index" :data-index="index" :class="'van-ellipsis '+(utils.bem('tab', { active: index === active, disabled: item.disabled }))" :style="(color && index !== active && type === 'card' && !item.disabled ? 'color: ' + color : '')+' '+(color && index === active && type === 'card' ? ';background-color:' + color : '')+' '+(color ? ';border-color: ' + color : '')+' '+(scrollable ? ';flex-basis:' + (88 / swipeThreshold) + '%' : '')" @click="onTap">
          <view :class="'van-ellipsis '+(utils.bem('tab__title', { dot: item.dot }))" :style="item.titleStyle">
            {{ item.title }}
            <van-info v-if="item.info !== null" :info="item.info" custom-class="van-tab__title__info"></van-info>
          </view>
        </view>
      </view>
    </scroll-view>
  </view>
  <view class="van-tabs__content" @touchstart="onTouchStart" @touchmove="onTouchMove" @touchend="onTouchEnd" @touchcancel="onTouchEnd">
    <view class="van-tabs__track" :style="trackStyle">
      <slot></slot>
    </view>
  </view>
</view></uni-shadow-root>
</template>
<wxs src="../wxs/utils.wxs" module="utils"></wxs>
<script>
import VanInfo from '../info/index.vue'
global['__wxVueOptions'] = {components:{'van-info': VanInfo}}

global['__wxRoute'] = 'vant-weapp/tabs/index'
import { VantComponent } from '../common/component';
import { touch } from '../mixins/touch';
VantComponent({
  mixins: [touch],
  relation: {
    name: 'tab',
    type: 'descendant',
    linked: function linked(child) {
      this.child.push(child);
      this.updateTabs(this.data.tabs.concat(child.data));
    },
    unlinked: function unlinked(child) {
      var index = this.child.indexOf(child);
      var tabs = this.data.tabs;
      tabs.splice(index, 1);
      this.child.splice(index, 1);
      this.updateTabs(tabs);
    }
  },
  props: {
    color: String,
    lineWidth: {
      type: Number,
      value: -1
    },
    active: {
      type: Number,
      value: 0
    },
    type: {
      type: String,
      value: 'line'
    },
    border: {
      type: Boolean,
      value: true
    },
    duration: {
      type: Number,
      value: 0.3
    },
    zIndex: {
      type: Number,
      value: 1
    },
    swipeThreshold: {
      type: Number,
      value: 4
    },
    animated: Boolean,
    sticky: Boolean,
    offsetTop: {
      type: Number,
      value: 0
    },
    swipeable: Boolean,
    scrollTop: {
      type: Number,
      value: 0
    }
  },
  data: {
    tabs: [],
    lineStyle: '',
    scrollLeft: 0,
    scrollable: false,
    trackStyle: '',
    wrapStyle: '',
    position: ''
  },
  watch: {
    swipeThreshold: function swipeThreshold() {
      this.set({
        scrollable: this.child.length > this.data.swipeThreshold
      });
    },
    color: 'setLine',
    lineWidth: 'setLine',
    active: 'setActiveTab',
    animated: 'setTrack',
    scrollTop: 'onScroll',
    offsetTop: 'setWrapStyle'
  },
  beforeCreate: function beforeCreate() {
    this.child = [];
  },
  mounted: function mounted() {
    this.setLine();
    this.setTrack();
    this.scrollIntoView();
  },
  methods: {
    updateTabs: function updateTabs(tabs) {
      tabs = tabs || this.data.tabs;
      this.set({
        tabs: tabs,
        scrollable: tabs.length > this.data.swipeThreshold
      });
      this.setActiveTab();
    },
    trigger: function trigger(eventName, index) {
      this.$emit(eventName, {
        index: index,
        title: this.data.tabs[index].title
      });
    },
    onTap: function onTap(event) {
      var index = event.currentTarget.dataset.index;

      if (this.data.tabs[index].disabled) {
        this.trigger('disabled', index);
      } else {
        this.trigger('click', index);
        this.setActive(index);
      }
    },
    setActive: function setActive(active) {
      if (active !== this.data.active) {
        this.trigger('change', active);
        this.set({
          active: active
        });
        this.setActiveTab();
      }
    },
    setLine: function setLine() {
      var _this = this;

      if (this.data.type !== 'line') {
        return;
      }

      var _this$data = this.data,
          color = _this$data.color,
          active = _this$data.active,
          duration = _this$data.duration,
          lineWidth = _this$data.lineWidth;
      this.getRect('.van-tab', true).then(function (rects) {
        var rect = rects[active];
        var width = lineWidth !== -1 ? lineWidth : rect.width / 2;
        var left = rects.slice(0, active).reduce(function (prev, curr) {
          return prev + curr.width;
        }, 0);
        left += (rect.width - width) / 2;

        _this.set({
          lineStyle: "\n            width: " + width + "px;\n            background-color: " + color + ";\n            -webkit-transform: translateX(" + left + "px);\n            -webkit-transition-duration: " + duration + "s;\n            transform: translateX(" + left + "px);\n            transition-duration: " + duration + "s;\n          "
        });
      });
    },
    setTrack: function setTrack() {
      var _this2 = this;

      var _this$data2 = this.data,
          animated = _this$data2.animated,
          active = _this$data2.active,
          duration = _this$data2.duration;
      if (!animated) return '';
      this.getRect('.van-tabs__content').then(function (rect) {
        var width = rect.width;

        _this2.set({
          trackStyle: "\n            width: " + width * _this2.child.length + "px;\n            left: " + -1 * active * width + "px;\n            transition: left " + duration + "s;\n            display: flex;\n          "
        });

        _this2.setTabsProps({
          width: width,
          animated: animated
        });
      });
    },
    setTabsProps: function setTabsProps(props) {
      this.child.forEach(function (item) {
        item.set(props);
      });
    },
    setActiveTab: function setActiveTab() {
      var _this3 = this;

      this.child.forEach(function (item, index) {
        var data = {
          active: index === _this3.data.active
        };

        if (data.active) {
          data.inited = true;
        }

        if (data.active !== item.data.active) {
          item.set(data);
        }
      });
      this.set({}, function () {
        _this3.setLine();

        _this3.setTrack();

        _this3.scrollIntoView();
      });
    },
    // scroll active tab into view
    scrollIntoView: function scrollIntoView() {
      var _this4 = this;

      if (!this.data.scrollable) {
        return;
      }

      this.getRect('.van-tab', true).then(function (tabRects) {
        var tabRect = tabRects[_this4.data.active];
        var offsetLeft = tabRects.slice(0, _this4.data.active).reduce(function (prev, curr) {
          return prev + curr.width;
        }, 0);
        var tabWidth = tabRect.width;

        _this4.getRect('.van-tabs__nav').then(function (navRect) {
          var navWidth = navRect.width;

          _this4.set({
            scrollLeft: offsetLeft - (navWidth - tabWidth) / 2
          });
        });
      });
    },
    onTouchStart: function onTouchStart(event) {
      if (!this.data.swipeable) return;
      this.touchStart(event);
    },
    onTouchMove: function onTouchMove(event) {
      if (!this.data.swipeable) return;
      this.touchMove(event);
    },
    // watch swipe touch end
    onTouchEnd: function onTouchEnd() {
      if (!this.data.swipeable) return;
      var _this$data3 = this.data,
          active = _this$data3.active,
          tabs = _this$data3.tabs;
      var direction = this.direction,
          deltaX = this.deltaX,
          offsetX = this.offsetX;
      var minSwipeDistance = 50;

      if (direction === 'horizontal' && offsetX >= minSwipeDistance) {
        if (deltaX > 0 && active !== 0) {
          this.setActive(active - 1);
        } else if (deltaX < 0 && active !== tabs.length - 1) {
          this.setActive(active + 1);
        }
      }
    },
    setWrapStyle: function setWrapStyle() {
      var _this$data4 = this.data,
          offsetTop = _this$data4.offsetTop,
          position = _this$data4.position;
      var wrapStyle;

      switch (position) {
        case 'top':
          wrapStyle = "\n            top: " + offsetTop + "px;\n            position: fixed;\n          ";
          break;

        case 'bottom':
          wrapStyle = "\n            top: auto;\n            bottom: 0;\n          ";
          break;

        default:
          wrapStyle = '';
      } // cut down `set`


      if (wrapStyle === this.data.wrapStyle) return;
      this.set({
        wrapStyle: wrapStyle
      });
    },
    // adjust tab position
    onScroll: function onScroll(scrollTop) {
      var _this5 = this;

      if (!this.data.sticky) return;
      var offsetTop = this.data.offsetTop;
      this.getRect('.van-tabs').then(function (rect) {
        var top = rect.top,
            height = rect.height;

        _this5.getRect('.van-tabs__wrap').then(function (rect) {
          var wrapHeight = rect.height;
          var position = '';

          if (offsetTop > top + height - wrapHeight) {
            position = 'bottom';
          } else if (offsetTop > top) {
            position = 'top';
          }

          _this5.$emit('scroll', {
            scrollTop: scrollTop + offsetTop,
            isFixed: position === 'top'
          });

          if (position !== _this5.data.position) {
            _this5.set({
              position: position
            }, function () {
              _this5.setWrapStyle();
            });
          }
        });
      });
    }
  }
});
export default global['__wxComponents']['vant-weapp/tabs/index']
</script>
<style platform="mp-weixin">
@import '../common/index.css';.van-tabs{position:relative;-webkit-tap-highlight-color:transparent}.van-tabs__wrap{position:absolute;top:0;right:0;left:0}.van-tabs__wrap--page-top{position:fixed}.van-tabs__wrap--content-bottom{top:auto;bottom:0}.van-tabs__wrap--scrollable .van-tab{-webkit-flex:0 0 22%;flex:0 0 22%}.van-tabs__scroll--card{border:1px solid #f44;border-radius:2px}.van-tabs__nav{position:relative;display:-webkit-flex;display:flex;background-color:#fff;-webkit-user-select:none;user-select:none}.van-tabs__nav--line{height:100%}.van-tabs__nav--card{height:30px}.van-tabs__nav--card .van-tab{line-height:30px;color:#f44;border-right:1px solid #f44}.van-tabs__nav--card .van-tab:last-child{border-right:none}.van-tabs__nav--card .van-tab.van-tab--active{color:#fff;background-color:#f44}.van-tabs__line{position:absolute;bottom:0;left:0;z-index:1;height:2px;background-color:#f44;border-radius:2px}.van-tabs--line{padding-top:44px}.van-tabs--line .van-tabs__wrap{height:44px}.van-tabs--card{padding-top:30px;margin:0 15px}.van-tabs--card .van-tabs__wrap{height:30px}.van-tabs__content{overflow:hidden}.van-tabs__track{position:relative}.van-tab{position:relative;min-width:0;padding:0 5px;font-size:14px;line-height:44px;color:#7d7e80;text-align:center;cursor:pointer;background-color:#fff;box-sizing:border-box;-webkit-flex:1;flex:1}.van-tab--active{font-weight:500;color:#333}.van-tab--disabled{color:#c9c9c9}.van-tab__title--dot::after{display:inline-block;width:8px;height:8px;vertical-align:middle;background-color:#f44;border-radius:100%;content:''}.van-tab__title__info{position:relative!important;top:-1px!important;display:inline-block;-webkit-transform:translateX(0)!important;transform:translateX(0)!important}
</style>