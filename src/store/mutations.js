import { UPDATELYRIC, UPDATE, SETGLOBALDATA, PREVSONG, NEXTSONG } from './constants.js'

const mutations = {
    [UPDATELYRIC](state, payload) {
        //更新歌词
        state.audio.LyricList = payload.LyricList
        console.log('更新歌词', payload.LyricList)
        payload.callback && payload.callback()
    },
    [UPDATE](state, payload) {
        let { src, coverImgUrl, singer, title, id, _name, _singer, _picUrl, song } = payload

        state.audio.src = src
        state.audio.coverImgUrl = coverImgUrl
        state.audio.singer = singer
        state.audio.title = title
        state.audio.id = id
        state.audio._name = _name
        state.audio._singer = _singer
        state.audio._picUrl = _picUrl
        state.song = song
        state.song.src = src

        payload.callback && payload.callback()
    },
    [SETGLOBALDATA](state, payload) {
        let { key, value } = payload
        state[key] = value
    },
    [PREVSONG](state, payload) {
        for (let [index, item] of state.songList.entries()) {
            if (item.id === state.song.id) {
                if (index === 0) {
                    uni.showToast({
                        title: '没有了 o(╥﹏╥)o ',
                        icon: 'none',
                        duration: 1000
                    })
                    return
                }
                payload.callback(state.songList[index - 1])
            }
        }
    },
    [NEXTSONG](state, payload) {
        for (let [index, item] of state.songList.entries()) {
            if (item.id === state.song.id) {
                if (index === state.songList.length - 1) {
                    uni.showToast({
                        title: '没有了 o(╥﹏╥)o ',
                        icon: 'none',
                        duration: 1000
                    })
                    return
                }
                payload.callback(state.songList[index + 1])
                return
            }
        }
    }
}

export default mutations
