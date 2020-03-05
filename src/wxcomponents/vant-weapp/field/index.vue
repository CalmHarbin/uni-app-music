<template>
<uni-shadow-root class="vant-weapp-field-index"><van-cell :icon="leftIcon" :title="label" :center="center" :border="border" :is-link="isLink" :required="required" :custom-style="customStyle" :title-width="titleWidth" custom-class="van-field">
  <slot name="left-icon" slot="icon"></slot>
  <slot name="label" slot="title"></slot>
  <view :class="'van-field__body '+(type === 'textarea' ? 'van-field__body--textarea' : '')">
    <textarea v-if="type === 'textarea'" :class="'input-class '+(utils.bem('field__input', [inputAlign, { disabled, error }]))" :fixed="fixed" :focus="focus" :value="value" :disabled="disabled || readonly" :maxlength="maxlength" :auto-height="autosize" :placeholder="placeholder" :placeholder-style="placeholderStyle" :placeholder-class="error ? 'van-field__input--error' : 'van-field__placeholder'" :cursor-spacing="cursorSpacing" :adjust-position="adjustPosition" :show-confirm-bar="showConfirmBar" @input="onInput" @blur="onBlur" @focus="onFocus" @confirm="onConfirm"></textarea>
    <input v-else :class="'input-class '+(utils.bem('field__input', [inputAlign, { disabled, error }]))" :type="type" :focus="focus" :value="value" :disabled="disabled || readonly" :maxlength="maxlength" :placeholder="placeholder" :placeholder-style="placeholderStyle" :placeholder-class="error ? 'van-field__input--error' : 'van-field__placeholder'" :confirm-type="confirmType" :confirm-hold="confirmHold" :cursor-spacing="cursorSpacing" :adjust-position="adjustPosition" @input="onInput" @blur="onBlur" @focus="onFocus" @confirm="onConfirm"></input>
    <van-icon v-if="showClear" size="16px" name="clear" class="van-field__clear-root" custom-class="van-field__clear" @touchstart.native="onClear"></van-icon>
    <view class="van-field__icon-container" v-if="icon || useIconSlot" @click="onClickIcon">
      <van-icon v-if="icon" size="16px" :name="icon" :custom-class="'van-field__icon '+(iconClass)"></van-icon>
      <slot v-else name="icon"></slot>
    </view>
    <view v-if="useButtonSlot" class="van-field__button">
      <slot name="button"></slot>
    </view>
  </view>
  <view v-if="errorMessage" class="van-field__error-message">
    {{ errorMessage }}
  </view>
</van-cell></uni-shadow-root>
</template>
<wxs src="../wxs/utils.wxs" module="utils"></wxs>
<script>
import VanCell from '../cell/index.vue'
import VanIcon from '../icon/index.vue'
global['__wxVueOptions'] = {components:{'van-cell': VanCell,'van-icon': VanIcon}}

global['__wxRoute'] = 'vant-weapp/field/index'
import { VantComponent } from '../common/component';
VantComponent({
  field: true,
  classes: ['input-class'],
  props: {
    icon: String,
    label: String,
    error: Boolean,
    fixed: Boolean,
    focus: Boolean,
    center: Boolean,
    isLink: Boolean,
    leftIcon: String,
    disabled: Boolean,
    autosize: Boolean,
    readonly: Boolean,
    required: Boolean,
    iconClass: String,
    clearable: Boolean,
    inputAlign: String,
    customClass: String,
    confirmType: String,
    confirmHold: Boolean,
    errorMessage: String,
    placeholder: String,
    customStyle: String,
    useIconSlot: Boolean,
    useButtonSlot: Boolean,
    showConfirmBar: {
      type: Boolean,
      value: true
    },
    placeholderStyle: String,
    adjustPosition: {
      type: Boolean,
      value: true
    },
    cursorSpacing: {
      type: Number,
      value: 50
    },
    maxlength: {
      type: Number,
      value: -1
    },
    type: {
      type: String,
      value: 'text'
    },
    border: {
      type: Boolean,
      value: true
    },
    titleWidth: {
      type: String,
      value: '90px'
    }
  },
  data: {
    showClear: false
  },
  beforeCreate: function beforeCreate() {
    this.focused = false;
  },
  methods: {
    onInput: function onInput(event) {
      var _this = this;

      var _ref = event.detail || {},
          _ref$value = _ref.value,
          value = _ref$value === void 0 ? '' : _ref$value;

      this.set({
        value: value,
        showClear: this.getShowClear(value)
      }, function () {
        _this.$emit('input', value);

        _this.$emit('change', value);
      });
    },
    onFocus: function onFocus(event) {
      var _ref2 = event.detail || {},
          _ref2$value = _ref2.value,
          value = _ref2$value === void 0 ? '' : _ref2$value,
          _ref2$height = _ref2.height,
          height = _ref2$height === void 0 ? 0 : _ref2$height;

      this.$emit('focus', {
        value: value,
        height: height
      });
      this.focused = true;
      this.set({
        showClear: this.getShowClear()
      });
    },
    onBlur: function onBlur(event) {
      var _ref3 = event.detail || {},
          _ref3$value = _ref3.value,
          value = _ref3$value === void 0 ? '' : _ref3$value,
          _ref3$cursor = _ref3.cursor,
          cursor = _ref3$cursor === void 0 ? 0 : _ref3$cursor;

      this.$emit('blur', {
        value: value,
        cursor: cursor
      });
      this.focused = false;
      this.set({
        showClear: this.getShowClear()
      });
    },
    onClickIcon: function onClickIcon() {
      this.$emit('click-icon');
    },
    getShowClear: function getShowClear(value) {
      value = value === undefined ? this.data.value : value;
      return this.data.clearable && this.focused && value && !this.data.readonly;
    },
    onClear: function onClear() {
      var _this2 = this;

      this.set({
        value: '',
        showClear: this.getShowClear('')
      }, function () {
        _this2.$emit('input', '');

        _this2.$emit('change', '');

        _this2.$emit('clear', '');
      });
    },
    onConfirm: function onConfirm() {
      this.$emit('confirm', this.data.value);
    }
  }
});
export default global['__wxComponents']['vant-weapp/field/index']
</script>
<style platform="mp-weixin">
@import '../common/index.css';.van-field__body{display:-webkit-flex;display:flex;-webkit-align-items:center;align-items:center}.van-field__body--textarea{min-height:24px}.van-field__input{border:0;margin:0;padding:0;width:100%;height:24px;resize:none;display:block;text-align:left;min-height:24px;color:#333;line-height:inherit;box-sizing:border-box;background-color:transparent}.van-field__input--disabled{opacity:1;color:#999;background-color:transparent}.van-field__input--center{text-align:center}.van-field__input--right{text-align:right}.van-field__input--error{color:#f44}.van-field__placeholder{color:#999}.van-field__clear-root{height:24px}.van-field__button,.van-field__clear,.van-field__icon-container{-webkit-flex-shrink:0;flex-shrink:0}.van-field__clear,.van-field__icon-container{padding:0 10px;line-height:inherit;margin-right:-10px;vertical-align:middle}.van-field__clear{color:#c9c9c9}.van-field__icon-container{color:#999}.van-field__icon{display:block!important}.van-field__button{padding-left:10px}.van-field__error-message{color:#f44;font-size:12px;text-align:left}
</style>