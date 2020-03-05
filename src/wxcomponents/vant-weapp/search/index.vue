<template>
<uni-shadow-root class="vant-weapp-search-index"><view :class="'van-search custom-class '+(showAction || useActionSlot ? 'van-search--show-action' : '')" :style="'background: '+(background)">
  <van-field clearable type="search" left-icon="search" :focus="focus" :error="error" :border="false" confirm-type="search" class="van-search__field field-class" :value="value" :disabled="disabled" :readonly="readony" :maxlength="maxlength" :input-align="inputAlign" input-class="input-class" :placeholder="placeholder" :placeholder-style="placeholderStyle" custom-style="padding: 3px 10px" @blur="onBlur" @focus="onFocus" @change="onChange" @confirm="onSearch" @clear="onClear"></van-field>
  <view v-if="showAction || useActionSlot" class="van-search__action">
    <slot v-if="useActionSlot" name="action"></slot>
    <view v-else @click="onCancel" class="cancel-class">取消</view>
  </view>
</view></uni-shadow-root>
</template>

<script>
import VanIcon from '../icon/index.vue'
import VanField from '../field/index.vue'
global['__wxVueOptions'] = {components:{'van-icon': VanIcon,'van-field': VanField}}

global['__wxRoute'] = 'vant-weapp/search/index'
import { VantComponent } from '../common/component';
VantComponent({
    field: true,
    classes: ['field-class', 'input-class', 'cancel-class'],
    props: {
        focus: Boolean,
        error: Boolean,
        disabled: Boolean,
        readonly: Boolean,
        inputAlign: String,
        showAction: Boolean,
        useActionSlot: Boolean,
        placeholder: String,
        placeholderStyle: String,
        background: {
            type: String,
            value: '#f2f2f2'
        },
        maxlength: {
            type: Number,
            value: -1
        }
    },
    methods: {
        onChange: function onChange(event) {
            this.set({
                value: event.detail
            });
            this.$emit('change', event.detail);
        },
        onCancel: function onCancel() {
            this.set({
                value: ''
            });
            this.$emit('cancel');
            this.$emit('change', '');
        },
        onSearch: function onSearch() {
            this.$emit('search', this.data.value);
        },
        onFocus: function onFocus() {
            this.$emit('focus');
        },
        onBlur: function onBlur() {
            this.$emit('blur');
        },
        onClear: function onClear() {
            this.$emit('clear');
        }
    }
});
export default global['__wxComponents']['vant-weapp/search/index']
</script>
<style platform="mp-weixin">
@import '../common/index.css';.van-search{display:-webkit-flex;display:flex;padding:7px 15px;-webkit-align-items:center;align-items:center;box-sizing:border-box}.van-search__field{overflow:hidden;border-radius:4px;-webkit-flex:1;flex:1}.van-search__field__left-icon{color:#999}.van-search--show-action{padding-right:0}.van-search input::-webkit-search-cancel-button,.van-search input::-webkit-search-decoration,.van-search input::-webkit-search-results-button,.van-search input::-webkit-search-results-decoration{display:none}.van-search__action{padding:0 10px;font-size:14px;line-height:30px;color:#7d7e80}.van-search__action:active{background-color:#e8e8e8}
</style>