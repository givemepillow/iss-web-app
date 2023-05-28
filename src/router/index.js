import { createRouter, createWebHistory } from "vue-router";
import { useUserInfoStore } from "@/stores/userinfo";
import TheExplore from "@/components/explore/TheExplore.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  mode: "history",
  routes: [
    {
      path: "/",
      name: "root",
      redirect: to => {
        const userinfo = useUserInfoStore();
        if (!userinfo.isSet()) {
          return "login";
        } else {
          return "explore";
        }
      }
    },
    {
      path: "/:username/:tab?",
      name: "user",
      props: route => ({ username: route.params.username, tab: route.params.tab }),
      component: () => import( "@/components/profile/TheProfile.vue"),
      meta: {
        enterClass: "animate__animated animate__zoomIn",
        leaveClass: "animate__animated animate__fadeOutDown"
      }
    },
    {
      path: "/profile",
      name: "profile",
      redirect: to => {
        const userinfo = useUserInfoStore();
        if (!userinfo.isSet()) {
          return "login";
        } else {
          return { path: `/${userinfo.username()}` };
        }
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
      component: () => import( "@/components/observer/PostObserver.vue"),
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
