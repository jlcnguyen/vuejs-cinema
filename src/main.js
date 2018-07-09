import Vue from 'vue';
import './style.scss';

import MovieList from './components/MovieList.vue';
import MovieFilter from './components/MovieFilter.vue';

import VueResource from 'vue-resource';
// vue-resouce attached to $http
// essentially installs module as instance method in main object
Vue.use(VueResource); // Vue.use can only be used if module made to integrate with Vue

import moment from 'moment-timezone';
moment.tz.setDefault("UTC"); // set and override browser's default timezone
// make any library, method, function avaiable in any component
// Object.defineProperty allows you to add a property to an existing object
// first arg is object property is to be added to (Vue.prototype bc components created from here)
// second arg is name to give property
// third arg is the property to add
Object.defineProperty(Vue.prototype, '$moment', { get() { return this.$root.moment } });

new Vue({
    el: '#app',
    data: {
        genre: [],
        time: [],
        movies: [],
        moment, // destructured assignment
        day: moment() // no arg will be current day
    },
    methods: {
        checkFilter(category, title, checked) {
            if (checked) {
                this[category].push(title);
            } else {
                let index = this[category].indexOf(title);
                if (index > -1) {
                    this[category].splice(index, 1);
                }
            }
        }
    },
    components: { // registered components can then be used ini html
        // vue knows to revert to kebab-case
        // destructured assignment
        MovieList,
        MovieFilter
    },
    created() { // lifecycle hook
        this.$http.get('/api').then(response => {
            this.movies = response.data;
        });
    }
});
