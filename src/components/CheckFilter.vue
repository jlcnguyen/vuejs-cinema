<template>
    <div v-bind:class="{'check-filter': true, active: checked}" v-on:click="checkFilter">
        <span class="checkbox"></span>
        <span class="check-filter-title">{{ title }}</span>
    </div>
</template>

<script>
    import genres from '../util/genres';

    export default {
        // title is the specific value of the check (i.e. label)
        // category is the type of the check
        props: [ 'title', 'category' ],
        data() {
            return {
                checked: false
            };
        },
        methods: {
            checkFilter() {
                this.checked = !this.checked;
                this.$bus.$emit('check-filter', this.category, this.title, this.checked); // emit to movie filter
            }
        }
    }
</script>
