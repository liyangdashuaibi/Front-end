<template>
    <div class="main">
        <ul>
            <li class="reduce" @click="numReduce"><a href="javascript:;">-</a></li>
            <li class="number">
                <input type="text" v-model="num" @keyup="numKey">
            </li>
            <li class="add" @click="numAdd"><a href="javascript:;">+</a></li>
        </ul>
    </div>
</template>

<script>
export default {
    props: {
        selections: {
            type: Number,
            default: 10
        }
    },
    data () {
        return {
            num: 1,
            maxNum: this.selections,
            minNum: 1
        }
    },
    watch: {
        num () {
            this.$emit( 'on-change', this.num )
        }
    },
    methods: {
        numAdd () {
            if ( this.num >= this.maxNum ){
                return;
            }
            this.num ++;
        },
        numReduce () {
            if ( this.num <= this.minNum ){
                return;
            }
            this.num --;
        },
        numKey () {
            let fix;
            if ( typeof this.num === 'string' ) {
                fix = Number( this.num.replace( /\D/g,'' ) )
            } else {
                fix = this.num
            }
            if ( this.num >= this.maxNum ){
                fix = this.maxNum;
            }
            if ( this.num <= this.minNum ){
                fix = this.minNum;
            }
            this.num = fix;
        }
    }
}
</script>

<style scoped>
    ul {
        list-style: none;
        font-size: 13px;
    }
    li {
        float: left;
        border: 1px solid #e3e3e3;
    }
    a:hover {
        text-decoration: none;
    }
    .add a, .reduce a {
        width: 25px;
        height: 25px;
        display: block;
        cursor: pointer;
        text-align: center;
        line-height: 25px;
        color: #666;
    }
    .reduce {
        border-right: none;
    }
    .add {
        border-left: none;
    }
    .number input {
        border: none;
        width: 35px;
        height: 23px;
        text-align: center;
    }
</style>
