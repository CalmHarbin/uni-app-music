<template>
<uni-shadow-root class="vant-weapp-tree-select-index"><view class="van-tree-select" :style="'height: '+(mainHeight)+'px'">
  <scroll-view scroll-y class="van-tree-select__nav">
    <view v-for="(item,index) in (items)" :key="item.index" :class="'van-ellipsis main-item-class '+(utils.bem('tree-select__nitem', { active: mainActiveIndex === index, disabled: item.disabled }))+' '+(mainActiveIndex === index ? 'main-active-class' : '')+' '+(item.disabled ? 'main-disabled-class' : '')" :data-index="index" @click="onClickNav">
      {{ item.text }}
    </view>
  </scroll-view>
  <scroll-view scroll-y class="van-tree-select__content" :style="'height: '+(itemHeight)+'px'">
    <view v-for="(item,index) in (subItems)" :key="item.id" :class="'van-ellipsis van-hairline--bottom content-item-class '+(utils.bem('tree-select__item', { active: activeId === item.id, disabled: item.disabled }))+' '+(activeId === item.id ? 'content-active-class' : '')+' '+(item.disabled ? 'content-disabled-class' : '')" :data-item="item" @click="onSelectItem">
      {{ item.text }}
      <van-icon v-if="activeId === item.id" name="checked" size="16px" class="van-tree-select__selected"></van-icon>
    </view>
  </scroll-view>
</view></uni-shadow-root>
</template>
<wxs src="../wxs/utils.wxs" module="utils"></wxs>
<script>
import VanIcon from '../icon/index.vue'
import VanCell from '../cell/index.vue'
global['__wxVueOptions'] = {components:{'van-icon': VanIcon,'van-cell': VanCell}}

global['__wxRoute'] = 'vant-weapp/tree-select/index'
import { VantComponent } from '../common/component';
var ITEM_HEIGHT = 44;
VantComponent({
  classes: ['main-item-class', 'content-item-class', 'main-active-class', 'content-active-class', 'main-disabled-class', 'content-disabled-class'],
  props: {
    items: Array,
    mainActiveIndex: {
      type: Number,
      value: 0
    },
    activeId: {
      type: [Number, String]
    },
    maxHeight: {
      type: Number,
      value: 300
    }
  },
  data: {
    subItems: [],
    mainHeight: 0,
    itemHeight: 0
  },
  watch: {
    items: function items() {
      this.updateSubItems();
      this.updateMainHeight();
    },
    maxHeight: function maxHeight() {
      this.updateItemHeight();
      this.updateMainHeight();
    },
    mainActiveIndex: 'updateSubItems'
  },
  methods: {
    // 当一个子项被选择时
    onSelectItem: function onSelectItem(event) {
      var item = event.currentTarget.dataset.item;

      if (!item.disabled) {
        this.$emit('click-item', item);
      }
    },
    // 当一个导航被点击时
    onClickNav: function onClickNav(event) {
      var index = event.currentTarget.dataset.index;
      var item = this.data.items[index];

      if (!item.disabled) {
        this.$emit('click-nav', {
          index: index
        });
      }
    },
    // 更新子项列表
    updateSubItems: function updateSubItems() {
      var selectedItem = this.data.items[this.data.mainActiveIndex] || {};
      this.set({
        subItems: selectedItem.children || []
      });
      this.updateItemHeight();
    },
    // 更新组件整体高度，根据最大高度和当前组件需要展示的高度来决定
    updateMainHeight: function updateMainHeight() {
      var maxHeight = Math.max(this.data.items.length * ITEM_HEIGHT, this.data.subItems.length * ITEM_HEIGHT);
      this.set({
        mainHeight: Math.min(maxHeight, this.data.maxHeight)
      });
    },
    // 更新子项列表高度，根据可展示的最大高度和当前子项列表的高度决定
    updateItemHeight: function updateItemHeight() {
      this.set({
        itemHeight: Math.min(this.data.subItems.length * ITEM_HEIGHT, this.data.maxHeight)
      });
    }
  }
});
export default global['__wxComponents']['vant-weapp/tree-select/index']
</script>
<style platform="mp-weixin">
@import '../common/index.css';.van-tree-select{position:relative;font-size:14px;-webkit-user-select:none;user-select:none}.van-tree-select__nav{position:absolute;top:0;bottom:0;left:0;width:35%;min-width:120px;background-color:#fafafa}.van-tree-select__nitem{position:relative;padding:0 9px 0 15px;line-height:44px}.van-tree-select__nitem--active::after,.van-tree-select__nitem:active::after{position:absolute;top:0;bottom:0;left:0;width:3.6px;background-color:#f44;content:''}.van-tree-select__nitem--active{font-weight:700;background-color:#fff}.van-tree-select__nitem--disabled{color:#999}.van-tree-select__nitem--disabled:active::after{display:none}.van-tree-select__content{width:65%;padding-left:15px;margin-left:35%;background-color:#fff;box-sizing:border-box}.van-tree-select__item{position:relative;font-weight:700;line-height:44px}.van-tree-select__item--active,.van-tree-select__item:active{color:#f44}.van-tree-select__item--disabled,.van-tree-select__item--disabled:active{color:#999}.van-tree-select__selected{position:absolute;top:0;right:15px;bottom:0;height:24px;margin:auto 0;line-height:24px}
</style>