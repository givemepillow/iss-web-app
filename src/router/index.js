import { createRouter, createWebHistory } from "vue-router";
import TheWall from "@/components/wall/TheWall.vue";
import { useUserInfoStore } from "@/stores/userinfo";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  mode: "history",
  routes: [
    {
      path: "/",
      name: "root",
      redirect: to => {
        const userinfo = useUserInfoStore();
        if (userinfo.user === null) {
          return "login";
        } else {
          return "explore";
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
      component: () => import( "@/components/editor/PostEditor.vue"),
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
      component: TheWall,
      meta: {
        enterClass: "animate__animated animate__fadeInDown",
        leaveClass: "animate__animated animate__fadeOutDown"
      }
    }
  ]
});

export default router;
