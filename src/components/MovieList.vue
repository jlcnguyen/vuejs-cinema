<template>
    <div id="movie-list">
        <div v-if="filteredMovies.length">
            <movie-item v-for="movie in filteredMovies" v-bind:movie="movie.movie">
                <div class="movie-sessions">
                    <div class="session-time-wrapper tooltip-wrapper"
                         v-for="session in filteredSessions(movie.sessions)"
                         v-bind:key="session.id"
                         v-tooltip="{ seat: session.seats }"
                    >
                        <div class="session-time ">{{ formatSessionTime(session.time) }}</div>
                    </div>
                </div>
            </movie-item>
        </div>

        <div class="no-results" v-else-if="movies.length">
            {{ noResults }}
        </div>
        <div class="no-results" v-else>
            Loading...
        </div>
    </div>
</template>

<script>
    import genres from '../util/genres';
    import times from '../util/times';
    import MovieItem from './MovieItem.vue';

    export default {
        props: [ 'genre', 'time', 'movies', 'day' ],
        computed: {
            filteredMovies() {
                return this.movies.filter(this.moviePassesGenreFilter)
                                  .filter(movie => movie.sessions.find(this.sessionPassesTimeFilter));
            },
            noResults() {
                let times = this.time.join(', '); // join into string with each element separated by ", "
                let genres = this.genre.join(', ');
                // ${} allows to put expression in ``
                return `No results for ${times}${times.length && genres.length ? ', ' : ''}${genres}.`
                // return 'No results for ' +  times + ', ' + genres;
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
                if (!this.$moment(session.time).isSame(this.day, 'day')) {
                    return false;
                } else if (this.time.length === 0 || this.time.length === 2) {
                    return true;
                } else if (this.time[0] == times.AFTER_6PM) {
                    return this.$moment(session.time).hour() >= 18; // 18th hour
                } else {
                    return this.$moment(session.time).hour() < 18;
                }
            },
            formatSessionTime(raw) {
                // hours:minute AM/PM
                return this.$moment(raw).format('h:mm A');
            },
            filteredSessions(sessions) {
                return sessions.filter(this.sessionPassesTimeFilter);
            }
        },
        components: {
            MovieItem
        },
    }
</script>
