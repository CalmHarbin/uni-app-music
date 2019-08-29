<template>
    <View
        class="SongFooter"
        :style="song && song.id ? 'display: block' : 'display: none'"
    >
        <View class="box">
            <Image
                @click="go"
                :class="['avatar', audio_paused ? 'paused' : '']"
                :src="
                    song.al.picUrl
                        ? song.al.picUrl + '?imageView&thumbnail=38x0'
                        : require('../static/defaultMusicAvatar.jpg')
                "
            />
            <View class="content" @click="go">
                <View class="ellipsis">{{ song.name }}</View>
                <Text class="ellipsis">{{ audio__singer }}</Text>
            </View>
            <View @click="turnState">
                <canvas ref="canvas" canvas-id="canvas"></canvas>
            </View>
            <Image
                class="list"
                @click="show = true"
                :src="require('../static/play_icn_src_footer.png')"
            />
        </View>
        <View class="Stance" />
        <PlayList :show="show" @close="close" />
    </View>
</template>

<script>
import PlayList from "./PlayList";
// import pause_icon from "../static/pause_icon.png";
// import play_icon from "../static/play_icon.png";
import { mapState } from "vuex";

export default {
    components: { PlayList },
    data() {
        return {
            show: false,
            audio__singer: null,
            audio_paused: null
        };
    },
    created() {
        if (this.$store.state.song) {
            this.update();
        }
    },
    onShow() {
        this.updateStore();
        this.Draw();
    },
    computed: {
        ...mapState(["song"])
    },
    methods: {
        updateStore() {
            this.audio__singer = this.$store.state.audio._singer;
            this.audio_paused = this.$store.state.audio.paused;
        },
        /**
         * canvas改为播放状态
         * @method onPlay
         * @return {undefined}
         */
        onPlay() {
            this.$forceUpdate();
            this.Draw();
        },
        /**
         * canvas改为暂停状态
         * @method onPause
         * @return {undefined}
         */
        onPause() {
            this.$forceUpdate();
            this.Draw();
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
         * canvas绘制进度
         * @method Draw
         * @return {undefined}
         */
        Draw() {
            if (!this.$store.state.audio.id) return;

            let audio = this.$store.state.audio;
            let progress = audio.currentTime / audio.duration;
            const context = uni.createCanvasContext("canvas", this);

            //画圆
            context.setStrokeStyle("#31c27c");
            context.setLineWidth(1);
            context.moveTo(28, 15);
            context.arc(15, 15, 13, Math.PI * 0, Math.PI * 2, false);
            context.stroke();
            //画圆弧
            context.setLineWidth(2);
            context.moveTo(15, 3);
            context.arc(
                15,
                15,
                11,
                Math.PI * 0 - Math.PI * 0.5,
                Math.PI * 2 * progress - Math.PI * 0.5,
                false
            );
            context.stroke();

            if (audio.paused) {
                context.drawImage(
                    require("../static/play_icon.png"),
                    9,
                    9,
                    13,
                    13
                );
            } else {
                context.drawImage(
                    require("../static/pause_icon.png"),
                    7,
                    7,
                    16,
                    16
                );
            }
            context.draw();
        },
        /**
         * 跳转到详情页
         * @method go
         * @return {undefined}
         */
        go() {
            if (!this.$store.state.song.id) return;
            uni.navigateTo({
                url: `/pages/Song/index?id=${this.$store.state.song.id}`
            });
        },
        /**
         * 更新当前播放的歌曲
         * @method update
         * @return {undefined}
         */
        update() {
            //获取当前播放的歌曲
            let song = this.$store.state.song;
            if (!song) return;
            //获取播放器
            let audio = this.$store.state.audio;
            this.Draw();
            //监听歌曲播放
            audio.onTimeUpdate(() => {
                //绘制进度
                this.Draw();
            });
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
            } else {
                audio.pause();
            }

            this.$store.dispatch("setGlobalData", {
                key: "audio",
                value: audio
            });
        }
    }
};
</script>

<style lang="scss" scoped>
@keyframes rotate {
    0% {
        transform: rotateZ(0deg);
    }
    100% {
        transform: rotateZ(360deg);
    }
}
.SongFooter {
    .Stance,
    .box {
        height: 50px;
    }
    .box {
        position: fixed;
        bottom: 0;
        left: 0;
        z-index: 1000;
        width: 100%;
        display: flex;
        padding: 0 10px 0 10px;
        background-color: #fff;
        align-items: center;
        border-top: 1px solid #eee;
        box-sizing: border-box;
        .avatar {
            width: 38px;
            height: 38px;
            border-radius: 50%;
            margin-right: 10px;
            animation: rotate 25s linear infinite;
        }
        canvas {
            width: 30px;
            height: 30px;
            // transform:rotate(-90deg);
        }
        .content {
            display: flex;
            flex-direction: column;
            // width: 61%;
            flex: 1;
            overflow: hidden;
            font-size: 12px;
            color: #000;
            justify-content: center;
            Text {
                font-size: 13px;
                color: #999;
            }
        }
        .list {
            width: 30px;
            height: 30px;
            margin-left: 10px;
        }
        .paused {
            animation-play-state: paused;
        }
    }
    .ellipsis {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
}
</style>