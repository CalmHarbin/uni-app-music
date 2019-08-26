<template>
    <View class="Hot SongList">
        <View class="coverBox">
            <View class="cover" />
            <Text class="time"
                >更新日期
                {{ $GetDateTime(new Date(this.time), "m月d日") }}</Text
            >
        </View>

        <View
            class="item"
            :key="index"
            v-for="(item, index) in hotList"
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
                                .join(" / ") +
                                " - " +
                                item.al.name
                        }}
                    </Text>
                </View>
                <View class="right" @click="play(item)">
                    <Image
                        :src="
                            !$store.state.audio.paused && item.id == audioId
                                ? require('../../static/pause-item.png')
                                : require('../../static/play-list.png')
                        "
                    />
                </View>
            </View>
        </View>
    </View>
</template>

<script>
import { getHot } from "../../api/index";

export default {
    data() {
        return {
            hotList: [], //歌
            time: new Date().getTime()
        };
    },
    created() {
        getHot({ idx: 1 }).then(res => {
            for (let item of res.playlist.tracks) {
                this.hotList.push({
                    al: { picUrl: item.al.picUrl, name: item.al.name },
                    ar: item.ar,
                    name: item.name,
                    id: item.id
                });
            }
            this.time = res.playlist.updateTime;
        });
    },
    methods: {
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
            //改变播放列表
            this.insert_list(item);
            uni.navigateTo({
                url: `/pages/Song/index?id=${item.id}`
            });
        },
        /**
         * 播放当前歌曲
         * @method play
         * @param {Object} item 当前歌曲的详细信息
         * @return {undefined}
         */
        play(item) {
            //获取播放器
            let audio = this.$store.state.audio;
            //如果点击的是当前歌曲,则仅改变播放状态
            if (
                this.$store.state.song &&
                this.$store.state.song.id === item.id
            ) {
                if (audio.paused) {
                    audio.play();
                } else {
                    audio.pause();
                }
                //更新歌曲的全局变量
                this.$store.dispatch("setGlobalData", {
                    key: "audio",
                    value: audio
                });
                return;
            }
            //更新歌曲的全局变量
            this.$store.dispatch("setGlobalData", { key: "song", value: item });

            //获取当前播放的歌曲
            let song = this.$store.state.song;
            //改变播放列表
            this.insert_list(song);

            //更新播放为当前歌曲
            this.$store.dispatch("update", { item });
            //更新歌词
            this.$store.dispatch("updateLyric", { id: item.id });
        },

        /**
         * 将歌曲插入到正在播放歌曲的后面
         * @method playAll
         * @return {undefined}
         */
        insert_list() {
            // 将热歌全部添加到播放列表里面
            this.$store.dispatch("setGlobalData", {
                key: "songList",
                value: this.hotList
            });
            //播放模式切换为顺序播放
            this.$store.dispatch("setGlobalData", { key: "mode", value: 2 });
        }
    }
};
</script>

<style lang='scss' scoped>
.coverBox {
    position: relative;
    background: url(//s3.music.126.net/mobile-new/img/hot_music_bg_2x.jpg?f01a252…=)
        no-repeat;
    background-size: cover;
    height: 146px;
    display: flex;
    justify-content: center;
    flex-direction: column;
    padding-left: 15px;

    .cover {
        background: url(//s3.music.126.net/mobile-new/img/index_icon_2x.png?5207a28…=)
            no-repeat;
        background-size: 166px 97px;
        width: 142px;
        height: 67px;
        background-position: -24px -30px;
    }

    .time {
        color: hsla(0, 0%, 100%, 0.8);
        font-size: 12px;
        transform: scale(0.91);
        transform-origin: left top;
        margin-top: 10px;
    }
}

.SongList {
    .header {
        display: flex;
        border-radius: 13px 13px 0 0;
        height: 45px;
        line-height: 45px;
        background-color: #fff;
        align-items: center;
        font-size: 30rpx;
        border-bottom: 1px solid #eee;
        overflow: hidden;
        image {
            width: 20px;
            height: 20px;
            margin-right: 15px;
            margin-left: 15px;
        }
        .left {
            margin-right: auto;
            color: #333;
            Text {
                color: #999;
            }
        }
        .right {
            height: 100%;
            padding: 0 8px;
            background-color: red;
            color: #fff;
            text-align: center;
            min-width: 110px;
        }
    }
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
                flex: 0 0 90%;
                overflow: hidden;
                text {
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
}
</style>
