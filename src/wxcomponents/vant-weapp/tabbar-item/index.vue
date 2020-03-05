<template>
<uni-shadow-root class="vant-weapp-tabbar-item-index"><view :class="'van-tabbar-item '+(active ? 'van-tabbar-item--active' : '')" :style="active && color ? 'color: ' + color : ''" @click="onClick">
  <view :class="'van-tabbar-item__icon '+(dot ? 'van-tabbar-item__icon--dot' : '')">
    <van-icon v-if="icon" :name="icon" customStyle="display: block"></van-icon>
    <block v-else>
      <slot v-if="active" name="icon-active"></slot>
      <slot v-else name="icon"></slot>
    </block>
    <van-info v-if="info !== null" :info="info" custom-style="margin-top: 2px"></van-info>
  </view>
  <view class="van-tabbar-item__text">
    <slot></slot>
  </view>
</view></uni-shadow-root>
</template>

<script>
import VanIcon from '../icon/index.vue'
import VanInfo from '../info/index.vue'
global['__wxVueOptions'] = {components:{'van-icon': VanIcon,'van-info': VanInfo}}

global['__wxRoute'] = 'vant-weapp/tabbar-item/index'
import { VantComponent } from '../common/component';
VantComponent({
  props: {
    info: null,
    icon: String,
    dot: Boolean
  },
  relation: {
    name: 'tabbar',
    type: 'ancestor'
  },
  data: {
    active: false
  },
  methods: {
    onClick: function onClick() {
      var parent = this.getRelationNodes('../tabbar/index')[0];

      if (parent) {
        parent.onChange(this);
      }

      this.$emit('click');
    },
    setActive: function setActive(_ref) {
      var active = _ref.active,
          color = _ref.color;

      if (this.data.active !== active) {
        this.set({
          active: active,
          color: color
        });
      }
    }
  }
});
export default global['__wxComponents']['vant-weapp/tabbar-item/index']
</script>
<style platform="mp-weixin">
@import '../common/index.css';.vant-weapp-tabbar-item-index{-webkit-flex:1;flex:1}.van-tabbar-item{color:#7d7e80;height:100%;display:-webkit-flex;display:flex;line-height:1;font-size:12px;-webkit-align-items:center;align-items:center;-webkit-flex-direction:column;flex-direction:column;-webkit-justify-content:center;justify-content:center}.van-tabbar-item__icon{font-size:18px;margin-bottom:5px;position:relative}.van-tabbar-item__icon--dot::after{top:0;right:-8px;width:8px;height:8px;content:' ';position:absolute;border-radius:100%;background-color:#f44}.van-tabbar-item__icon image{width:30px;height:18px;display:block}.van-tabbar-item--active{color:#1989fa}
</style>