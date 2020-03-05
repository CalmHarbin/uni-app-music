<template>
<uni-shadow-root class="vant-weapp-collapse-index"><view class="van-collapse van-hairline--top-bottom custom-class">
  <slot></slot>
</view></uni-shadow-root>
</template>

<script>

global['__wxRoute'] = 'vant-weapp/collapse/index'
import { VantComponent } from '../common/component';
VantComponent({
  relation: {
    name: 'collapse-item',
    type: 'descendant',
    linked: function linked(child) {
      this.set({
        items: [].concat(this.data.items, [child])
      }, function () {
        child.updateExpanded();
      });
    }
  },
  props: {
    accordion: Boolean,
    value: null
  },
  data: {
    items: []
  },
  watch: {
    value: function value() {
      this.data.items.forEach(function (child) {
        child.updateExpanded();
      });
    },
    accordion: function accordion() {
      this.data.items.forEach(function (child) {
        child.updateExpanded();
      });
    }
  },
  methods: {
    switch: function _switch(name, expanded) {
      var _this$data = this.data,
          accordion = _this$data.accordion,
          value = _this$data.value;

      if (!accordion) {
        name = expanded ? value.concat(name) : value.filter(function (activeName) {
          return activeName !== name;
        });
      } else {
        name = expanded ? name : '';
      }

      this.$emit('change', name);
      this.$emit('input', name);
    }
  }
});
export default global['__wxComponents']['vant-weapp/collapse/index']
</script>
<style platform="mp-weixin">

</style>