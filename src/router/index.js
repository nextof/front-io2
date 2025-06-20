import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import CarsView from '../views/CarsView.vue';
import NotFoundView from '../views/NotFoundView.vue';
import CarView from '../views/CarView.vue';
import ClientView from '../views/ClientView.vue';
import LoginView from '../views/LoginView.vue';
import StaffView from '../views/StaffView.vue';
import ManageVehiclesView from '../views/ManageVehiclesView.vue';
import MaintenanceTasksView from '../views/MaintenanceTasksView.vue';
import UnauthorizedView from '../views/UnauthorizedView.vue';
import { getCurrentUser } from '../services/UserService';
import PaymentSuccessView from '../views/PaymentSuccessView.vue';
import PaymentCancelView from '../views/PaymentCancelView.vue';
import ManageUsersView from '../views/ManageUsersView.vue';
import ReservationsView from '../views/ReservationsView.vue';
import RegistrationView from '../views/RegistrationView.vue';
import ProfileView from '../views/ProfileView.vue';

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: HomeView,
        },
        {
            path: '/vehicles',
            name: 'vehicles',
            component: CarsView,
        },
        {
            path: '/vehicles/:id',
            name: 'car',
            component: CarView,
        },
        {
            path: '/client',
            name: 'client',
            component: ClientView,
            meta: { requiresAuth: true },
        },
        {
            path: '/profile',
            name: 'profile',
            component: ProfileView,
        },
        {
            path: '/payment/success',
            name: 'payment-success',
            component: PaymentSuccessView,
        },
        {
            path: '/payment/cancel',
            name: 'payment-cancel',
            component: PaymentCancelView,
        },
        {
            path: '/staff',
            name: 'staff',
            component: StaffView,
            meta: {
                requiresAuth: true,
                requiresStaff: true,
            },
            children: [
                {
                    path: '',
                    beforeEnter: (to, from, next) => {
                        const roles = getCurrentUser.value.roles;

                        if (roles?.includes('ROLE_ADMIN')) {
                            next({ name: 'staff-users' });
                        } else if (roles?.includes('ROLE_MODERATOR')) {
                            next({ name: 'staff-vehicles' });
                        } else {
                            next({ name: 'staff-maintenance' });
                        }
                    },
                },
                {
                    path: 'vehicles',
                    name: 'staff-vehicles',
                    component: ManageVehiclesView,
                },
                {
                    path: 'maintenance-tasks',
                    name: 'staff-maintenance',
                    component: MaintenanceTasksView,
                },
                {
                    path: 'reservations',
                    name: 'staff-reservations',
                    component: ReservationsView,
                },
                {
                    path: 'users',
                    name: 'staff-users',
                    component: ManageUsersView,
                },
            ],
        },
        {
            path: '/login',
            name: 'login',
            component: LoginView,
        },
        {
            path: '/register',
            name: 'register',
            component: RegistrationView,
        },
        {
            path: '/unauthorized',
            name: 'unauthorized',
            component: UnauthorizedView,
        },
        {
            path: '/:catchAll(.*)',
            name: 'not-found',
            component: NotFoundView,
        },
    ],
});

// Navigation guard
router.beforeEach(async (to, from, next) => {
    // Check if the route requires authentication
    if (to.matched.some(record => record.meta.requiresAuth)) {
        const user = await getCurrentUser();

        // If not logged in, redirect to login page
        if (!user) {
            next({
                path: '/login',
                query: { redirect: to.fullPath },
            });
        }
        // If route requires staff role, check user roles
        else if (to.matched.some(record => record.meta.requiresStaff)) {
            if (
                user.roles &&
                (user.roles.includes('ROLE_ADMIN') ||
                    user.roles.includes('ROLE_MODERATOR') ||
                    user.roles.includes('ROLE_MECHANIC'))
            ) {
                next();
            } else {
                next({ path: '/unauthorized' }); // Redirect to unauthorized page
            }
        } else {
            next(); // User is authenticated
        }
    } else {
        next(); // Route doesn't require auth
    }
});

export default router;
