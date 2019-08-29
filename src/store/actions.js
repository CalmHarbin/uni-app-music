import { UPDATELYRIC, UPDATE, SETGLOBALDATA, PREVSONG, NEXTSONG } from './constants.js'
import { getSong, getLyric } from '../api/index'

const actions = {
    updateLyric({ commit }, payload) {
        let { id } = payload
        getLyric({ id: id }).then(res => {
            let LyricList =
                res.lrc &&
                res.lrc.lyric.split('\n').map(item => {
                    let arr = item.split(']')
                    let time = arr[0].substr(1)

                    return {
                        time: (time.split(':')[0] * 60 + time.split(':')[1] * 1) | 0,
                        Text: arr[1]
                    }
                })
            commit(UPDATELYRIC, {
                LyricList: LyricList.filter(item => item.Text), //过滤掉空歌词
                callback: payload.callback
            })
        })
    },
    update({ commit }, payload) {
        let { item } = payload
        getSong({ id: item.id }).then(res => {
            if (!res.data[0].url) {
                console.log('该首歌曲无法播放')
                uni.showModal({
                    title: '抱歉',
                    content: '该首歌曲无法播放'
                })
            }
            commit(UPDATE, {
                src: res.data[0].url,
                coverImgUrl: item.al.picUrl,
                singer: item.ar
                    .map(i => {
                        return i.name
                    })
                    .join(' / '),
                title: item.name,
                id: item.id,
                _name: item.name,
                _singer: item.ar
                    .map(i => {
                        return i.name
                    })
                    .join(' / '),
                _picUrl: item.al.picUrl,
                song: item,
                callback: payload.callback
            })
        })
    },
    setGlobalData({ commit }, payload) {
        commit(SETGLOBALDATA, payload)
    },
    prev({ commit }, payload) {
        commit(PREVSONG, payload)
    },
    next({ commit }, payload) {
        commit(NEXTSONG, payload)
    }
}

export default actions
