<template>
    <div class="main">
        <banner :slides="slides"></banner>
        <div class="main-list">
            <div v-for="(item,index) in boardList" :key="index" class="block" :class="'no_'+ index">
                <div class="block-item">
                    <h3>{{item.title}}</h3>
                    <p>{{item.description}}</p>
                    <router-link class="button" :to="{ path: item.toKey }" tag="a">立即购买</router-link>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import banner from './home-banner/banner'

export default {
    name: 'main',
    components: {
        banner
    },
    data () {
        return {
            invTime: 2000,
            slides: [
                {
                    src: require( '../assets/slideShow/pic1.jpg' ),
                    title: '1',
                    href: 'detail/analysis'
                },
                {
                    src: require( '../assets/slideShow/pic2.jpg' ),
                    title: '2',
                    href: 'detail/count'
                },
                {
                    src: require( '../assets/slideShow/pic3.jpg' ),
                    title: '3',
                    href: 'detail/forecast'
                },
                {
                    src: require( '../assets/slideShow/pic4.jpg' ),
                    title: '4',
                    href: 'detail/publish'
                }
            ],
            boardList: [
                {
                    title: '开放产品',
                    description: '开放产品是一款开放产品',
                    id: 'car',
                    toKey: 'detail/analysis',
                    saleout: false
                },
                {
                    title: '品牌营销',
                    description: '品牌营销帮助你的产品更好地找到定位',
                    id: 'earth',
                    toKey: 'detail/count',
                    saleout: false
                },
                {
                    title: '使命必达',
                    description: '使命必达快速迭代永远保持最前端的速度',
                    id: 'loud',
                    toKey: 'detail/forecast',
                    saleout: true
                },
                {
                    title: '勇攀高峰',
                    description: '帮你勇闯高峰，到达事业的顶峰',
                    id: 'hill',
                    toKey: 'detail/publish',
                    saleout: false
                }
            ],
        }
    }
}
</script>

<style scoped>
    .main {
        width: 890px;
        margin-left: 10px;  
    }
    .main-list::after {
        content: '';
        display: table;
        clear: both;
    }
    .no_0 {
        background: #fff url(../assets/images/1.png) no-repeat;
    }
    .no_1 {
        background: #fff url(../assets/images/2.png) no-repeat;
        margin-left: 10px;
    }
    .no_2 {
        background: #fff url(../assets/images/3.png) no-repeat;
        margin-top: 10px;
    }
    .no_3 {
        background: #fff url(../assets/images/4.png) no-repeat;
        margin-left: 10px;
        margin-top: 10px;
    }
    .block {
        float: left;
        width: 440px;
        height: 150px;
        background-position: 10px 25px;
        display: flex;
        align-items: center;
    }
    .block-item {
        margin-left: 130px;
    }
    .block-item h3,.block-item p {
        margin-bottom: 7px;
    }
    .button {
        float: left;
        display: block;
        margin-top: 5px;
        background: rgb(0,200,150);
        color: #fff;
        padding: 5px 10px;
    }
</style>
