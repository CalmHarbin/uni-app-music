<template>
    <View class="SongList">
        <View class="header">
            <Image
                :src="require('../../static/play-cell.png')"
                @click="playAll"
            />
            <View class="left" @click="playAll">
                播放全部<Text>(共{{ SongList.length }}首)</Text>
            </View>
            <View class="right" @click="Collection">
                + 收藏({{ subscribedCount }})
            </View>
        </View>
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
                                .join(" / ") +
                                " -" +
                                item.al.name
                        }}
                    </Text>
                </View>
                <View class="right" @click.stop="play(item)">
                    <Image
                        :src="
                            !audio_paused && item.id === audio_id
                                ? require('../../static/pause-item.png')
                                : require('../../static/play-list.png')
                        "
                    />
                </View>
            </View>
        </View>
        <SongFooter ref="SongFooter" />
    </View>
</template>

<script>
import { getSongList } from "../../api/index";
import SongFooter from "../../components/SongFooter";
export default {
    components: { SongFooter },
    data() {
        return {
            subscribedCount: 0, //收藏数量
            SongList: [], //展示列表
            audio_id: null,
            audio_paused: null
        };
    },
    onLoad(params) {
        uni.showLoading({
            title: "loading"
        });
        getSongList({ id: params.id }).then(res => {
            for (let item of res.playlist.tracks) {
                this.SongList.push({
                    al: { picUrl: item.al.picUrl, name: item.al.name },
                    ar: item.ar,
                    name: item.name,
                    id: item.id
                });
            }
            this.subscribedCount = res.playlist.subscribedCount;
            uni.hideLoading();
        });
    },
    onShow() {
        this.$store.state.audio.onCanplay(() => {
            //更新底部播放的状态
            this.$refs.SongFooter.update();
            //因为vuex不能直接在模板内更新
            this.updateStore();
            this.$refs.SongFooter.updateStore();
        });
        //   监听播放和暂停事件
        this.$store.state.audio.onPlay(() => {
            this.$refs.SongFooter.onPlay();
            this.updateStore();
            this.$refs.SongFooter.updateStore();
        });
        this.$store.state.audio.onPause(() => {
            this.$refs.SongFooter.onPause();
            this.updateStore();
            this.$refs.SongFooter.updateStore();
        });
        if (this.$store.state.audio.id) {
            this.updateStore();
            this.$refs.SongFooter.Draw();
            this.$refs.SongFooter.updateStore();
        }
    },
    methods: {
        updateStore() {
            this.audio_id = this.$store.state.audio.id;
            this.audio_paused = this.$store.state.audio.paused;
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

            audio.onCanplay(() => {
                //更新底部播放的状态
                this.$refs.SongFooter.update();
            });
        },
        /**
         * 播放全部
         * @method playAll
         * @return {undefined}
         */
        playAll() {
            if (!this.SongList.length) return;
            let audio = this.$store.state.audio;

            //切换为顺序播放
            this.$store.dispatch("setGlobalData", { key: "mode", value: 2 });
            //更新播放列表
            this.$store.dispatch("setGlobalData", {
                key: "songList",
                value: this.state.SongList
            });
            this.$store.dispatch("setGlobalData", {
                key: "song",
                value: this.state.SongList[0]
            });
            //播放第一首歌
            //更新播放为当前歌曲
            this.$store.dispatch("update", { item: this.state.SongList[0] });
            //更新歌词
            this.$store.dispatch("updateLyric", {
                id: this.state.SongList[0].id
            });

            audio.onCanplay(() => {
                //更新底部播放的状态
                this.$refs.SongFooter.update();
            });
        },
        /**
         * 将歌曲插入到正在播放歌曲的后面
         * @method playAll
         * @return {undefined}
         */
        insert_list(song) {
            // 更新播放列表相关-start
            //获取播放列表
            let songList = this.$store.state.songList;

            //如果此时播放列表是空的,则全部添加到播放列表中
            if (songList.length === 0) {
                // 将热歌全部添加到播放列表里面
                this.$store.dispatch("setGlobalData", {
                    key: "songList",
                    value: this.SongList
                });
                //播放模式切换为顺序播放
                this.$store.dispatch("setGlobalData", {
                    key: "mode",
                    value: 2
                });
                return;
            }

            //先判断点击的歌曲是否在播放列表里面
            let isExist = false;
            songList.forEach(song_item => {
                if (song_item.id === song.id) {
                    isExist = true;
                }
            });
            //将点击的歌曲插入到正在播放歌曲的后面
            if (!isExist) {
                let idx = 0; //默认当前播放的歌曲为0
                songList.forEach((song_item, index) => {
                    if (song_item.id === this.$store.state.audio.id) {
                        idx = index;
                    }
                });
                songList.splice(idx + 1, 0, song);
            }
            // 更新播放列表相关-end
        },
        /**
         * 收藏全部
         * @method Collection
         * @return {undefined}
         */
        Collection() {
            uni.showToast({
                title: "暂不支持收藏",
                icon: "none",
                duration: 1000
            });
        }
    }
};
</script>

<style lang='scss' scoped>
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
}
</style>