<template>
    <div class="detail">
        <div class="detail-main">
            <div class="detail-list">
                <div class="detail-list-image">
                    <img :src="imageIcon">
                </div>
                <div class="detail-list-select">
                    <ul>
                        <router-link v-for="(item,index) in pcList" :key="index" :to="{ path : '/' + item.url }" tag="li" active-class="select-green">
                            {{item.name}}
                        </router-link>
                    </ul>
                </div>
            </div>
            <div class="detail-right">
                <keep-alive>
                    <router-view></router-view>
                </keep-alive>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'detail',
    created () {
        this.$http.get( '../../api/wholeList' )
            .then( (res) => {
                this.pcList = res.data.pc.list;
            })
            .catch( (err) => {
                alert('404' + err)
            })
    },
    data () {
        return {
            pcList: [],
            images: {
                "/detail/count": require("../assets/images/1.png"),
                "/detail/forecast": require("../assets/images/2.png"),
                "/detail/analysis": require("../assets/images/3.png"),
                "/detail/publish": require("../assets/images/4.png")
            },
            flag: 0
        }
    },
    computed: {
        imageIcon () {
            return this.images[this.$route.path]
        }
    }
}
</script>

<style>
    .detail {
        font-family: '微软雅黑';
        width: 100%;
        background-color: rgb(210, 210, 210);
        padding: 20px 0;
    }
    .detail-main {
        width: 1150px;
        margin: 0 auto;
        overflow: hidden;
    }
    .detail-main > div {
        float: left
    }
    .detail-list {
        width: 250px;
        overflow: hidden;
        font-size: 13px;
        background-color: #fff;
        padding: 10px 0;
    }
    .detail-list-image {
        text-align: center;
    }
    .detail-list-select li {
        padding: 5px 50px;
        cursor: pointer;
    }
    .select-green {
        background-color: rgb(0,200,150);
        color: #fff;
    }
    .detail-wrap {
        width: 890px;
        margin-left: 10px;
        overflow: hidden;
    }
    .detail-top, .detail-bottom {
        background-color: #fff;
    }
    .detail-top, .detail-bottom {
        margin-bottom: 10px;
        padding-bottom: 15px;
    }
    .detail-wrap h3 {
        font-weight: normal;
        padding: 15px 0 0 15px;
    }
    .detail-top .brief {
        padding: 10px 15px;
        margin: 15px 0;
        background-color: #CCFFCC;
    }
    .detail-top form {
        padding-left: 15px;
    }
    .detail-top tr td:nth-child(1) {
        width: 100px;
    }
    .detail-top form td {
        padding: 3px;
    }
    .detail-top form .button {
        background-color: rgb(0,200,150);
        border-radius: 3px;
        border: none;
        color: #fff;
        padding: 4px 10px;
        font-size: 12px;
        cursor: pointer;
    }
    .detail-top form .button:hover {
        text-decoration: none;
    }
    .detail-bottom p {
        padding: 15px 15px 0;
    }
</style>
