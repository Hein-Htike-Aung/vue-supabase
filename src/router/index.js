import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import Create from "../views/Create.vue";
import Login from "../views/Login.vue";
import Register from "../views/Register.vue";
import ViewWorkout from "../views/ViewWorkout.vue";
import { supabase } from "../supabase/init";

const routes = [
  {
    path: "/",
    name: "home",
    component: Home,
    meta: {
      title: "Home",
      auth: false,
    },
  },
  {
    path: "/create",
    name: "create",
    component: Create,
    meta: {
      title: "Create",
      auth: true,
    },
  },
  {
    path: "/login",
    name: "login",
    component: Login,
    meta: {
      title: "Login",
      auth: false,
    },
  },
  {
    path: "/register",
    name: "register",
    component: Register,
    meta: {
      title: "Register",
      auth: false,
    },
  },
  {
    path: "/view-workout/:workoutId",
    name: "view-workout",
    component: ViewWorkout,
    meta: {
      title: "View Workout",
      auth: false,
    },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

// Change document titles
router.beforeEach((to, from, next) => {
  document.title = `${to.meta.title} | Active Tracker`;
  next();
});

// Route guard for auth routes
router.beforeEach(async (to, from, next) => {
  const user = await supabase.auth.user();

  // if the route is required auth
  if (to.matched.some((res) => res.meta.auth)) {
    if (user) {
      // if the user logged in
      next();
      return;
    }
    next({ name: "login" });
    return;
  }
  next();
});

export default router;
