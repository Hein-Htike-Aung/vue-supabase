import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import Create from "../views/Create.vue";
import Login from "../views/Login.vue";
import Register from "../views/Register.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: Home,
  },
  {
    path: "/create",
    name: "create",
    component: Create,
  },
  {
    path: "/login",
    name: "login",
    component: Login,
  },
  {
    path: "/register",
    name: "register",
    component: Register,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

// Change document titles

// Route guard for auth routes

export default router;
