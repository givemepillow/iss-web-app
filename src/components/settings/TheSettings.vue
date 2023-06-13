<template>
  <div class="settings">
    <div class="profile">
      <BackgroundOverlay v-if="currentState !== states.default ">
        <TheLoading v-if="currentState === states.pending" />
        <ModalPopup
          v-else-if="currentState === states.delete"
          text="Вы действительно хотите безвозвратно удалить аккаунт!?"
          @confirm="onConfirmDelete"
          @reject="currentState = states.default"
        />
        <ModalPopup
          v-else-if="currentState === states.logout"
          text="Вы действительно хотите выйти!?"
          @confirm="onConfirmLogout"
          @reject="currentState = states.default"
        />
      </BackgroundOverlay>
      <div class="profile__cropper app-card">
        <CropperCarousel ref="cropperCarouselElement" :maxlength="1" :multiple-ratio="false" :save-original="false" />
      </div>
      <div class="profile__info app-card">
        <InputItem
          v-model="userData.username"
          :error="!v$.username.$error ? '' : v$.username.$errors[0]?.$message ?? ''"
          :maxlength="25"
          class="username"
          label="Имя пользователя"
          name="username"
          placeholder="Пидумайте имя пользователя."
        />
        <InputItem
          v-model="userData.name"
          :error="!v$.name.$error ? '' : v$.name.$errors[0]?.$message ?? ''"
          :maxlength="50"
          class="name"
          label="Ваше имя"
          name="name"
          placeholder="Как вас зовут?"
        />
        <div class="profile__description">
          <InputItem
            v-model="userData.bio"
            :maxlength="200"
            class="bio"
            label="О себе"
            name="bio"
            placeholder="Расскажите что-нибудь о себе."
            textarea
          />
        </div>
        <AppButton
          :disabled="v$.name.$error || v$.username.$error"
          class="save-button"
          text="Сохранить изменения"
          @click="onSaveChanges"
        />
      </div>
    </div>
    <TextIconButton :src="logoutIcon" class="logout-button app-card" text="Выйти" @click="onLogout" />
    <TextIconButton :src="destroyIcon" class="delete-button" text="Удалить аккаунт" @click="onDelete" />
  </div>
</template>

<script setup>
import { computed, inject, reactive, ref } from "vue";
import CropperCarousel from "@/components/common/CropperCarousel.vue";
import { useUserInfoStore } from "@/stores/userinfo";
import { useRouter } from "vue-router";
import InputItem from "@/components/common/InputItem.vue";
import { helpers, maxLength, minLength, required } from "@vuelidate/validators";
import { useVuelidate } from "@vuelidate/core";
import {
  deleteUser,
  logOut,
  saveUserChanges,
  usernameAvailable
} from "@/services/api";
import AppButton from "@/components/buttons/AppButton.vue";
import TextIconButton from "@/components/buttons/IconTextButton.vue";
import logoutIcon from "@/assets/icons/logout.svg";
import destroyIcon from "@/assets/icons/destroy.svg";
import BackgroundOverlay from "@/components/common/BackgroundOverlay.vue";
import TheLoading from "@/components/common/TheLoading.vue";
import ModalPopup from "@/components/common/ModalPopup.vue";
import { isUserNameValid } from "@/services/validators";

const cropperCarouselElement = ref(null);

const states = Object.freeze({
  delete: 0,
  logout: 1,
  pending: 2,
  default: 3
});
const currentState = ref(states.default);

const userinfo = useUserInfoStore();
const router = useRouter();
const showNotification = inject("showNotification");

const me = await userinfo.get(true);


const userData = reactive({
  bio: me.bio ?? "",
  name: me.name ?? "",
  username: me.username
});

userData.name = me.name;


const rules = computed(() => ({
    name: {
      minLength: helpers.withMessage("Минимум 2 символа!", minLength(2)),
      maxLength: helpers.withMessage("Максимум 50 символов!", maxLength(50)),
      $autoDirty: true,
      $lazy: true
    },
    username: {
      required: helpers.withMessage("Имя пользователя обязтельно!", required),
      minLength: helpers.withMessage("Минимум 3 символа!", minLength(3)),
      maxLength: helpers.withMessage("Максимум 25 символов!", maxLength(25)),
      correct: helpers.withMessage("Недопустимые символы!", isUserNameValid),
      available: helpers.withMessage("Имя пользователя занято!", helpers.withAsync(isUsernameAvailable)),
      $autoDirty: true,
      $lazy: true
    }
  }))
;

const v$ = useVuelidate(rules, userData);


async function isUsernameAvailable(username) {
  if (username === me.username) return true;
  let response = await usernameAvailable(username);
  if (response.ok) {
    let result = await response.json();
    return result["available"];
  }
  return false;
}


async function onConfirmLogout() {
  await logOut();
}

function onLogout() {
  currentState.value = states.logout;
}

function onDelete() {
  currentState.value = states.delete;
}

async function onConfirmDelete() {
  await deleteUser(me.id);
}


async function onSaveChanges() {
  // if (v$.name.$error || v$.username.$error) {
  //   return;
  // }

  currentState.value = states.pending;


  let formData = new FormData();

  formData.append("name", userData.name ?? "");
  formData.append("username", userData.username);
  formData.append("bio", userData.bio ?? "");
  formData.append("updateAvatar", true);

  for (let area of cropperCarouselElement.value.getAreas()) {
    formData.append("area", JSON.stringify(area));
  }

  for (let file of cropperCarouselElement.value.getFiles()) {
    formData.append("file", file, file.name);
  }

  await new Promise(r => setTimeout(r, 2000));

  try {
    let response = await saveUserChanges(formData);
    if (response.ok) {
      showNotification((await response.json()).detail);
      await router.push({ path: me.username });
    } else {
      showNotification((await response.json()).detail);
    }
  } catch (e) {
    showNotification(e);
  }
  await userinfo.get(true);
  currentState.value = states.default;
}

scroll(0, 0);
</script>

<style lang="scss" scoped>
$gap: 0.5rem;
$padding: 2.5rem;
.loading {
  top: 15rem;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}


.settings {
  width: 100%;
  display: grid;
  justify-items: center;
  grid-gap: 1rem;

  .profile {
    margin-top: 2rem;
    justify-content: center;
    display: grid;
    grid-gap: $gap;
    overflow: clip;
    opacity: 1;

    margin-bottom: 1.5rem;

    @media only screen and (min-width: 980px) {
      grid-template-columns: 400px 20rem;
      grid-template-rows: 400px;
    };

    @media only screen and (max-width: 980px) {
      grid-template-columns:  350px  20rem;
      grid-template-rows:  350px;
    };

    @media only screen and ((max-width: 980px) and ((hover: none) and (pointer: coarse))) {
      grid-template-columns: min(300px, 80vw);
      grid-template-rows: min(300px, 80vw) auto;
    };

    @media only screen and (max-width: 740px) {
      grid-template-columns: min(300px, 90vw);
      grid-template-rows: min(300px, 90vw) auto;
    };


    &__cropper {
      user-select: none;
    }


    &__info {
      display: grid;
      padding: 2rem 0.5rem 0.5rem 0.5rem;
      grid-template-columns: 100%;


      .username, .name {
        height: 2rem;
        margin-bottom: 2.75rem;
      }

      .bio {
        height: 6rem;
        margin-bottom: 1.5rem;
      }

      .save-button {
        height: 2.25rem;
      }
    }
  }

  .logout-button {
    transition: all ease-in-out 0.15s;
    opacity: 0.85;
    padding: 0.25rem 1.5rem .25rem 1rem;

    &:hover {
      opacity: 1;
    }

  }

  .delete-button {
    transition: all ease-in-out 0.15s;
    opacity: 0.75;

    &:hover {
      opacity: 0.55;
    }

  }
}

</style>


