<template>
    <div class="chooser-conponents">
        <ul>
            <li v-for="(item, index) in selections" :key="index" :class="{ on: checkActive(index) }" @click="toggleSelection(index)">
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
            default: [
                {
                    label: 'test',
                    value: 0
                }
            ]
        }
    },
    data () {
        return {
            nowIndexes: [0],
        }
    },
    methods: {
        toggleSelection (index) {
            var con = this.nowIndexes.indexOf( index );
            if ( con === -1 ) {
                this.nowIndexes.push( index )
            } else {
                if ( this.nowIndexes.length <= 1 ) {
                    return;
                }
                this.nowIndexes.splice( con, 1 );
            }
            let nowObjArray = this.nowIndexes.map( (el) => {
                return this.selections[el]
            })
            this.$emit( 'on-change', nowObjArray )
        },
        checkActive (index) {
            return this.nowIndexes.indexOf(index) !== -1;
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
