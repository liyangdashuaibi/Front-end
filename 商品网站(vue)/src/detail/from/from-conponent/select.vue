<template>
    <div class="selection-component">
        <div class="selection-show" @click="toggleDrop" :style="{width: setWidth + 'px'}">
            <span>{{selections[nowIndex].label}}</span>
            <div class="arrow" :style="{left: setWidth + 'px'}"></div>
        </div>
        <div class="selection-list" v-if="isDrop">
            <ul>
                <li v-for="(item, index) in selections" :key="index" @click="closeSelection(index)" :title="item.label">{{item.label}}</li>
            </ul>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        selections: {
            type: Array,
            default () {
                return [
                    {
                        label: 'test',
                        value: 0
                    }
                ]
            }
        },
        setNowIndex: {
            type: Number,
            default: 0
        },
        setWidth: {
            type: Number,
            default: 60
        }
    },
    created () {
        this.equal ()
    },
    data () {
        return {
            isDrop: false,
            nowIndex: 0
        }
    },
    methods: {
        toggleDrop () {
            this.isDrop = !this.isDrop;
        },
        closeSelection (index) {
            this.nowIndex = index;
            this.isDrop = false;
            this.$emit( 'on-change', this.selections[this.nowIndex] )
        },
        equal () {
            this.nowIndex = this.setNowIndex
        }
    },
    watch: {
        setNowIndex () {
            this.equal()
            this.isDrop = false;
        }
    }
}
</script>

<style scoped>
    .selection-component {
        position: relative;
        display: inline-block;
        font-size: 12px;
    }
    .selection-show {
        border: 1px solid #e3e3e3;
        background: rgb(245,245,245);
        padding: 0 10px 0 10px;
        display: inline-block;
        position: relative;
        cursor: pointer;
        height: 23px;
        line-height: 23px;
    }
    .selection-show .arrow {
        border-left: 4px solid transparent;
        border-right: 4px solid transparent;
        border-top: 5px solid #666;
        position: absolute;
        width: 0;
        height: 0;
        top: 11.2px;
        vertical-align: middle;
    }
    .selection-list {
        display: inline-block;
        position: absolute;
        left: 0;
        top: 23px;
        width: 100%;
        background-color: #fff;
        border-top: 1px solid #e3e3e3;
        border-bottom: 1px solid #e3e3e3;
        z-index: 5;
    }
    .selection-list ul {
        list-style: none;
    }
    .selection-list li {
        padding: 3px 15px 3px 10px;
        border-left: 1px solid #e3e3e3;
        border-right: 1px solid #e3e3e3;
        cursor: pointer;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }
    .selection-list li:hover {
        background-color: #e3e3e3;
    }
</style>
