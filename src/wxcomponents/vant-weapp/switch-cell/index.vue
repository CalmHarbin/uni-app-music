<template>
<uni-shadow-root class="vant-weapp-switch-cell-index"><van-cell center :title="title" :border="border" custom-class="van-switch-cell">
  <van-switch :size="size" :checked="checked" :loading="loading" :disabled="disabled" :active-color="activeColor" :inactive-color="inactiveColor" custom-class="van-switch-cell__switch" @change="onChange"></van-switch>
</van-cell></uni-shadow-root>
</template>

<script>
import VanCell from '../cell/index.vue'
import VanSwitch from '../switch/index.vue'
global['__wxVueOptions'] = {components:{'van-cell': VanCell,'van-switch': VanSwitch}}

global['__wxRoute'] = 'vant-weapp/switch-cell/index'
import { VantComponent } from '../common/component';
VantComponent({
  field: true,
  props: {
    title: String,
    border: Boolean,
    checked: Boolean,
    loading: Boolean,
    disabled: Boolean,
    activeColor: String,
    inactiveColor: String,
    size: {
      type: String,
      value: '24px'
    }
  },
  watch: {
    checked: function checked(value) {
      this.set({
        value: value
      });
    }
  },
  created: function created() {
    this.set({
      value: this.data.checked
    });
  },
  methods: {
    onChange: function onChange(event) {
      this.$emit('change', event.detail);
    }
  }
});
export default global['__wxComponents']['vant-weapp/switch-cell/index']
</script>
<style platform="mp-weixin">
@import '../common/index.css';.van-switch-cell{padding-top:9px;padding-bottom:9px}.van-switch-cell__switch{vertical-align:middle}
</style>