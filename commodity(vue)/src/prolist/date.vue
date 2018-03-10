<template>
    <div class="date">
        <div class="date-input">
            <input type="text" :value="specificDate" @click="getSpecificDate()" readonly="readonly"/>
        </div>
        <div class="date-main" v-if="vShow">

            <div class="date-ym">
                <input type="text" v-model="year" @keydown="setYear($event)" @blur="setYear($event)">
                <div class="setMonth">
                    <a class="right" href="javascript:;" @click="setPreMonth"><</a>
                    <vif-from :selections="monthTypes" :setNowIndex="month" @con-change="eListeners"></vif-from>
                    <a class="left" href="javascript:;" @click="setNextMonth">></a>
                </div>
                <div class="goToday" @click="getTime()">返回今天</div>
            </div>
            
            <table :width="width" :height="height" ref="table">
                <tr>
                    <th v-for="(item, index) in week" :key="index">{{item}}</th>
                </tr>
                <tr v-for="(item, index) in daysArr" :key="index" @click="setSpecificDate($event)">
                    <td v-for="(ite, inde) in item" :key="inde" :class="{'gay': ite.css, 'today': ite.today, 'orange': ite.isclick}" ref="td">{{ite.date}}</td>
                </tr>
            </table>
           
        </div>
    </div>
</template>

<script>
import vifFrom from '../detail/from/vif-from'

export default {
    components: {
        vifFrom
    },
    props: {
        width: {
            type: String,
            default: '420px'
        },
        height: {
            type: String,
            default: '200px'
        }
    },
    created () {
        this.getTime();
    },
    data () {
        return {
            vShow: false,
            week: [ '星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六' ],
            date: new Date(),
            daysArr: [],
            year: new Date().getFullYear(),
            month: new Date().getMonth(),
            monthTypes :{
                type: 'select',
                data: [
                    {
                        label: '1月',
                        value: 0
                    },
                    {
                        label: '2月',
                        value: 1
                    },
                    {
                        label: '3月',
                        value: 2
                    },
                    {
                        label: '4月',
                        value: 3
                    },
                    {
                        label: '5月',
                        value: 4
                    },
                    {
                        label: '6月',
                        value: 5
                    },
                    {
                        label: '7月',
                        value: 6
                    },
                    {
                        label: '8月',
                        value: 7
                    },
                    {
                        label: '9月',
                        value: 8
                    },
                    {
                        label: '10月',
                        value: 9
                    },
                    {
                        label: '11月',
                        value: 10
                    },
                    {
                        label: '12月',
                        value: 11
                    },

                ]
            },
            specificDate: '',
            clicks: [],
            clicksYM: {},
        }
    },
    methods: {
        //响应子组件自定义事件
        eListeners ( value ) {
            this.getTime ( value.value, this.year )
        },
        getPreLastDay ( curMonth, curYear ) {
            var curDate = new Date();
            curDate.setFullYear( curYear );
            curDate.setMonth( curMonth );
            curDate.setDate(0);
            return curDate.getDate() + 1;
        },
        getToday ( curMonth, curYear ) {
            var curDate = new Date();
            var today = null;
            if ( curYear === curDate.getFullYear() && curMonth === curDate.getMonth() ){
                today = curDate.getDate();
            }
            return today;
        },
        getWeekDay ( curMonth, curYear ) {
            var curDate = new Date();
            curDate.setFullYear( curYear );
            curDate.setMonth( curMonth );
            curDate.setDate(1);
            return curDate.getDay();
        },
        getToLastDay( curMonth, curYear ) {
            var curDate = new Date();
            curDate.setFullYear( curYear );
            curDate.setMonth( curMonth + 1 );
            curDate.setDate(0);
            return curDate.getDate();
        },
        getClicks ( curMonth, curYear ) {
            var curDate = new Date();
            var clicks = null;
            if ( curYear === this.clicksYM.year && curMonth === this.clicksYM.month ){
                clicks = this.clicks
            }
            return clicks;
        },
        //主事件
        getTime ( month, year ) {

            var curDate = new Date();
            if ( month + 1 ){
                month = month + 1;
            }
            var curMonth = month ? month - 1 : curDate.getMonth();
            var curYear = year ? Number(year) : curDate.getFullYear();

            this.year = curYear;
            this.month = curMonth;

            //被点击的日期
            var clicks = this.getClicks ( curMonth, curYear );

            //获取上个月最后一天           
            var oldDay = this.getPreLastDay( curMonth, curYear );
            
            //今天
            var today = this.getToday( curMonth, curYear );

            //本月1号从星期几开始
            var weekDay = this.getWeekDay( curMonth, curYear );

            //本月一共多少天
            var day = this.getToLastDay( curMonth, curYear );

            // console.log('月份: ' + curMonth + '\n今天: ' + today + '\n本月一号是星期: ' + weekDay + '\n本月天数: ' + day + '\n上个月最后一天：' + oldDay)

            var daysArr = [];
            var count = 1, newCount = 1
            for ( let i = 0; i < 6; i ++ ) {
                let asr = [];
                for ( let j = 0; j < 7; j ++ ){
                    var obj = {}
                    if ( i === 0 && j < weekDay ) {
                        obj.date = oldDay ++ - weekDay;
                        obj.css = true;
                    } else {
                        if ( count === today ){
                            obj.date = count ++;
                            obj.today = true
                        } else if ( count > day ){
                            obj.date = newCount ++;
                            obj.css = true;
                        } else {
                            obj.date = count ++;
                        }
                    }
                    if ( clicks ) {
                        if ( i === clicks[0] ){
                            if ( j === clicks[1] ){
                                obj.isclick = true
                            }
                        }
                    }
                    asr.push(obj)
                }
                daysArr.push( asr )
            }
            this.daysArr = daysArr;
        },
        //向前切换页面
        setPreMonth () {
            if ( this.month <= 0 ){
                this.year = this.year - 1;
                this.month = 11;
            } else {
                this.month = this.month - 1;
            }
            this.getTime ( this.month, this.year )
        },
        //向后切换页面
        setNextMonth () {
            if ( this.month >= 11 ){
                this.year = this.year + 1;
                this.month = 0;
            } else {
                this.month = this.month + 1;
            }
            this.getTime( this.month, this.year )
        },
        //设置年份
        setYear (e) {
            if ( e.keyCode ){
                if ( e.keyCode === 13 ) {
                    if ( (this.year + '').length !== 4){
                        alert('您输入的年份格式不对');
                        this.year = this.date.getFullYear();
                        return false;
                    }
                    if ( (this.year + '').search(/\D/g) !== -1 ){
                        alert('您输入的年份格式不对');
                        this.year = this.date.getFullYear();
                        return false;
                    }
                    if ( (this.year + '').search(/^(19|20|21)/) === -1 ){
                        alert('您输入的年份格式不对');
                        this.year = this.date.getFullYear();
                        return false;
                    }
                    this.getTime( this.month, this.year )
                }
            } else {
                if ( (this.year + '').length !== 4){
                    alert('您输入的年份格式不对');
                    this.year = this.date.getFullYear();
                    return false;
                }
                if ( (this.year + '').search(/\D/g) !== -1 ){
                    alert('您输入的年份格式不对');
                    this.year = this.date.getFullYear();
                    return false;
                }
                if ( (this.year + '').search(/^(19|20|21)/) === -1 ){
                    alert('您输入的年份格式不对');
                    this.year = this.date.getFullYear();
                    return false;
                }
                this.getTime( this.month, this.year )
            }
        },
        //主输入框事件
        getSpecificDate () {
            this.vShow = !this.vShow
        },
        //点击日期事件
        setSpecificDate (e) {
            var td = e.target;
            if ( td.className === 'gay'){
                return false;
            }

            this.daysArr.map( ( el ) => {
                el.map( ( els ) => {
                    if ( els.isclick ) {
                        els.isclick = false;
                    }
                })
            })

            $( this.$refs.table ).find('tr').map( ( index, el ) => {
                if ( td.parentNode === el ) {
                    $( el ).find('td').map( ( inde, ele ) => {
                        if ( td === ele ) {
                            this.daysArr[ index - 1 ][ inde ].isclick = true;
                            this.clicks = [ index - 1, inde ]
                        }
                    })
                }
            })

            var year = this.year,
                month = this.month + 1,
                day = Number(td.innerHTML);

            this.clicksYM = { year, month: month - 1 }

            var obj = {
                year, month, day
            }
            if ( month < 10 ) {
                month = '0' + month
            }
            if ( day < 10 ) {
                day = '0' + day
            }
            this.specificDate = `${year} - ${month} - ${day}`
            this.getSpecificDate ()
            this.$emit( 'getNowDate', obj )
        }   
    }
}
</script>

<style scoped>
    .date {
        position: relative;
        display: inline-block;
    }
    .date-main {
        position: absolute;
        z-index: 100;
        background: rgb(245,245,245);    
    }
    .date-input input {
        padding-left: 10px; 
        width: 130px;
        cursor: pointer;
    }
    .date-ym > input {
        float: left; width: 70px; padding-left: 10px; height: 21px;
    }
    .setMonth {
        margin-left: 10px;
        float: left;
    }
    .setMonth > * {
        float: left;
        border: 1px solid #666;
        background-color: #fff;
    }
    .setMonth a {
        padding: 4px 5px;
    }
    .setMonth .right {
        border-right: none;
    }
    .setMonth .left {
        border-left: none;
    }     
    table {
        font-size: 11px;
        background-color: #fff;
        border-collapse: collapse;
        border: 1px solid #666
    }
    th{
        padding: 5px 0;
        background-color: rgba(180, 180, 180, 0.5)
    }
    td {
        cursor: pointer;
    }
    th, td {
        text-align: center;
        
    }
    .gay {
        color: rgb(180, 180, 180)
    }
    .orange {
        color: orange;
        font-weight: bold;
    }
    .today {
        color: red;
        font-weight: bold;
    }
    .date-main .date-ym a {
        color: #666;
        font-size: 15px;
        font-weight: bold;
    }
    .goToday {
        margin-left: 20px;
        font-size: 12px;
        float: left;
        background: #fff;
        padding: 5.5px 8px;
        border: 1px solid #666;
        cursor: pointer;
    }
</style>
