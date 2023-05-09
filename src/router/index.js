import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/login",
      name: "login",
      component: () => import("@/views/LoginView.vue"),
    },
    {
      path: "/feed",
      name: "feed",
      component: () => import("@/views/FeedView.vue"),
    },
    {
      path: "/",
      name: "main",
      component: () => import("@/views/ExploreView.vue"),
    },
    {
      path: "/profile",
      name: "profile",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("@/views/ProfileView.vue"),
    },
    {
      path: "/explore",
      name: "explore",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("@/views/ExploreView.vue"),
    },
    {
      path: "/dev",
      name: "dev",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("@/views/DevView.vue"),
    },
  ],
});

export default router;
