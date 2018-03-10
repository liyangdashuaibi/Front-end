<template>
    <div class="prolist">
        <div class="prolist-main">
            <h2>您的产品</h2>
            <div class="prolist-select">
                <div class="produce">
                    选择产品：<v-vif-from :selections="affProduce" @con-change="getProduce($event)"></v-vif-from>
                </div>
                <div class="star-data">
                    开始日期：<v-date @getNowDate="getstarDates($event)"></v-date>
                </div>
                <div class="end-data">
                    结束日期：<v-date @getNowDate="getendDates($event)"></v-date>
                </div>
                <div class="key-word">
                    关键字：<input type="text" v-moedl="keyWord"/>
                </div>
                <div class="inquiry">
                    <a href="javascript:;" @click="inQuiry()">查&nbsp询</a>
                </div>
            </div>
            <div class="prolist-table">
                <table>
                    <th>
                        <td v-for="(item, index) in orderHead" :key="index">{{item}}</td>
                    </th>
                </table>
            </div>
        </div>
    </div>
</template>

<script>
import vDate from '../prolist/date'
import vVifFrom from '../detail/from/vif-from'
export default {
    components: {
        vDate, vVifFrom
    },
    created () {
        this.$http.get( '../api/wholeList' )
            .then( ( res ) => {
                var list = res.data.pc.list;
                for ( let i = 0, le = list.length; i < le; i ++){
                    var obj = {};
                    obj.label = list[i].name;
                    obj.value = i;
                    this.affProduce.data.push(obj);
                    if ( i === 0 ){
                        this.produce = obj
                    }
                }
            })
            .catch( ( err ) => {
                console.log( err )
            })
    },
    data () {
        return {
            affProduce: {
                type: 'select',
                data: [
                    {
                        label: '全部产品',
                        value: 0
                    }
                ]
            },
            produce: {},
            starDate: {},
            endDate: {},
            keyWord: '',
            orderHead: [
                '编号', "产品", "类型", "版本", "数量", "时间", "价格"
            ],
            orderList: []
        }
    },
    methods: {
        getstarDates (value) {
            this.starDate = value;
        },
        getendDates (value) {
            this.endDate = value;
        },
        getProduce (value) {
            this.produce = value;
        },
        inQuiry () {
            if ( this.endDate.year < this.starDate.year ) {
                alert( '结束日期不能比开始日期小' );
                return false;
            } else if ( this.endDate.month < this.starDate.month ) {
                alert( '结束日期不能比开始日期小' );
                return false;
            } else if ( this.endDate.day < this.starDate.day ) {
                alert( '结束日期不能比开始日期小' );
                return false;
            }
            this.$http.get( '../api/orderList' )
                .then( (res) => {
                    this.orderList = res.data.list;
                })
                .catch( (err) => {
                    console.log(err)
                })
        }
    }
}
</script>

<style>
    .prolist {
        font-family: '宋体';
        width: 100%;
        background-color: rgb(210, 210, 210);
        padding: 20px 0;
    }
    .prolist-main {
        width: 1150px;
        margin: 0 auto;
    }
    .prolist-select {
        margin-top: 10px;
    }
    .prolist-select::after {
        content: '';
        display: table;
        clear: both
    }
    .prolist-select > div {
        float: left;
    }
    .prolist-select > div:nth-child(n+2){
        margin-top: 4px;
        margin-left: 40px;
    }
    .inquiry a {
        display:inline-block;
        font-size: 12px;
        height: 23px;
        line-height: 23px;
        width: 70px;
        text-align: center;
        background: #78b902;
        color: #fff;
        border-radius: 5px;
        text-decoration: none;
    }
</style>
