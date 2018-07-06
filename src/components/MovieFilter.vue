<template>
  <div id="movie-filter">
    <h2>Filter Results</h2>
    <div class='filter-group'>
      <check-filter v-for="genre in genres" v-bind:title="genre" v-on:check-filter="checkFilter"></check-filter>
    </div>
  </div>
</template>

<script>
  import genres from '../util/genres';
  import CheckFilter from './CheckFilter.vue';

  export default {
    data() {
      return {
        // destructured assignment where if name of var is same as name of
        // property, can be written as follows
        genres
      };
    },
    methods: {
      checkFilter(category, title, checked) {
        this.$emit('check-filter', category, title, checked); // emit to root
      }
    },
    components: { // available in movie-filter but nowhere else
      CheckFilter
    }
  }
</script>
