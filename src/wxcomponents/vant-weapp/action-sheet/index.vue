<template>
<uni-shadow-root class="vant-weapp-action-sheet-index"><van-popup :show="show" position="bottom" :z-index="zIndex" :overlay="overlay" custom-class="van-action-sheet" :safe-area-inset-bottom="safeAreaInsetBottom" :close-on-click-overlay="closeOnClickOverlay" @close="onClose">
  <view v-if="title" class="van-hairline--bottom van-action-sheet__header">
    {{ title }}
    <van-icon name="close" custom-class="van-action-sheet__close" @click="onClose"></van-icon>
  </view>
  <view v-if="actions && actions.length">
    
    <button v-for="(item,index) in (actions)" :key="item.index" :open-type="item.openType" :class="'van-action-sheet__item van-hairline--top '+(item.disabled || item.loading ? 'van-action-sheet__item--disabled' : '')+' '+(item.className || '')" :data-index="index" @click="onSelect">
      <block v-if="(!item.loading)">
        {{ item.name }}
        <text v-if="item.subname" class="van-action-sheet__subname">{{ item.subname }}</text>
      </block>
      <van-loading v-else size="20px"></van-loading>
    </button>
  </view>
  <view v-if="cancelText" class="van-action-sheet__cancel" @click="onCancel">
    {{ cancelText }}
  </view>
  <slot></slot>
</van-popup></uni-shadow-root>
</template>

<script>
import VanIcon from '../icon/index.vue'
import VanPopup from '../popup/index.vue'
import VanLoading from '../loading/index.vue'
global['__wxVueOptions'] = {components:{'van-icon': VanIcon,'van-popup': VanPopup,'van-loading': VanLoading}}

global['__wxRoute'] = 'vant-weapp/action-sheet/index'
import { VantComponent } from '../common/component';
import { iphonex } from '../mixins/iphonex';
VantComponent({
  mixins: [iphonex],
  props: {
    show: Boolean,
    title: String,
    cancelText: String,
    zIndex: {
      type: Number,
      value: 100
    },
    actions: {
      type: Array,
      value: []
    },
    overlay: {
      type: Boolean,
      value: true
    },
    closeOnClickOverlay: {
      type: Boolean,
      value: true
    }
  },
  methods: {
    onSelect: function onSelect(event) {
      var index = event.currentTarget.dataset.index;
      var item = this.data.actions[index];

      if (item && !item.disabled && !item.loading) {
        this.$emit('select', item);
      }
    },
    onCancel: function onCancel() {
      this.$emit('cancel');
    },
    onClose: function onClose() {
      this.$emit('close');
    }
  }
});
export default global['__wxComponents']['vant-weapp/action-sheet/index']
</script>
<style platform="mp-weixin">
@import '../common/index.css';.van-action-sheet{max-height:90%!important;color:#333}.van-action-sheet__cancel,.van-action-sheet__item{height:50px;font-size:16px;line-height:50px;text-align:center;background-color:#fff}.van-action-sheet__cancel:active,.van-action-sheet__item:active{background-color:#e8e8e8}.van-action-sheet__cancel{height:60px}.van-action-sheet__cancel::before{display:block;content:' ';height:10px;background-color:#f8f8f8}.van-action-sheet__item--disabled{color:#c9c9c9}.van-action-sheet__item--disabled:active{background-color:#fff}.van-action-sheet__subname{margin-left:5px;font-size:12px;color:#7d7e80}.van-action-sheet__header{font-size:16px;font-weight:500;line-height:44px;text-align:center}.van-action-sheet__close{position:absolute!important;top:0;right:0;padding:0 15px;font-size:18px!important;line-height:inherit!important;color:#999}
</style>