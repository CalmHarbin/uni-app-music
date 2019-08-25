<template>
    <view class="content">
        <van-tabs :active="current" bind:click="" color="#dd001b">
            <van-tab title="推荐">
                <Recommend />
            </van-tab>
            <van-tab title="热歌榜">
                <Hot />
            </van-tab>
            <van-tab title="搜索">内容 3</van-tab>
        </van-tabs>
    </view>
</template>

<script>
import Recommend from '../Recommend/index'
import Hot from '../Hot/index'

export default {
    components: { Recommend, Hot },
    data() {
        return {
            title: "Hello",
            current: 0
        };
    },
    onLoad() {
        console.log(111)
    },
    methods: {}
}
</script>

<style lang='scss' scoped>
/deep/ .van-tab--active{
    color: #dd001b;
}
</style>
