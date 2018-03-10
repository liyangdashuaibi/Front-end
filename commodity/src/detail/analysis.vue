<template>
    <div class="detail-wrap">
        <div class="detail-top">
            <h3>数据统计</h3>
            <p class="brief">数据统计，是互联网传媒行业或其他操作流程的数据统计的统称，用于历史资料、科学实验、检验、统计等领域。以便精准快速的查找与分类。</p>
            <form>
                <table width="100%">
                    <tr>
                        <td>选用地区：</td>
                        <td>
                            <vif-from :selections="areaTypes" @con-change="conPChange('areaData',$event)"></vif-from>
                        </td>
                    </tr>
                    <tr>
                        <td>产品类型：</td>
                        <td>
                            <vif-from :selections="productTypes" @con-change="conPChange('productData',$event)"></vif-from>
                        </td>
                    </tr>
                    <tr>
                        <td>产品版本：</td>
                        <td>
                            <vif-from :selections="timeTypes" @con-change="conPChange('timeData',$event)"></vif-from>
                        </td>
                    </tr>
                    <tr>
                        <td>数量：</td>
                        <td>
                            <vif-from :selections="numTypes" @con-change="conPChange('numData',$event)"></vif-from>
                        </td>
                    </tr>
                    <tr>
                        <td>总价：</td>
                        <td>{{money}}</td>
                    </tr>
                    <tr>
                        <td></td>
                        <td align="left">
                            <a class="button" @click="isBuyShow=true">立即购买</a>
                        </td>
                    </tr>
                </table>
            </form>
        </div>
        <div class="detail-bottom">
            <h3>产品说明</h3>
            <p>开发产品是指企业已经完成全部开发建设过程，并已验收合格，符合国家建设标准和设计要求，可以按照合同规定的条件移交订购单位，或者作为对外销售、出租的产品，包括土地（建设场地）、房屋、配套设施和代建工程。已完工开发产品实际上是开发建设过程的结束和销售过程的开始。</p>
        </div>
        <my-dialog :isShow="isBuyShow" @on-close="closeDiglog('isBuyShow')">
			<table class="buy-dialog-title">
                <tr>
                    <th>选用地区</th>
                    <th>产品类型</th>
                    <th>产品版本</th>
                    <th>购买数量</th>
                    <th>总价</th>
                </tr>
                <tr>
                    <td>{{ areaData.label }}</td>
                    <td>{{ productData.label }}</td>
                    <td>
                        <span v-for="(item, index) in timeData" :key="index">
                            {{item.label}}
                        </span>
                    </td>
                    <td>{{ numData }}</td>
                    <td>{{ money }}</td>
                </tr>
            </table>
            <div class="select-back">
                <h3>请选择银行</h3>
                <v-back @on-change="getBack"></v-back>
            </div>
            <div class="buy-dialog-button" @click="confirmBuy">立即购买</div>
		</my-dialog>
        <my-dialog :isShow="isSucShow" @on-close="closeDiglog('isSucShow')">
            <p v-if="orderId">支付成功</p>
            <p v-if="!orderId">支付失败</p>
        </my-dialog>
    </div>
</template>

<script>
import vifFrom from './from/vif-from'
import myDialog from '../conponents/dialog'
import vBack from './back/back'

export default {
    name: 'analysis',
    components: {
        vifFrom, myDialog, vBack
    },
    data () {
        return {
            isBuyShow: false,
            isSucShow: false,
            money: 0,
            //表单组件传回数据(设定了默认值)
            areaData: { 
                label: '北京',
                value: 0 
            },
            productData: {
                label: '初级版',
                value: 0
            },
            timeData: [
                {
                    label: '客户版',
                    value: 0
                }
            ],
            numData: 1,
            //表单组件传入数据
            areaTypes: {
                type: 'select',
                data: [
                    {
                        label: '北京',
                        value: 0
                    },
                    {
                        label: '上海',
                        value: 1
                    },
                    {
                        label: '深圳',
                        value: 2
                    },
                ]
            },
            productTypes: {
                type: 'radio',
                data: [
                    {
                        label: '初级版',
                        value: 0,
                    },
                    {
                        label: '中级版',
                        value: 1,
                    },
                    {
                        label: '高级版',
                        value: 2,
                    },
                    {
                        label: '终极版',
                        value: 3,
                    }
                ]
            },
            timeTypes: {
                type: 'checkbox',
                data: [
                    {
                        label: '客户版',
                        value: 0
                    },
                    {
                        label: '代理商版',
                        value: 1
                    },
                    {
                        label: '专家版',
                        value: 2
                    },
                ]
            },
            numTypes: {
                type: 'number',
                data: 20
            },
            backId: {
                id: 201,
                label: '招商银行',
                name: 'zhaoshang'
            },
            orderId: false
        }
    },
    methods: {
        conPChange ( string, value ) {
            this[ string ] = value;
            this.getPrice();
        },
        getPrice () {
            let reqParams = {
                 areaData: this.areaData.value,
                 productData: this.productData.value,
                 timeData: this.timeData.map( (item) => {
                     return item.value
                 }).join(),
                 numData: this.numData
            }
            //假装传递数据给后台获取价格信息
            this.$http.post( '../../api/getPrice', reqParams )
                .then( (res) =>{
                })
            //其实.....
            this.money = 100 * reqParams.numData * this.timeData.length
        },
        closeDiglog ( attr ) {
            this[attr] = false
        },
        getBack ( backObj ) {
            this.backId = backObj
        },
        confirmBuy () {
            let reqParams = {
                 areaData: this.areaData.value,
                 productData: this.productData.value,
                 timeData: this.timeData.map( (item) => {
                     return item.value
                 }).join(),
                 numData: this.numData,
                 backId: this.backId.id
            }
            //假装传递数据给后台获取购买信息
            this.$http.post( '../../api/getPrice', reqParams)
                .then( (res) =>{
                    this.orderId = true;
                    this.isBuyShow = false;
                    this.isSucShow = true;
                })
                .catch( (err) => {
                    this.orderId = false;
                    this.isBuyShow = false;
                    this.isSucShow = true;
                })
        }
    },
    mounted () {
        this.getPrice();
    }
}
</script>

<style>
    .buy-dialog-title {
        width: 100%;
        font-size: 14px;
    }
    .buy-dialog-title td {
        text-align: center;
        background-color: #e5e5e5;
        border: 1px solid #e5e5e5;
    }
    .buy-dialog-title th {
        background-color: #4fc08d;
        color: #fff;
        border: 1px solid #4fc08d;
    }
    .select-back {
        margin: 15px 0;
    }
    .select-back h3 {
        padding: 0;
        padding-bottom: 7px;
    }
    .buy-dialog-button {
        display: inline-block;
        background-color: #4fc08d;
        border: 1px solid #4fc08d;
        padding: 3px 8px;
        color: #Fff;
        cursor: pointer;
    }
</style>
