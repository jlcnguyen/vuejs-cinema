<template>
    <div id="movie-filter">
        <h2>Filter Results</h2>
        <h3>By time of day</h3>
        <div class='filter-group'>
            <check-filter v-for="time in times" v-bind:title="time" category="time"></check-filter>
        </div>
        <h3>By genre</h3>
        <div class='filter-group'>
            <check-filter v-for="genre in genres" v-bind:title="genre" category="genre"></check-filter>
        </div>
    </div>
</template>

<script>
    import genres from '../util/genres';
    import times from '../util/times';
    import CheckFilter from './CheckFilter.vue';

    export default {
        data() {
            return {
                // destructured assignment where if name of var is same as name of
                // property, can be written as follows
                genres,
                times
            };
        },
        components: { // available in movie-filter but nowhere else
            CheckFilter
        }
    }
</script>
