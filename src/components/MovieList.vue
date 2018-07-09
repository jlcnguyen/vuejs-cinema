<template>
    <div id="movie-list">
        <div v-if="filteredMovies.length">
            <movie-item v-for="movie in filteredMovies"
                        v-bind:movie="movie.movie"
                        v-bind:sessions="movie.sessions"
                        v-bind:day="day"></movie-item>
        </div>
        <div class="no-results" v-else-if="movies.length">
            No results.
        </div>
        <div class="no-results" v-else>
            Loading...
        </div>
    </div>
</template>

<script>
  import genres from '../util/genres';
  import MovieItem from './MovieItem.vue'

    export default {
        props: ['genre', 'time', 'movies', 'day'],
        computed: {
            filteredMovies() {
                return this.movies.filter(this.moviePassesGenreFilter)
                                  .filter(movie => movie.sessions.find(this.sessionPassesTimeFilter));
            }
        },
        methods: {
            moviePassesGenreFilter(movie) {
                // movie must contain all genres in genre list but can contain
                // other genres not in the list
                if (!this.genre.length) {
                    return true;
                } else {
                    let movieGenres = movie.movie.Genre.split(", ");
                    let matched = true;
                    this.genre.forEach(genre => {
                        if (movieGenres.indexOf(genre) === -1) {
                            matched = false;
                        }
                    });
                    return matched;
                }
            },
            sessionPassesTimeFilter(session) {
                if (this.$moment(session.time).isSame(this.day)) {
                
                }
            }
        },
        components: {
            MovieItem
        },
        created() {
            console.log(this.$moment);
        }
    }
</script>
