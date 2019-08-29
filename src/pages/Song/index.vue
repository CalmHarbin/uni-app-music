<template>
    <View class="Song">
        <View
            class="bg"
            :style="
                song.al.picUrl
                    ? 'background:url(' +
                      song.al.picUrl +
                      '?imageView&thumbnail=480x0)'
                    : require('../../static/defaultMusicAvatar.jpg')
            "
        />
        <View class="bgBlank" />

        <View class="info">
            <Text>{{ song.name }}</Text>
            <View>{{ audio__singer }}</View>
        </View>
        <View class="img-box">
            <Image
                :class="['rotate', audio_paused ? 'paused' : '']"
                mode="widthFix"
                :src="
                    song.al.picUrl
                        ? song.al.picUrl + '?imageView&thumbnail=480x0'
                        : require('../../static/defaultMusicAvatar.jpg')
                "
            />
        </View>

        <View class="footer">
            <View class="Lyric">
                <View
                    class="content"
                    :style="style"
                    v-if="audio && audio_LyricList"
                >
                    <View
                        v-for="(item, index) in audio_LyricList"
                        :class="
                            index === LyricIndex
                                ? 'active Lyric_item'
                                : 'Lyric_item'
                        "
                        :key="index"
                        >{{ item.Text }}</View
                    >
                </View>
            </View>

            <View class="range-box">
                <Text>
                    {{
                        time > 60 * 60
                            ? $GetDateTime(new Date(time * 1000), "h:i:s")
                            : $GetDateTime(new Date(time * 1000), "i:s")
                    }}
                </Text>
                <slider
                    :value="sliderValue"
                    activeColor="#31c27c"
                    backgroundColor="rgba(255,255,255,0.4)"
                    blockColor="#31c27c"
                    :blockSize="14"
                    @change="sliderChange"
                />
                <Text>
                    {{
                        audio
                            ? audio_duration > 60 * 60
                                ? $GetDateTime(
                                      new Date(audio_duration * 1000),
                                      "h:i:s"
                                  )
                                : $GetDateTime(
                                      new Date(audio_duration * 1000),
                                      "i:s"
                                  )
                            : "00:00"
                    }}
                </Text>
            </View>
            <View class="btn-box">
                <Image
                    class="switch"
                    @click="Switch"
                    :src="
                        mode === 1
                            ? require('../../static/play_icn_one.png')
                            : mode === 2
                            ? require('../../static/play_icn_loop.png')
                            : require('../../static/play_icn_shuffle.png')
                    "
                />
                <Image
                    :src="require('../../static/play_btn_prev.png')"
                    @click="prev"
                    class="prev"
                />

                <Image
                    @click="turnState"
                    :src="
                        audio_paused
                            ? require('../../static/play_btn_play.png')
                            : require('../../static/play_btn_pause.png')
                    "
                    class="play"
                />
                <Image
                    :src="require('../../static/play_btn_next.png')"
                    @click="next"
                    class="next"
                />
                <Image
                    :src="require('../../static/play_icn_src.png')"
                    @click="show = true"
                    class="see"
                />
            </View>
        </View>
        <PlayList :show="show" @close="close" />
    </View>
</template>

<script>
import PlayList from "../../components/PlayList";
import { mapState } from "vuex";

let timer = null;
let isGtTime = null; //是否超过1s, 超过一秒未播放则显示loading
let change = false; //是不是切换歌曲了
export default {
    components: { PlayList },
    data() {
        return {
            sliderValue: 0, //进度条当前位置,0~100
            show: false, //控制播放列表是否显示
            time: 0,
            style: "bottom: 0px",
            LyricIndex: 0,
            audio__singer: null,
            audio_LyricList: null,
            audio_duration: null,
            audio_paused: null
        };
    },
    created() {
        let songData = this.$store.state.song;
        let audio = this.$store.state.audio;

        if (songData.id !== audio.id) {
            //矫正当前播放的src
            songData.src = audio.src;
            this.$store.dispatch("setGlobalData", {
                key: "song",
                value: songData
            });
            //更新播放为当前歌曲
            this.$store.dispatch("update", {
                item: songData
            });
            //更新歌词
            this.$store.dispatch("updateLyric", {
                id: songData.id,
                callback: () => {
                    this.$store.state.audio.onCanplay(() => {
                        console.log("歌曲准备完成,可以播放了");
                        if (!this.$store.state.audio.paused) this.setTime();
                        else if (change) this.setTime();
                        this.updateStore();
                    });
                }
            });
            //更新title
            uni.setNavigationBarTitle({
                title: songData.name
            });
            change = true;
            this.time = 0;
            this.sliderValue = 0;
        }
        //如果是播放状态则更新时间
        if (!audio.paused) {
            this.setTime();
        }
        //矫正时间和进度
        this.time = audio.currentTime;
        this.sliderValue =
            (100 * (audio.currentTime + 1)) / this.$store.state.audio.duration;

        this.updateStore();
    },
    mounted() {
        this.$store.state.audio.onCanplay(() => {
            console.log("歌曲准备完成,可以播放了");
            if (!this.$store.state.audio.paused) this.setTime();
            else if (change) this.setTime();
            this.updateStore();
        });
        //监听播放和暂停事件
        this.$store.state.audio.onPlay(() => {
            //播放时间继续
            this.setTime();
            this.updateStore();
        });
        this.$store.state.audio.onPause(() => {
            //停止播放时间
            clearInterval(timer);
            this.updateStore();
        });
        this.$store.state.audio.onWaiting(() => {
            isGtTime = setTimeout(() => {
                uni.showLoading({
                    title: "loading"
                });
            }, 2000);
        });
    },
    computed: {
        ...mapState(["song", "mode", "audio"])
    },
    methods: {
        updateStore() {
            console.log(this.$store.state.audio.paused);
            this.audio__singer = this.$store.state.audio._singer;
            this.audio_paused = this.$store.state.audio.paused;
            this.audio_LyricList = this.$store.state.audio.LyricList;
            this.audio_duration = this.$store.state.audio.duration;
        },
        /**
         * 定时器,更新时间和进度条
         * @method turnState
         * @return {undefined}
         */
        setTime() {
            clearInterval(timer);
            let time = Math.round(this.$store.state.audio.currentTime) | 0;
            timer = setInterval(() => {
                //此时表示歌曲已经播放完毕
                if (this.$store.state.audio.duration === 0) {
                    clearInterval(timer);
                    this.time = 0;
                    this.sliderValue = 0;
                }

                if (isGtTime) {
                    clearInterval(isGtTime);
                    isGtTime = null;
                } else {
                    uni.hideLoading();
                }
                this.time = this.time + 1;
                this.sliderValue =
                    (100 * (this.time + 1)) / this.$store.state.audio.duration;
                if (
                    this.$store.state.audio &&
                    this.$store.state.audio.LyricList
                ) {
                    this.$store.state.audio.LyricList.map((item, index) => {
                        if (this.time > item.time) {
                            this.style = `bottom:${(index - 1) * 28}px`;
                            this.LyricIndex = index;
                        }
                    });
                }
            }, 1000);
            this.time = time;
            this.sliderValue =
                (100 * (this.time + 1)) / this.$store.state.audio.duration;
            if (this.$store.state.audio && this.$store.state.audio.LyricList) {
                this.$store.state.audio.LyricList.map((item, index) => {
                    if (this.time > item.time) {
                        this.style = `bottom:${(index - 1) * 28}px`;
                        this.LyricIndex = index;
                    }
                });
            }
        },
        /*
         * 函数防抖
         * @method debounce
         * @param {funciton} fn   需要执行的函数
         * @param {Number} wait   需要等待的时间,毫秒
         * @returns {undefined}
         */
        debounce(fn, wait) {
            var timeout;
            return function() {
                var context = this;
                var args = arguments;
                if (!timeout) {
                    timeout = setTimeout(function() {
                        timeout = null;
                        fn.apply(context, args);
                    }, wait);
                }
            };
        },
        /**
         * 控制播放和暂停
         * @method turnState
         * @return {undefined}
         */
        turnState() {
            let audio = this.$store.state.audio;
            if (audio.paused) {
                audio.play();
                this.setTime();
            } else {
                audio.pause();
                clearInterval(timer);
            }
        },
        /**
         * 滑动进度条控制播放位置
         * @method sliderChange
         * @param {Number} e.detail.value 当前位置 0~100
         * @return {undefined}
         */
        sliderChange(e) {
            let audio = this.$store.state.audio;
            let currentTime = (audio.duration * e.detail.value) / 100;

            audio.seek(currentTime);
            clearInterval(timer);
            this.time = currentTime;
            this.sliderValue = (100 * (currentTime + 1)) / audio.duration;
        },
        /**
         * 切换播放模式
         * @method switch
         * @return {undefined}
         */
        Switch() {
            let mode = this.$store.state.mode;
            if (mode === 1) {
                this.$store.dispatch("setGlobalData", {
                    key: "mode",
                    value: 2
                });
                uni.showToast({
                    title: "已切换到循环播放",
                    icon: "none",
                    duration: 1000
                });
            } else if (mode === 2) {
                this.$store.dispatch("setGlobalData", {
                    key: "mode",
                    value: 3
                });
                uni.showToast({
                    title: "已切换到随机播放",
                    icon: "none",
                    duration: 1000
                });
            } else if (mode === 3) {
                this.$store.dispatch("setGlobalData", {
                    key: "mode",
                    value: 1
                });
                uni.showToast({
                    title: "已切换到单曲循环",
                    icon: "none",
                    duration: 1000
                });
            }
        },
        /**
         * 关闭播放列表
         * @method close
         * @return {undefined}
         */
        close() {
            this.show = false;
        },
        /**
         * 上一首
         * @method prev
         * @return {undefined}
         */
        prev() {
            this.$store.dispatch("prev", {
                callback: item => {
                    this.$store.dispatch("update", { item });
                    this.$store.dispatch("updateLyric", { id: item.id });
                }
            });
        },
        /**
         * 下一首
         * @method next
         * @return {undefined}
         */
        next() {
            this.$store.dispatch("next", {
                callback: item => {
                    this.$store.dispatch("update", { item });
                    this.$store.dispatch("updateLyric", { id: item.id });
                }
            });
        }
    }
};
</script>

<style lang='scss' scoped>
@keyframes rotate {
    0% {
        transform: rotateZ(0deg);
    }
    100% {
        transform: rotateZ(360deg);
    }
}
.Song {
    .bgBlank {
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        z-index: -1;
        background-color: rgba(0, 0, 0, 0.3);
    }
    .bg {
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        background-size: cover !important;
        background-position: bottom center;
        -webkit-filter: blur(40px);
        z-index: -2;
    }
    .info {
        display: flex;
        flex-direction: column;
        padding: 30rpx 0;
        text-align: center;
        height: 78px;
        box-sizing: border-box;
    }
    .info text {
        font-size: 40rpx;
        color: #fff;
    }
    .info view {
        color: #fff;
        opacity: 0.6;
    }
    .img-box {
        height: calc(100vh - 213px - 78px);
        overflow: hidden;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .img-box image {
        display: block;
        width: 500rpx;
        border-radius: 50%;
    }
    .btn-box {
        padding: 0 30rpx;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    .switch {
        width: 100rpx;
        height: 100rpx;
    }
    .prev {
        width: 150rpx;
        height: 150rpx;
    }
    .play {
        width: 170rpx;
        height: 170rpx;
    }
    .next {
        width: 150rpx;
        height: 150rpx;
    }
    .see {
        width: 75rpx;
        height: 75rpx;
    }
    .range-box {
        display: flex;
        align-items: center;
        padding: 0 15px;
        color: rgba(255, 255, 255, 0.5);
    }
    .rotate {
        animation: rotate 25s linear infinite;
    }
    .paused {
        animation-play-state: paused;
    }
    slider {
        flex: 1;
    }
}

.Lyric {
    height: 90px;
    overflow: hidden;
    text-align: center;
    color: #fff;
    .content {
        position: relative;
        animation: bottom 0.2s ease-out;
    }
    .Lyric_item {
        min-height: 28px;
        line-height: 28px;
        font-size: 14px;
    }
    .Lyric_item.active {
        font-size: 16px;
        color: #31c27c;
    }
}
.footer {
    height: 213px;
    box-sizing: border-box;
    overflow: hidden;
}
</style>