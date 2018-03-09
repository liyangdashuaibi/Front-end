<template>
    <div class="home">
        <div class="home-main">
            <div class="product">
                <div class="product-list">
                    <h3>全部产品</h3>
                    <div v-for="(product,index) in wholeList" :key="index">
                        <h4>{{product.title}}</h4>
                        <ul>
                            <li v-for="item in product.list" :key="item.name">
                                <router-link :to="{ path:item.url }" tag="a">{{item.name}}</router-link>
                                <div class="hot" v-if="item.hot">HOT</div>
                            </li>
                        </ul>
                        <div class="bottom" v-if="!product.last"></div>
                    </div>
                </div>
                <div class="new_message">
                    <h3>最新消息</h3>
                    <div>
                        <ul>
                            <li v-for="item in newList" :key="item.name" :title="item.name">
                                <a :href="item.url" class="new-item">{{item.name}}</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <mainPage></mainPage>
        </div>
    </div>
</template>

<script>
import mainPage from '../home/main'

export default {
    name: 'home',
    components: {
        mainPage
    },
    created () {
        this.$http.get( 'api/getnewList' )
            .then( ( res ) => {
                this.newList = res.data;
            })
            .catch( function ( err ) {
                console.log( err )
            })
        this.$http.get( 'api/wholeList' )
            .then( ( res ) => {
                this.wholeList = res.data;
            })
            .catch( function ( err ) {
                console.log( err )
            })
    },
    data () {
        return {
            wholeList: {},
            newList:[]
        }
    }
}
</script>

<style scoped>
    .home {
        font-family: '微软雅黑';
        width: 100%;
        background-color: rgb(210, 210, 210);
        padding: 20px 0;
    }
    .home-main {
        width: 1150px;
        margin: 0 auto;
        overflow: hidden;
    }
    .home-main > div {
        float: left;
    }
    .product {
        width: 250px;
        overflow: hidden;
        font-size: 13px;
    }
    .product h3 {
        background-color: rgb(0,200,0);
        color: #fff;
        padding: 3px 30px;
        font-weight: normal;
    }
    .product ul li {
        padding: 1px 32px;
    }
    .product h4 {
        padding: 10px 25px 0;
        font-weight: bold;
        font-size: 15px;
        background-color: #fff;
    }
    .product .new_message {
        margin-top: 10px;
        height: 368px;
        background-color: #fff;
    }
    .product ul {
        list-style: none;
        padding: 10px 5px;
        background-color: #fff;
    }
    .bottom {
        border-bottom: 1px solid rgb(195, 195, 195);
    }
    .hot {
        display: inline-block;
        background-color: red;
        color: white;
    }
    .new-item {
        display: inline-block;
        width: 170px;
        overflow: hidden;
        text-overflow: ellipsis;    /*超出部分省略*/
        white-space: nowrap;    /*不允许换行*/
    }
</style>
