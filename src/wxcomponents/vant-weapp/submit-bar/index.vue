<template>
<uni-shadow-root class="vant-weapp-submit-bar-index"><view class="van-submit-bar custom-class">
  <slot name="top"></slot>

  <view v-if="tip" class="van-submit-bar__tip">
    {{ tipStr }}<slot name="tip"></slot>
  </view>

  <view :class="'bar-class '+(utils.bem('submit-bar__bar', { safe: safeAreaInsetBottom && isIPhoneX }))">
    <slot></slot>
    <view class="van-submit-bar__text">
      <block v-if="hasPrice">
        <text>{{ label || '合计：' }}</text>
        <text class="van-submit-bar__price price-class">
          <text class="van-submit-bar__currency">{{ currency }}</text> {{ priceStr }}
        </text>
      </block>
    </view>
    <van-button square size="large" :type="buttonType" :loading="loading" :disabled="disabled" class="van-submit-bar__button" custom-class="button-class" @click="onSubmit">
      {{ loading ? '' : buttonText }}
    </van-button>
  </view>
</view></uni-shadow-root>
</template>
<wxs src="../wxs/utils.wxs" module="utils"></wxs>
<script>
import VanButton from '../button/index.vue'
global['__wxVueOptions'] = {components:{'van-button': VanButton}}

global['__wxRoute'] = 'vant-weapp/submit-bar/index'
import { VantComponent } from '../common/component';
import { iphonex } from '../mixins/iphonex';
VantComponent({
  mixins: [iphonex],
  classes: ['bar-class', 'price-class', 'button-class'],
  props: {
    tip: null,
    type: Number,
    price: null,
    label: String,
    loading: Boolean,
    disabled: Boolean,
    buttonText: String,
    currency: {
      type: String,
      value: '¥'
    },
    buttonType: {
      type: String,
      value: 'danger'
    }
  },
  computed: {
    hasPrice: function hasPrice() {
      return typeof this.data.price === 'number';
    },
    priceStr: function priceStr() {
      return (this.data.price / 100).toFixed(2);
    },
    tipStr: function tipStr() {
      var tip = this.data.tip;
      return typeof tip === 'string' ? tip : '';
    }
  },
  methods: {
    onSubmit: function onSubmit(event) {
      this.$emit('submit', event.detail);
    }
  }
});
export default global['__wxComponents']['vant-weapp/submit-bar/index']
</script>
<style platform="mp-weixin">
@import '../common/index.css';.van-submit-bar{z-index:100;position:fixed;bottom:0;left:0;width:100%;-webkit-user-select:none;user-select:none}.van-submit-bar__tip{padding:10px;color:#f56723;font-size:12px;line-height:18px;background-color:#fff7cc}.van-submit-bar__bar{display:-webkit-flex;display:flex;-webkit-align-items:center;align-items:center;height:50px;background-color:#fff;font-size:14px}.van-submit-bar__bar--safe{padding-bottom:34px}.van-submit-bar__text{-webkit-flex:1;flex:1;color:#333;font-weight:500;text-align:right}.van-submit-bar__price{color:#f44;font-size:18px;padding-right:12px}.van-submit-bar__currency{font-size:14px}.van-submit-bar__button button{width:110px}
</style>