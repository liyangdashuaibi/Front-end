<template>
    <div style="display: inline-block">
        <v-select v-if="select" :selections="selData" :setNowIndex="setNowIndex" @on-change="onPchange( $event )"></v-select>

        <v-radio v-if="radio" :selections="selData" @on-change="onPchange( $event )"></v-radio>

        <v-checkbox v-if="checkbox" :selections="selData" @on-change="onPchange( $event )"></v-checkbox>

        <v-number v-if="number" :selections="selData" @on-change="onPchange( $event )"></v-number>
    </div>
</template>

<script>
import vSelect from './from-conponent/select'
import vRadio from './from-conponent/radio'
import vCheckbox from './from-conponent/checkbox'
import VNumber from './from-conponent/number'

export default {
    components: {
        vSelect, vRadio, vCheckbox, VNumber
    },
    created () {
        this[this.selections.type] = true;
    },
    props: {
        selections: {
            type: Object,
            default: function () {
                return {
                    type: 'select',
                    data: [
                        {
                            label: 'test',
                            value: 0
                        }
                    ]
                }
            }
        },
        setNowIndex: {
            type: Number,
            default: 0
        }
    },
    data () {
        return {
            select: false,
            radio: false,
            checkbox: false,
            number: false,
        }
    },
    methods: {
        onPchange ( value ) {
            this.$emit( 'con-change', value )
        }
    },
    computed: {
        selData () {
            return this.selections.data;
        }
    }
}
</script>

<style>

</style>
