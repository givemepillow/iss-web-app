import { defineStore } from "pinia";
import { getMe } from "@/services/api";
import { ref } from "vue";
import Me from "@/models/me";

export const useUserInfoStore = defineStore(
  "userinfo", () => {
    const user = ref(null);

    async function get() {
      if (user.value === null) {
        let response = await getMe();
        if (response.ok) {
          let result = await response.json();
          user.value = new Me(result);
        } else {
          return null;
        }
      }
      return user.value;
    }

    return {
      user,
      get
    };
  }
);