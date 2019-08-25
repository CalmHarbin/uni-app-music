<template>
    <View class='SongSheet item' @click="go" >
        <Image lazyLoad :src="picUrl" />
        <Text class='name'>{{name}}</Text>
        <View class='playCount'>
            <Image style='position:relative;top:2rpx;width: 10Px;height:10Px;margin: 3Px 3Px 0 0;display:inline-block;' :src="require('../static/headset.png')" />
            <!-- 这里不支持Math.floor(), 一个小坑 -->
            <!-- {{ Math.floor(playCount) > 100000 && Math.floor(playCount / 10000) + '万' || Math.floor(playCount) }} -->
            {{(playCount | 0) > 10000 ? (playCount / 10000 | 0) + '万' : (playCount | 0)}}
        </View>
        <View class='shadow'></View>
    </View>
</template>

<script>

export default {
    props: {
        picUrl: String,
        name: String,
        Oid: Number,
        playCount: Number
    },
    methods: {
        go() {
            uni.navigateTo({
                url: `/pages/SongList/index?id=${this.Oid}`
            })
        }
    }
}
</script>

<style lang='scss' scoped>
$width : 100%;
$height: 31vw;
.SongSheet.item{
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow: hidden;
    width: $width;
    margin-top: 7Px; 
    image{
        width: $width;
        height: $height;
        border-radius: 10rpx;
    }
    .playCount{
        position: absolute;
        right: 5%;
        top: 2%;
        font-size: 10Px;
        color: #fff;
        z-index: 1;
    }
    .shadow{
        position: absolute;
        left: 0;
        top: 0;
        width: $width;
        height: $height;
        border-radius: 10rpx;
        box-shadow: 0rpx 0rpx 100rpx #000 inset;
    }
    .name{
        font-size: 24rpx;
        margin-bottom: 15Px;
        margin-top: 5Px;
    }
}
</style>
