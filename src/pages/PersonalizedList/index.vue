<template>
    <View class="PersonalizedList">
        <!-- 推荐歌单 -->
        <View class="cell-title">
            {{ title }}
            <van-icon name="arrow" size="20px" color="#999" />
        </View>
        <View class="cell-SongSheet">
            <SongSheet
                v-for="(item, index) in list"
                :key="index"
                :Oid="item.id"
                :name="item.name"
                :picUrl="item.picUrl + '?imageView&thumbnail=250x0'"
                :playCount="item.playCount"
            />
        </View>
    </View>
</template>

<script>
import { getPersonalized, toplist } from "../../api/index";
import SongSheet from "../../components/SongSheet";
export default {
    components: { SongSheet },
    data() {
        return {
            list: [],
            title: ""
        };
    },
    onLoad(params) {
        uni.showLoading({
            title: "loading"
        });
        if (params.name === "推荐歌单") {
            this.getPersonalized();
        } else if (params.name === "排行榜") {
            this.toplist();
        }
    },
    methods: {
        /**
         * 推荐歌单
         * @method getPersonalized
         * @return {undefined}
         */
        getPersonalized() {
            getPersonalized().then(res => {
                let arr = [];
                for (let item of res.result) {
                    arr.push({
                        id: item.id,
                        name: item.name,
                        picUrl: item.picUrl,
                        playCount: item.playCount
                    });
                }
                this.list = arr;
                this.title = "推荐音乐";
                uni.hideLoading();
            });
        },
        /**
         * 榜单
         * @method toplist
         * @return {undefined}
         */
        toplist() {
            toplist().then(res => {
                let arr = [];
                for (let item of res.list) {
                    arr.push({
                        id: item.id,
                        name: item.name,
                        picUrl: item.coverImgUrl,
                        playCount: item.playCount
                    });
                }
                this.list = arr;
                this.title = "排行榜";
                uni.hideLoading();
            });
        }
    }
};
</script>

<style lang='scss' scoped>
van-icon {
    position: relative;
    top: 5px;
}
.PersonalizedList {
    padding: 10px;
    .cell-SongSheet {
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
    }
    .cell-title {
        font-size: 32rpx;
    }
}
</style>