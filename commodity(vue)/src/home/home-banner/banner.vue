<template>
    <div class="banner" @mouseover="clearInv()" @mouseout="runInv()">
        <div class="slide-image">
            <router-link :to="{ path: slides[count].href }" tag="a">
                <transition :name='slidesTran[0]'>
                    <img v-if="ishow" :src="slides[count].src" :title="slides[count].title">
                </transition>
                <transition :name="slidesTran[1]">
                    <img v-if="!ishow" :src="slides[count].src" :title="slides[count].title">
                </transition>
            </router-link>
        </div>
        <div class="slide-fad">
            <h2>{{slides[count].title}}</h2>
            <ul class="slide-pages">
                <li @click="goto(prevIndex)">&lt;</li>
                <li v-for="(item, index) in slides" :key="index" @click="goto(index)">
                    <a :class="{on: index === count}">{{index + 1}}</a>
                </li>
                <li @click="goto(nextIndex)">&gt;</li>
            </ul>
        </div>
    </div>
</template>

<script>
export default {
    name: 'banner',
    props: {
        slides: {
            type: Array,
            default: []
        },
        inv: {
            type: Number,
            default: 3000
        }
    },
    data () {
        return {
            count: 0,
            ishow: true,
            slidesTran: [
                'fade',
                'fade-old'
            ]
        }
    },
    computed: {
        prevIndex () {
            if ( this.count === 0 ){
                return this.slides.length - 1
            } else {
                return this.count - 1
            }
        },
        nextIndex () {
            if ( this.count === this.slides.length - 1 ){
                return 0
            } else {
                return this.count + 1
            }
        }
    },
    methods: {
        goto ( index ) {
            if (this.count === index){
                return;
            } else if ( this.count > index ){
                this.slidesTran[0] = 'fide';
                this.slidesTran[1] = 'fide-old';
            } else {
                this.slidesTran[0] = 'fade';
                this.slidesTran[1] = 'fade-old';
            }
            this.ishow = false;
            setTimeout( () => {
                this.ishow = true;
                this.count = index;
            },10)
        },
        runInv () {
            this.invId = setInterval( () => {
                this.goto( this.nextIndex )
            }, this.inv)
        },
        clearInv () {
            clearInterval(this.invId)
        }
    },
    mounted (){
        this.runInv()
    }
}
</script>

<style scoped>
    .fade-enter-active {
        transition: all .5s;
    }
    .fade-enter {
        transform: translateX(890px);
    }
    .fade-old-leave-active {
        transition: all .5s;
        transform: translateX(-890px);
    }
    .fide-enter-active {
        transition: all .5s;
    }
    .fide-enter {
        transform: translateX(-890px);
    }
    .fide-old-leave-active {
        transition: all .5s;
        transform: translateX(890px);
    }
    .banner{
        width: 100%;
        margin-bottom: 10px;
        position: relative;
        color: #fff;
    }
    a {
        color: #fff;
    }
    .slide-image {
        position: relative;
        overflow: hidden;
        width: 890px;
        height: 350px;
    }
    .slide-image img {
        width: 890px;
        height: 350px;
        position: absolute;
        top: 0;
        left: 0;
    }
    .slide-fad {
        width: 100%;
        position: absolute;
        bottom: 0;
        background-color: rgba(60, 60, 60, 0.7);
    }
    h2 {
        font-size: 14px;
        float: left;
        margin-left: 10px
    }
    .slide-pages {
        float: right;
        list-style: none;
        margin-right: 10px;
    }
    .slide-pages li, .slide-pages a {
        cursor: pointer;
        float: left;
        padding-left: 5px;
    }
    .on {
        color: red;
    }
</style>
