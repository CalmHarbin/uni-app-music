<template>
    <View class="Search">
        <van-search
            :value="search"
            :use-action-slot="true"
            shape="round"
            background="#fff"
            custom-class="aaaaaaaaaa"
            @change="onChange"
            @cancel="onConfirm"
            @search="onConfirm"
            @clear="onChange"
        >
            <view slot="action" class="btn" @click="onConfirm">搜索</view>
        </van-search>

        <View class="tagBox" v-if="!SongList.length">
            <View class="hot">热门搜索</View>
            <View>
                <van-tag
                    :round="true"
                    color="#f7f7f7"
                    text-color="#666"
                    custom-class="tag"
                    v-for="(item, index) in hotList"
                    :key="index"
                    circle
                    @click.native="hotSearch(item)"
                >
                    {{ item }}
                </van-tag>
            </View>
        </View>

        <scroll-view
            class="scrollview"
            scrollY
            scrollWithAnimation
            scrollTop="0"
            lowerThreshold="20"
            @scrolltolower="scroll"
        >
            <View
                class="item"
                v-for="(item, index) in SongList"
                :key="index"
                @click="go(item)"
            >
                <View class="left">{{ index + 1 }}</View>
                <View class="box">
                    <View class="middle">
                        <View class="ellipsis">{{ item.name }}</View>
                        <Text class="ellipsis">
                            {{
                                item.ar
                                    .map(i => {
                                        return i.name;
                                    })
                                    .join(" ") +
                                    " -" +
                                    item.al.name
                            }}
                        </Text>
                    </View>
                </View>
            </View>
        </scroll-view>
    </View>
</template>

<script>
import { searchHot, search } from "../../api/index";
import VanSearch from "../../wxcomponents/vant-weapp/search/index";
import VanTag from "../../wxcomponents/vant-weapp/tag/index";

export default {
    components: { VanSearch, VanTag },
    data() {
        return {
            search: "",
            rows: 100, //每页数量
            page: 1, //当前页
            total: 0, //总数
            SongList: [],
            hotList: []
        };
    },
    created() {
        console.log(this.$store.state);
        searchHot().then(res => {
            for (let item of res.result.hots) {
                this.hotList.push(item.first);
            }
        });
    },
    methods: {
        /**
         * 输入内容改变
         * @method onChange
         * @return {undefined}
         */
        onChange(value) {
            if (!value) {
                this.SongList = [];
                this.search = value;
                return;
            }
            this.search = value;
        },
        /**
         * 搜索
         * @method onConfirm
         * @return {undefined}
         */
        onConfirm() {
            if (!this.search) {
                this.SongList = [];
                return;
            }
            uni.showLoading({
                title: "loading"
            });
            search({
                keywords: this.search,
                limit: this.rows,
                offset: 1
            }).then(res => {
                let arr = [];
                if (!res.result.songs) {
                    uni.hideLoading();
                    uni.showToast({
                        title: "没有找到歌曲",
                        icon: "none",
                        duration: 1000
                    });
                    return;
                }
                for (let item of res.result.songs) {
                    arr.push({
                        al: {
                            picUrl: item.album.artist.img1v1Url,
                            name: item.album.name
                        },
                        ar: item.artists,
                        name: item.name,
                        id: item.id
                    });
                }
                this.total = res.result.songCount;
                this.page = 2;
                this.SongList = arr;

                uni.hideLoading();
            });
        },
        /**
         * 搜索
         * @method hotSearch
         * @return {undefined}
         */
        hotSearch(text) {
            uni.showLoading({
                title: "loading"
            });
            search({ keywords: text, limit: this.rows, offset: 1 }).then(
                res => {
                    if (!res.result.songs) {
                        uni.hideLoading();
                        uni.showToast({
                            title: "没有找到歌曲",
                            icon: "none",
                            duration: 1000
                        });
                        return;
                    }
                    let arr = [...this.SongList];
                    for (let item of res.result.songs) {
                        arr.push({
                            al: {
                                picUrl: item.album.artist.img1v1Url,
                                name: item.album.name
                            },
                            ar: item.artists,
                            name: item.name,
                            id: item.id
                        });
                    }
                    this.total = res.result.songCount;
                    this.page = 2;
                    this.SongList = arr;
                    this.search = text;
                    uni.hideLoading();
                }
            );
        },
        /**
         * 跳转到歌曲详情页
         * @method go
         * @param {Object} item 当前歌曲的详细信息
         * @return {undefined}
         */
        go(item) {
            //如歌没有播放歌曲 或者 播放的不是当前歌曲,则播放当前歌曲
            if (
                !this.$store.state.song ||
                this.$store.state.song.id !== item.id
            ) {
                this.$store.dispatch("setGlobalData", {
                    key: "song",
                    value: item
                });
            }
            //更新播放列表
            this.$store.dispatch("setGlobalData", {
                key: "songList",
                value: this.SongList
            });

            //设置为顺序播放
            this.$store.dispatch("setGlobalData", { key: "mode", value: 2 });

            uni.navigateTo({
                url: `/pages/Song/index?id=${item.id}`
            });
            this.onConfirm();
        },

        scroll(e) {
            // console.log(e)
            if (Math.ceil(this.total / this.rows) < this.page) {
                uni.showToast({
                    title: "没有更多了",
                    icon: "none",
                    duration: 1000
                });
                return;
            }
            uni.showLoading({
                title: "loading"
            });
            search({
                keywords: this.search,
                limit: this.rows,
                offset: this.page
            }).then(res => {
                if (!res.result.songs) {
                    uni.hideLoading();
                    uni.showToast({
                        title: "没有找到歌曲",
                        icon: "none",
                        duration: 1000
                    });
                    return;
                }
                let arr = [...this.SongList];
                for (let item of res.result.songs) {
                    arr.push({
                        al: {
                            picUrl: item.album.artist.img1v1Url,
                            name: item.album.name
                        },
                        ar: item.artists,
                        name: item.name,
                        id: item.id
                    });
                }
                this.total = res.result.songCount;
                this.page++;
                this.SongList = arr;
                uni.hideLoading();
            });
        }
    }
};
</script>

<style lang='scss' scoped>
// /deep/ #shadow-root .field-index--van-field {
//     background-color: #f5f5f5;
//     border-radius: 100rpx;
// }
/deep/ .van-cell {
    background-color: #f5f5f5;
}
.Search .btn {
    background-color: #6180e9;
    color: #fff;
    border-radius: 6px;
    padding: 0 10px;
    height: 30px;
}
/deep/ .aaaaaaaaaa {
    border-bottom: 1px solid #f5f5f5;
}
/deep/ .aaaaaaaaaa .van-cell {
    background-color: #f5f5f5;
}

.Search {
    .item {
        display: flex;
        align-items: center;
        padding-left: 20px;
        font-size: 30rpx;
        color: #333;
        height: 50px;
        .left {
            margin-right: 20px;
            color: #888;
        }
        .box {
            flex: 1;
            display: flex;
            align-items: center;
            justify-content: space-between;
            border-bottom: 1px solid #eee;
            padding-right: 15px;
            height: 100%;
            overflow: hidden;
            .middle {
                display: flex;
                flex-direction: column;
                flex: 0 0 100%;
                overflow: hidden;
                Text {
                    font-size: 24rpx;
                    color: #888;
                    margin-top: 1px;
                }
                .ellipsis {
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                }
            }
            .right {
                image {
                    width: 25px;
                    height: 25px;
                    margin-top: 3px;
                }
            }
        }
    }
    .scrollview {
        height: calc(100vh - 90px);
    }
    .hot {
        padding: 10px 15px;
        font-size: 32rpx;
    }
    .tagBox {
        padding: 0 10px;
    }
    /deep/ .tag {
        margin: 5px;
        display: inline-block;
        font-size: 13px;
        color: #666;
        padding: 0 32rpx;
        font-size: 28rpx;
        height: 60rpx;
        line-height: 58rpx;
    }
}
</style>