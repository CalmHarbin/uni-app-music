const state = {
    song: null, //当前播放歌曲数据
    // song: {
    //     al: {
    //         picUrl: 'http://p1.music.126.net/gk7CUPP62r9bidqVJwgNhQ==/109951163375219616.jpg', //图片
    //         name: 'PIT' //名字
    //     },
    //     id: null, //id
    //     src: '', //地址
    //     _singer: '' //歌手
    // }, //当前播放歌曲数据
    audio: null,
    mode: 1, //当前播放模式,1-单曲循环,2-顺序播放,3-随机播放
    songList: [] //播放列表
}

export default state
