import Vue from 'vue';
import './style.scss';

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

import { checkFilter, setDay } from './util/bus';
const bus = new Vue();
Object.defineProperty(Vue.prototype, '$bus', { get() { return this.$root.bus } });

import VueRouter from 'vue-router';
Vue.use(VueRouter); // bound to this.$route

import routes from './util/routes';
const router = new VueRouter({ routes });

new Vue({
    el: '#app',
    data: {
        genre: [],
        time: [],
        movies: [],
        moment, // destructured assignment
        day: moment(), // no arg will be current day
        bus
    },
    router,
    created() { // lifecycle hook
        this.$http.get('/api').then(response => {
            this.movies = response.data;
        });
        this.$bus.$on('check-filter', checkFilter.bind(this)); // bind and pass Vue instance to function
        this.$bus.$on('set-day', setDay.bind(this)); // bind and pass Vue instance to function
    }
});
