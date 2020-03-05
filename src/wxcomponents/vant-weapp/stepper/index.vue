<template>
<uni-shadow-root class="vant-weapp-stepper-index"><view class="van-stepper custom-class">
  <view :class="'minus-class van-stepper__minus '+(minusDisabled ? 'van-stepper__minus--disabled' : '')" @click="onMinus"></view>
  <view :class="'input-class van-stepper__input-wrapper '+(disabled || disableInput ? 'van-stepper__input-wrapper--disabled' : '')" @click="onFocus">
    <input :type="integer ? 'number' : 'digit'" class="van-stepper__input" :value="value" :focus="focus" :disabled="disabled || disableInput" @input="onInput" @blur="onBlur"></input>
  </view>
  <view :class="'plus-class van-stepper__plus '+(plusDisabled ? 'van-stepper__plus--disabled' : '')" @click="onPlus"></view>
</view></uni-shadow-root>
</template>

<script>

global['__wxRoute'] = 'vant-weapp/stepper/index'
import { VantComponent } from '../common/component'; // Note that the bitwise operators and shift operators operate on 32-bit ints
// so in that case, the max safe integer is 2^31-1, or 2147483647

var MAX = 2147483647;
VantComponent({
  field: true,
  classes: ['input-class', 'plus-class', 'minus-class'],
  props: {
    value: null,
    integer: Boolean,
    disabled: Boolean,
    asyncChange: Boolean,
    disableInput: Boolean,
    min: {
      type: null,
      value: 1
    },
    max: {
      type: null,
      value: MAX
    },
    step: {
      type: null,
      value: 1
    }
  },
  computed: {
    minusDisabled: function minusDisabled() {
      return this.data.disabled || this.data.value <= this.data.min;
    },
    plusDisabled: function plusDisabled() {
      return this.data.disabled || this.data.value >= this.data.max;
    }
  },
  watch: {
    value: function value(_value) {
      if (_value !== '') {
        this.set({
          value: this.range(_value)
        });
      }
    }
  },
  data: {
    focus: false
  },
  created: function created() {
    this.set({
      value: this.range(this.data.value)
    });
  },
  methods: {
    onFocus: function onFocus() {
      this.setData({
        focus: true
      });
    },
    // limit value range
    range: function range(value) {
      return Math.max(Math.min(this.data.max, value), this.data.min);
    },
    onInput: function onInput(event) {
      var _ref = event.detail || {},
          _ref$value = _ref.value,
          value = _ref$value === void 0 ? '' : _ref$value;

      this.triggerInput(value);
    },
    onChange: function onChange(type) {
      if (this.data[type + "Disabled"]) {
        this.$emit('overlimit', type);
        return;
      }

      var diff = type === 'minus' ? -this.data.step : +this.data.step;
      var value = Math.round((this.data.value + diff) * 100) / 100;
      this.triggerInput(this.range(value));
      this.$emit(type);
    },
    onBlur: function onBlur(event) {
      var value = this.range(this.data.value);
      this.triggerInput(value);
      this.$emit('blur', event);
    },
    onMinus: function onMinus() {
      this.onChange('minus');
    },
    onPlus: function onPlus() {
      this.onChange('plus');
    },
    triggerInput: function triggerInput(value) {
      this.set({
        value: this.data.asyncChange ? this.data.value : value
      });
      this.$emit('change', value);
    }
  }
});
export default global['__wxComponents']['vant-weapp/stepper/index']
</script>
<style platform="mp-weixin">
@import '../common/index.css';.van-stepper{font-size:0}.van-stepper__input-wrapper,.van-stepper__minus,.van-stepper__plus{display:inline-block;vertical-align:middle;background-color:#fff}.van-stepper__minus,.van-stepper__plus{position:relative;width:40px;height:30px;padding:5px;border:1px solid #eee;box-sizing:border-box}.van-stepper__minus::before,.van-stepper__plus::before{width:9px;height:1px}.van-stepper__minus::after,.van-stepper__plus::after{width:1px;height:9px}.van-stepper__minus::after,.van-stepper__minus::before,.van-stepper__plus::after,.van-stepper__plus::before{position:absolute;top:0;right:0;bottom:0;left:0;margin:auto;background-color:#7d7e80;content:''}.van-stepper__minus:active,.van-stepper__plus:active{background-color:#e8e8e8}.van-stepper__minus--disabled,.van-stepper__plus--disabled{background-color:#f8f8f8}.van-stepper__minus--disabled::after,.van-stepper__minus--disabled::before,.van-stepper__plus--disabled::after,.van-stepper__plus--disabled::before{background-color:#c9c9c9}.van-stepper__minus--disabled:active,.van-stepper__plus--disabled:active{background-color:#f8f8f8}.van-stepper__minus{border-radius:2px 0 0 2px}.van-stepper__minus::after{display:none}.van-stepper__plus{border-radius:0 2px 2px 0}.van-stepper__input-wrapper{position:relative;width:35px;height:30px;padding:1px;font-size:14px;color:#7d7e80;text-align:center;border:1px solid #eee;border-width:1px 0;border-radius:0;box-sizing:border-box}.van-stepper__input-wrapper--disabled{color:#c9c9c9;background-color:#f8f8f8}.van-stepper__input{position:absolute;top:50%;left:50%;width:100%;min-height:0;-webkit-transform:translate3d(-50%,-50%,0);transform:translate3d(-50%,-50%,0);-webkit-appearance:none;appearance:none}
</style>