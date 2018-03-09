<template>
    <div class="chooser-conponents">
        <ul>
            <li v-for="(item, index) in selections" :key="index" :class="{ on:index === nowIndex }" @click="closeSelection(index)">
                {{item.label}}
            </li>
        </ul>
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
        }
    },
    data () {
        return {
            nowIndex: 0
        }
    },
    methods: {
        closeSelection (index) {
            this.nowIndex = index;
            this.$emit( 'on-change', this.selections[this.nowIndex] )
        }
    }
}
</script>

<style scoped>
    .chooser-conponents {
        font-size: 12px;
    }
    .chooser-conponents ul {
        list-style: none;
    }
    .chooser-conponents li {
        float: left;
        padding: 3px 8px;
        background-color: #fff;
        cursor: pointer;
        border: 1px solid #e3e3e3;
    }
    .chooser-conponents li + li {
        margin-left: 5px;
    }
    .chooser-conponents .on {
        background-color: rgb(0,200,150);
        border-color: rgb(0,200,150);
        color: #fff;
    }
</style>
