import { defineStore } from "pinia";
import { getMe } from "@/services/api";
import Me from "@/models/me";

export const useUserInfoStore = defineStore(
  "userinfo", () => {
    let user = null;

    async function get() {
      if (user === null) {
        let response = await getMe();
        if (response.ok) {
          let result = await response.json();
          user = new Me(result);
        } else {
          return null;
        }
      }
      return user;
    }

    return {
      user,
      get
    };
  }
);