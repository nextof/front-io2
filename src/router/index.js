import {createRouter, createWebHistory} from 'vue-router'
import HomeView from '../views/HomeView.vue'
import CarsView from '../views/CarsView.vue'
import NotFoundView from '../views/NotFoundView.vue';
import CarView from '../views/CarView.vue';
import ClientView from '../views/ClientView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: HomeView
        },
        {
            path: '/vehicles',
            name: 'vehicles',
            component: CarsView
        },
        {
            path:'/:catchAll(.*)',
            name: 'not-found',
            component: NotFoundView
        },
        {
            path: '/vehicles/:id',
            name: 'car',
            component: CarView
        },
        { 
            path: '/client',
            name: 'client',
            component: ClientView

        }
    ],
});

export default router;