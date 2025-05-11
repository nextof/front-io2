import {createRouter, createWebHistory} from 'vue-router'
import HomeView from '../views/HomeView.vue'
import CarsView from '../views/CarsView.vue'
import NotFoundView from '../views/NotFoundView.vue';
import CarView from '../views/CarView.vue';
import ClientView from '../views/ClientView.vue';
import LoginView from '../views/LoginView.vue';
import { getCurrentUser } from '../services/UserService';

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
            path: '/vehicles/:id',
            name: 'car',
            component: CarView
        },
        { 
            path: '/client',
            name: 'client',
            component: ClientView,
            meta: { requiresAuth: true }
        },
        {
            path: '/admin',
            name: 'admin',
            component: () => import('../views/AdminView.vue'),
            meta: { 
                requiresAuth: true,
                requiresAdmin: true 
            }
        },
        { 
            path: '/login',
            name: 'login',
            component: LoginView
        },
        {
            path: '/:catchAll(.*)',
            name: 'not-found',
            component: NotFoundView
        }
    ],
});

// Simple navigation guard
router.beforeEach(async (to, from, next) => {
    // Check if the route requires authentication
    if (to.matched.some(record => record.meta.requiresAuth)) {
        const user = await getCurrentUser();
        
        // If not logged in, redirect to login page
        if (!user) {
            next({ 
                path: '/login',
                query: { redirect: to.fullPath } 
            });
        } 
        // If route requires admin role, check user roles
        else if (to.matched.some(record => record.meta.requiresAdmin)) {
            if (user.roles && user.roles.includes('ROLE_ADMIN')) {
                next();
            } else {
                next({ path: '/' }); // Redirect to home if not admin
            }
        } else {
            next(); // User is authenticated
        }
    } else {
        next(); // Route doesn't require auth
    }
});

export default router;