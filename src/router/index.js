import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import CarsView from '../views/CarsView.vue'
import NotFoundView from '../views/NotFoundView.vue';
import CarView from '../views/CarView.vue';
import ClientView from '../views/ClientView.vue';
import LoginView from '../views/LoginView.vue';
import StaffView from '../views/StaffView.vue';
import ManageVehiclesView from '../views/ManageVehiclesView.vue';
import UnauthorizedView from '../views/UnauthorizedView.vue';
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
      path: '/staff',
      name: 'staff',
      component: StaffView,
      meta: { 
        requiresAuth: true,
        requiresStaff: true 
      },
      children: [
        {
          path: '',
          redirect: { name: 'staff-vehicles' }
        },
        {
          path: 'vehicles',
          name: 'staff-vehicles',
          component: ManageVehiclesView
        }
      ]
    },
    { 
      path: '/login',
      name: 'login',
      component: LoginView
    },
    {
      path: '/unauthorized',
      name: 'unauthorized',
      component: UnauthorizedView
    },
    {
      path: '/:catchAll(.*)',
      name: 'not-found',
      component: NotFoundView
    }
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
        query: { redirect: to.fullPath } 
      });
    } 
    // If route requires staff role, check user roles
    else if (to.matched.some(record => record.meta.requiresStaff)) {
      if (user.roles && (user.roles.includes('ROLE_ADMIN') || user.roles.includes('ROLE_EMPLOYEE') || user.roles.includes('ROLE_SERVICE'))) {
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