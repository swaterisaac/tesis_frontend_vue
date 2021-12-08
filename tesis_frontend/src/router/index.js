import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import { getAuth } from 'firebase/auth';

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      requiresAuth: true,
    }
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue')
  },
  {
    path: '/registro',
    name: 'Registro',
    component: () => import('../views/Registro.vue'),
    meta: {
      requiresAuth: true,
    }
  },
  {
    path: '/detalleOferta/:idOferta',
    name: 'DetalleOferta',
    component: () => import('../views/DetalleOferta.vue'),
    meta: {
      requiresAuth: true,
    }
  },
  {
    path: '/perfil',
    name: 'Perfil',
    component: () => import('../views/Perfil.vue'),
    meta: {
      requiresAuth: true,
    }
  },
  {
    path: '/test',
    name: 'Test',
    component: () => import('../views/Test.vue'),
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

router.beforeEach((to, from, next) => {
  const auth = getAuth();
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  const isAuthenticated = auth.currentUser;
  if (requiresAuth && !isAuthenticated) {
    next("/login");
  } else {
    next();
  }
});

export default router
