<template>
    <View class="Recommend">
        <Swiper
            @change="swiperChange"
            :current="current"
            indicatorColor="#fff"
            indicatorActiveColor="#31c27c"
            circular
            indicatorDots
            autoplay
        >
            <SwiperItem v-for="(item, index) in banner" :key="index">
                <Image
                    lazyLoad
                    style=""
                    :src="
                        show.includes(index)
                            ? item + '?imageView&thumbnail=480x0'
                            : ''
                    "
                />
            </SwiperItem>
        </Swiper>

        <View @click="go('推荐歌单')" class="cell-title">
            推荐歌单
            <van-icon name="arrow" size="20px" color="#999" />
        </View>
        <View class="cell-SongSheet">
            <SongSheet
                v-for="(item, index) in PersonalizedList"
                :key="index"
                :Oid="item.id"
                :name="item.name"
                :picUrl="item.picUrl + '?imageView&thumbnail=250x0'"
                :playCount="item.playCount"
            />
        </View>
        <View @click="go('排行榜')" class="cell-title">
            排行榜
            <van-icon name="arrow" size="20px" color="#999" />
        </View>
        <View class="cell-SongSheet">
            <SongSheet
                v-for="(item, index) in toplist"
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
import { getBanner, getPersonalized, toplist } from "../../api/index";
import VanIcon from "../../wxcomponents/vant-weapp/icon/index";
import SongSheet from "../../components/SongSheet";

export default {
    components: { SongSheet, VanIcon },
    data() {
        return {
            banner: [], //轮播图
            PersonalizedList: [], //推荐歌单
            toplist: [], //排行榜
            current: 0,
            show: [0, 1] //表示已经显示过的banner
        };
    },
    created() {
        uni.showLoading({
            title: "loading"
        });

        Promise.all([
            this.getBanner(),
            this.getPersonalized(),
            this.gettoplist()
        ]).then(() => {
            uni.hideLoading();
        });
    },
    methods: {
        /**
         * 轮播图切换
         * @method getBanner
         * @return {Promise}
         */
        swiperChange(e) {
            if (this.show.includes(e.detail.current)) return;
            this.show = this.show.concat([e.detail.current]);
        },
        go(title) {
            uni.navigateTo({
                url: `/pages/PersonalizedList/index?name=${title}`
            });
        },
        /**
         * 请求banner图
         * @method getBanner
         * @return {Promise}
         */
        getBanner() {
            return getBanner().then(res => {
                for (let item of res.banners) {
                    this.banner.push(item.imageUrl);
                }
            });
        },
        /**
         * 获取推荐歌单
         * @method getBanner
         * @return {Promise}
         */
        getPersonalized() {
            getPersonalized().then(res => {
                let random = Math.floor(
                    Math.random() * (res.result.length - 5)
                );
                // 随机取6个
                for (let item of res.result.slice(random, random + 6)) {
                    this.PersonalizedList.push({
                        id: item.id,
                        name: item.name,
                        picUrl: item.picUrl,
                        playCount: item.playCount
                    });
                }
            });
        },
        /**
         * 获取榜单
         * @method getBanner
         * @return {Promise}
         */
        gettoplist() {
            toplist().then(res => {
                let random = Math.floor(Math.random() * (res.list.length - 5));
                // 随机取6个
                for (let item of res.list.slice(random, random + 6)) {
                    this.toplist.push({
                        id: item.id,
                        name: item.name,
                        picUrl: item.coverImgUrl,
                        playCount: item.playCount
                    });
                }
            });
        }
    }
};
</script>

<style lang='scss' scoped>
/deep/ .van-tab--active {
    color: #dd001b;
}
image {
    width: 100%;
    height: 200px;
}
swiper {
    height: 200px;
}
.cell-title {
    font-size: 32rpx;
    margin-top: 20rpx;
    margin-bottom: 10rpx;
    padding: 0 15px;
}
.cell-SongSheet {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    padding: 0 8px;
}
van-icon {
    position: relative;
    top: 5px;
}
</style>
