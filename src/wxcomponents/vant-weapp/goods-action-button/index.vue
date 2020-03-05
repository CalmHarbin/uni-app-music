<template>
<uni-shadow-root class="vant-weapp-goods-action-button-index"><van-button square :id="id" size="large" :lang="lang" :type="type" :loading="loading" :disabled="disabled" :open-type="openType" custom-class="custom-class" :session-from="sessionFrom" :app-parameter="appParameter" :send-message-img="sendMessageImg" :send-message-path="sendMessagePath" :show-message-card="showMessageCard" :send-message-title="sendMessageTitle" @click="onClick" @error="bindError" @contact="bindContact" @opensetting="bindOpenSetting" @getuserinfo="bindGetUserInfo" @getphonenumber="bindGetPhoneNumber">
  {{ text }}
</van-button></uni-shadow-root>
</template>

<script>
import VanButton from '../button/index.vue'
global['__wxVueOptions'] = {components:{'van-button': VanButton}}

global['__wxRoute'] = 'vant-weapp/goods-action-button/index'
import { VantComponent } from '../common/component';
import { link } from '../mixins/link';
import { button } from '../mixins/button';
import { openType } from '../mixins/open-type';
VantComponent({
  mixins: [link, button, openType],
  props: {
    text: String,
    loading: Boolean,
    disabled: Boolean,
    type: {
      type: String,
      value: 'danger'
    }
  },
  methods: {
    onClick: function onClick(event) {
      this.$emit('click', event.detail);
      this.jumpLink();
    }
  }
});
export default global['__wxComponents']['vant-weapp/goods-action-button/index']
</script>
<style platform="mp-weixin">
@import '../common/index.css';.vant-weapp-goods-action-button-index{-webkit-flex:1;flex:1}
</style>