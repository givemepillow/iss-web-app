import { createRouter, createWebHistory } from "vue-router";
import TheExplore from "@/components/explore/TheExplore.vue";
import TheProfile from "@/components/profile/TheProfile.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  mode: "history",
  routes: [
    {
      path: "/",
      name: "root",
      redirect: to => {
        return "explore";
      }
    },
    {
      path: "/:username/:tab?",
      name: "user",
      props: route => ({ username: route.params.username, tab: route.params.tab }),
      component: TheProfile,
      meta: {
        enterClass: "animate__animated animate__zoomIn",
        leaveClass: "animate__animated animate__fadeOutDown"
      }
    },
    {
      path: "/settings",
      name: "settings",
      component: () => import( "@/components/settings/TheSettings.vue"),
      meta: {
        enterClass: "animate__animated animate__zoomIn",
        leaveClass: "animate__animated animate__zoomOut"
      }
    },
    {
      path: "/login",
      name: "login",
      component: () => import( "@/components/login/TheLogin.vue"),
      meta: {
        enterClass: "animate__animated animate__zoomIn",
        leaveClass: "animate__animated animate__zoomOut"
      }
    },
    {
      path: "/new",
      name: "new",
      component: () => import( "@/components/new/PostEditor.vue"),
      meta: {
        enterClass: "animate__animated animate__fadeIn",
        leaveClass: "animate__animated animate__fadeOut"
      }
    },
    {
      path: "/posts/:id",
      name: "post",
      props: route => ({ post_id: route.params.id }),
      component: () => import( "@/components/observer/ThePost.vue"),
      meta: {
        enterClass: "animate__animated animate__zoomIn",
        leaveClass: "animate__animated animate__fadeOutDown"
      }
    },
    {
      path: "/explore",
      name: "explore",
      component: TheExplore,
      meta: {
        enterClass: "animate__animated animate__fadeInDown",
        leaveClass: "animate__animated animate__fadeOutDown"
      }
    }
  ]
});

export default router;
