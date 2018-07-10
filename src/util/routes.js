import Overview from '../components/Overview.vue';
import Detail from '../components/Detail.vue';

export default [
    { path: '/', component: Overview, name: 'home' }, // homepage
    { path: '/movie/:id', component: Detail, name: 'movie' }, // detail
    { path: '*', redirect: { name: 'home' } } // catchall - redirect to homepage
];
