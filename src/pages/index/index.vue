<template>
    <view class="content">
        <van-tabs :active="current" color="#dd001b">
            <van-tab title="推荐">
                <Recommend />
            </van-tab>
            <van-tab title="热歌榜">
                <Hot ref="Hot" />
            </van-tab>
            <van-tab title="搜索">
                <Search />
            </van-tab>
        </van-tabs>
        <SongFooter ref="SongFooter" />
    </view>
</template>

<script>
import Recommend from "../Recommend/index";
import Hot from "../Hot/index";
import Search from "../Search/index";
import SongFooter from "../../components/SongFooter";

export default {
    components: { Recommend, Hot, Search, SongFooter },
    data() {
        return {
            current: 0
        };
    },
    onShow() {
        this.$store.state.audio.onCanplay(() => {
            //更新底部播放的状态
            this.$refs.SongFooter.update();
            //因为vuex不能直接在模板内更新
            this.$refs.SongFooter.updateStore();
            this.$refs.Hot.updateStore();
        });
        //   监听播放和暂停事件
        this.$store.state.audio.onPlay(() => {
            this.$refs.SongFooter.onPlay();
            this.$refs.SongFooter.updateStore();
            this.$refs.Hot.updateStore();
        });
        this.$store.state.audio.onPause(() => {
            this.$refs.SongFooter.onPause();
            this.$refs.SongFooter.updateStore();
            this.$refs.Hot.updateStore();
        });
        if (this.$store.state.audio.id) {
            this.$refs.SongFooter.Draw();
            this.$refs.SongFooter.updateStore();
            this.$refs.Hot.updateStore();
        }
    },
    methods: {}
};
</script>

<style lang='scss' scoped>
/deep/ .van-tab--active {
    color: #dd001b;
}
</style>
