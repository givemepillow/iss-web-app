import { defineStore } from "pinia";
import { getMe } from "@/services/api";
import Me from "@/models/me";
import { ref } from "vue";

export const useUserInfoStore = defineStore(
  "userinfo", () => {
    const user = ref(null);

    async function get(update) {
      if (update || user.value === null) {
        let response = await getMe();
        if (response.ok) {
          let result = await response.json();
          user.value = new Me(result);
        } else {
          window.location = "login";
        }
      }
      return user.value;
    }


    function username() {
      return user.value.username;
    }

    function isSet() {
      return user.value !== null;
    }

    return {
      isSet,
      username,
      get
    };
  }
);