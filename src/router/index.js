import { createRouter, createWebHistory } from "vue-router";
import PostView from "@/views/PostView.vue";
import NewView from "@/views/NewView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "main",
      component: () => import("@/views/ExploreView.vue")
    },
    {
      path: "/posts/new",
      name: "new",
      component: NewView
    },
    {
      path: "/posts/:id",
      name: "post",
      props: route => ({ post_id: route.params.id }),
      component: PostView
    },
    {
      path: "/explore",
      name: "explore",
      component: () => import("@/views/ExploreView.vue")
    },
    {
      path: "/posts",
      name: "posts",
      component: () => import("@/views/ExploreView.vue")
    },
    {
      path: "/login",
      name: "login",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("@/views/LoginView.vue")
    },
    {
      path: "/dev",
      name: "dev",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("@/views/DevView.vue")
    }
  ]
});

export default router;
