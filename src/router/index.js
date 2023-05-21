import { createRouter, createWebHistory } from "vue-router";
import PostEditor from "@/components/editor/PostEditor.vue";
import TheWall from "@/components/wall/TheWall.vue";
import PostObserver from "@/components/observer/PostObserver.vue";
import TheLogin from "@/components/login/TheLogin.vue";
import { useUserInfoStore } from "@/stores/userinfo";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),

  routes: [
    {
      path: "/",
      name: "root",
      redirect: to => {
        const userinfo = useUserInfoStore();
        if (userinfo.user !== null) {
          return "login";
        } else {
          return "explore";
        }
      }
    },
    {
      path: "/login",
      name: "login",
      component: TheLogin,
      meta: {
        enterClass: "animate__animated animate__zoomIn",
        leaveClass: "animate__animated animate__zoomOut"
      }
    },
    {
      path: "/new",
      name: "new",
      component: PostEditor,
      meta: {
        enterClass: "animate__animated animate__fadeInRight",
        leaveClass: "animate__animated animate__fadeOutLeft"
      }
    },
    {
      path: "/posts/:id",
      name: "post",
      props: route => ({ post_id: route.params.id }),
      component: PostObserver,
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
        enterClass: "animate__animated animate__fadeInLeft",
        leaveClass: "animate__animated animate__fadeOutRight"
      }
    }
  ]
});

export default router;
