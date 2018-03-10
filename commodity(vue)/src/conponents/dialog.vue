<template>
    <div>
        <div class="dialog-wrap">
            <div class="dialog-cover"  @click="closeMyself" v-if='isShow'></div>
            <transition name="fade">
                <div class="dialog-content" v-if='isShow'>
                    <p class="dialog-close" @click="closeMyself">X</p>
                    <slot></slot>
                </div>
            </transition>   
        </div>
    </div>
</template>

<script>
export default {
    name: 'dialog',
    props: {
        isShow: {
            type: Boolean,
            default: false
        }
    },
    data () {
        return {

        }
    },  
    methods: {
        closeMyself () {
            this.$emit('on-close');
        }
    }
}
</script>

<style>
    .dialog-wrap {
        position: fixed;
        width: 100%;
        height: 100%;
    }
    .dialog-cover {
        background: #000;
        opacity: .3;
        position: fixed;
        z-index: 5;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
    }
    .dialog-content {
        width: 40%;
        position: fixed;
        max-height: 50%;
        overflow: auto;
        background-color: #fff;
        top: 20%;
        left: 50%;
        margin-left: -20%;
        z-index: 10;
        border: 1px solid #464068;
        padding: 2%;
        line-height: 1.6;
    }
    .dialog-close {
        font-size: 14px;
        position: absolute;
        right: 0;
        top: 0;
        padding: 0px 8px;
        margin: 1%;
        cursor: pointer;
    }
    .dialog-close:hover {
        background: orange;
        color: #fff;
    }
    .fade-enter-active, .fade-leave-active {
        transition: all .3s
    }
    .fade-enter {
        top: -300px;
    }
    .fade-leave-to {
        top: -300px;
    }
</style>
