<script>
export default {
    onLaunch: function() {
        let audio = uni.getBackgroundAudioManager();

        //播放完毕事件
        audio.onEnded(() => {
            let STATE = this.$store.state;
            if (STATE.mode === 1) {
                //单曲循环则重新播放;
                audio.src = STATE.song.src;
                audio.coverImgUrl = STATE.song.al.picUrl;
                audio.singer = STATE.song.ar
                    .map(i => {
                        return i.name;
                    })
                    .join(" / ");
                audio.title = STATE.song.name;
                audio.id = STATE.song.id;
            } else if (STATE.mode === 2) {
                //顺序播放则播放下一首
                for (let [index, item] of STATE.songList.entries()) {
                    if (item.id === STATE.song.id) {
                        //如果当前歌曲是播放列表最后一首则播放第一首;
                        if (index === STATE.songList.length - 1) {
                            //初始化全局的背景音频播放器
                            this.$store.dispatch("update", {
                                item: STATE.songList[0]
                            });
                            this.$store.dispatch("updateLyric", {
                                id: STATE.songList[0].id
                            });
                        } else {
                            this.$store.dispatch("update", {
                                item: STATE.songList[index + 1]
                            });
                            this.$store.dispatch("updateLyric", {
                                id: STATE.songList[index + 1].id
                            });
                        }
                        return;
                    }
                }
            } else if (STATE.mode === 3) {
                //随机播放
                let random = Math.floor(Math.random() * STATE.songList.length); //随机产生一个索引
                if (STATE.songList[random].id === STATE.song.id) {
                    //如果随机歌曲与当前歌曲相同
                    audio.src = STATE.song.src;
                    audio.coverImgUrl = STATE.song.al.picUrl;
                    audio.singer = STATE.song.ar
                        .map(i => {
                            return i.name;
                        })
                        .join(" / ");
                    audio.title = STATE.song.name;
                    audio.id = STATE.song.id;
                } else {
                    this.$store.dispatch("update", {
                        item: STATE.songList[random]
                    });
                    this.$store.dispatch("updateLyric", {
                        id: STATE.songList[random].id
                    });
                }
            }
        });

        //初始化全局的背景音频播放器
        this.$store.dispatch("setGlobalData", { key: "audio", value: audio });
    },
    onShow: function() {},
    onHide: function() {
        console.log("App Hide");
    }
};
</script>

<style>
/*每个页面公共css */
image {
    max-width: 100%;
}
song-sheet {
    display: inline-block;
    width: 32.5%;
}
.ellipsis {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
</style>
