<template>
    <div class="movie">
        <div class="movie-col-left">
            <router-link v-bind:to="{ name: 'movie', params: { id: movie.imdbID } }">
                <img v-bind:src="movie.Poster">
            </router-link>
        </div>
        <div class="movie-col-right">
            <div class="movie-title">
                <router-link v-bind:to="{ name: 'movie', params: { id: movie.imdbID } }">
                    <h2>{{ movie.Title }}</h2>
                </router-link>
                <span class="movie-rating">{{ movie.Rated }}</span>
            </div>
            <slot></slot>
            <!-- <div class="movie-sessions">
                <div class="session-time-wrapper" v-for="session in filteredSessions(sessions)">
                    <div class="session-time">
                        {{ formatSessionTime(session.time) }}
                    </div>
                </div>
            </div> -->
        </div>
    </div>
</template>

<script>
    import times from '../util/times';

    export default {
        props: [ 'movie' ],
    }
</script>
