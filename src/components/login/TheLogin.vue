<template>
  <div :class="{'login--visible': true}" class="login">
    <img :src="pillowIcon" alt="pillow" class="login__logo" height="96">
    <Transition
      enter-active-class="animate__animated animate__zoomIn"
      leave-active-class="animate__animated animate__zoomOut"
      mode="out-in"
    >
      <span v-if="!isSignUp && !isCode &&!isSuccess" class="login__title">Войдите в сервис!</span>
      <span v-else-if="isCode &&!isSuccess" class="login__title">Подтверждение почты.</span>
      <span v-else-if="!isSuccess" class="login__title">Создание аккаунта.</span>
      <h1 v-else class="login__title login__welcome">Добро пожаловать!</h1>
    </Transition>
    <Transition
      enter-active-class="animate__animated animate__slideInRight"
      leave-active-class="animate__animated animate__slideOutLeft"
      mode="out-in"
    >
      <form
        v-if="!isSignUp && !isCode &&!isSuccess"
        class="login__sign-in login__card"
        name="sign-in"
        @submit.prevent="onSignInClick"
      >
        <InputItem
          v-model.lazy="v$.email.$model"
          :error="!v$.email.$error ? '' : v$.email.$errors[0]?.$message ?? ''"
          :maxlength="75"
          autofocus
          class="sign-in__email"
          label="Введите ваш email."
          name="email"
          placeholder="username@example.com"
          type="email"
        />
        <BaseButton
          :disabled="!userData.email || v$.email.$error"
          class="login__button login__login-button"
          text="Войти"
          @click="onSignInClick"
        />
        <TelegramLogin class="sign-in__telegram" telegram-login="ImageSharingServiceBot" />
      </form>
      <form
        v-else-if="isCode &&!isSuccess"
        class="login__code login__card"
        name="code"
        @submit.prevent="onConfirmCodeClick"
      >
        <InputItem
          v-model="v$.code.$model"
          :error="!v$.code.$error ? '' : v$.code.$errors[0]?.$message ?? ''"
          :maxlength="4"
          align="center"
          autocomplete="off"
          class="sign-in__code"
          label="Код из письма."
          name="code"
          placeholder="0000"

        />
        <BaseButton
          :disabled="!userData.code"
          class="login__button login__confirm-button"
          text="Подтвердить"
          @click="onConfirmCodeClick"
        />
      </form>
      <form
        v-else-if="!isSuccess"
        class="sign-up login__card"
        name="sign-up"
        @submit.prevent="onSignUpClick"
      >
        <InputItem
          v-model="v$.username.$model"
          :error="!v$.username.$error ? '' : v$.username.$errors[0]?.$message ?? ''"
          :maxlength="25"
          class="sign-up__username"
          label="Придумайте имя пользователя."
          name="username"
          placeholder="username"
          type="text"
        />
        <InputItem
          v-model="v$.name.$model"
          :maxlength="50"
          class="sign-up__name"
          label="Введите ваше имя."
          name="name"
          placeholder="Алексей Миронов"
          type="text"
        />
        <BaseButton
          :disabled="!userData.username || !userData.name"
          class="login__button login__save-button"
          text="Подтвердить"
          @click="onSignUpClick"
        />
      </form>
    </Transition>
  </div>
</template>

<script setup>
import { computed, onMounted, reactive, ref } from "vue";
import { useVuelidate } from "@vuelidate/core";
import { required, email, helpers, between, numeric, minLength, maxLength } from "@vuelidate/validators";
import pillowIcon from "@/assets/icons/pillow.svg";
import BaseButton from "@/components/buttons/AppButton.vue";
import InputItem from "@/components/common/InputItem.vue";
import { useRouter } from "vue-router";
import TelegramLogin from "@/components/login/TelegramLogin.vue";

const isReady = ref(false);
const isSignUp = ref(false);
const isCode = ref(false);
const isSuccess = ref(false);
const isModalOpen = ref(false);

const router = useRouter();

const userData = reactive({
  email: "",
  code: "",
  name: "",
  username: ""
});


const rules = computed(() => ({
    email: {
      required: helpers.withMessage("Это обязательное поле!", required),
      email: helpers.withMessage("Некорректный адрес электронной почты!", email),
      $lazy: true
    },
    code: {
      required: helpers.withMessage("Это обязательное поле!", required),
      between: helpers.withMessage("Некорректный код!", between(0, 9999)),
      numeric: helpers.withMessage("Только цифры!", numeric),
      $lazy: true
    },
    name: {
      minLength: helpers.withMessage("Минимум 2 символа!", minLength(2)),
      maxLength: helpers.withMessage("Максимум 50 символов!", maxLength(50)),
      $lazy: true
    },
    username: {
      required: helpers.withMessage("Это обязательное поле!", required),
      minLength: helpers.withMessage("Минимум 3 символа!", minLength(3)),
      maxLength: helpers.withMessage("Максимум 25 символов!", maxLength(25)),
      // available: helpers.withMessage("Имя пользователя занято!", helpers.withAsync(isUsernameAvailable)),
      $autoDirty: true,
      $lazy: true
    }
  }))
;

const v$ = useVuelidate(rules, userData);

// async function isUsernameAvailable(username) {
//   let response = await usernameAvailable(username);
//   return response.ok;
// }

async function onSignInClick() {

  if (v$.value.email.$invalid) {
    return;
  }
  isCode.value = true;
  // let response = await signIn(userData.email);
  // if (response.ok) { // если HTTP-статус в диапазоне 200-299
  //   isCode.value = true;
  // } else {
  //   alert("Ошибка HTTP: " + response.status);
  // }
}

async function onConfirmCodeClick() {
  isCode.value = false;
  isSignUp.value = true;
  // if (v$.value.code.$invalid) {
  //   return;
  // }
  // let response = await confirmCode(userData.email, userData.code);
  // if (!response.ok) {
  //   alert("Ошибка HTTP: " + response.status);
  //   return;
  // }
  // if (response.status === 201) {
  //   isCode.value = false;
  //   isSignUp.value = true;
  // } else if (response.status === 200) {
  //   isSuccess.value = true;
  //   await new Promise(r => setTimeout(r, 2000));
  //   await router.push({ path: "/posts" });
  // }
}

async function onSignUpClick() {
  isCode.value = false;
  isSignUp.value = false;
  isSuccess.value = true;
  await new Promise(r => setTimeout(r, 2000));
  await router.push({ path: "/explore" });


  // if (v$.value.name.$invalid || v$.value.username.$invalid) {
  //   return;
  // }
  //
  // let response = await signUp(userData.username, userData.name);
  //
  // if (response.ok) { // если HTTP-статус в диапазоне 200-299
  //   await new Promise(r => setTimeout(r, 2000));
  //   isSuccess.value = true;
  // } else {
  //   isCode.value = false;
  //   isSignUp.value = false;
  //   alert("Ошибка HTTP: " + response.status);
  // }

}

onMounted(async () => {
  await new Promise(r => {
    setTimeout(r, 350);
  });
  isReady.value = true;
});
</script>


<style lang="scss" scoped>
.login {
  width: 100%;
  margin-top: 7rem;
  display: grid;
  grid-template-columns: min(20rem, 100%);
  justify-content: center;
  justify-items: center;
  grid-gap: 1rem;
  opacity: 0;
  transition: opacity ease-in-out 0.5s;

  &--visible {
    opacity: 1
  }

  &__title {
    font-weight: lighter;
    font-size: 17pt;
    text-align: center;
    vertical-align: middle;
  }

  &__welcome {
    font-weight: lighter;
    font-size: 22pt;
    text-align: center;
    vertical-align: middle;
  }

  &__logo {

  }

  &__button {
    margin-top: 1.5rem;
    font-size: 12pt;
  }

  &__card {
    width: 100%;
    display: grid;
    grid-template-columns: 100%;
    align-items: center;
    justify-content: center;
    background-color: var(--app-default-color);
    border-radius: var(--app-border-radius);
    box-shadow: var(--app-default-shadow);
    border: var(--app-default-border);
    padding: 2.5rem 1.5rem 1.5rem 1.5rem;
    transition: all ease-in-out 0.5s;
  }

  .sign-up {

    &__name {
      margin-top: 2.5rem;
    }
  }

  .sign-in {
    &__telegram {
      margin-top: 1rem;
    }
  }

}


//.background {
//  position: fixed;
//
//  z-index: -1;
//  --size: 350px;
//  --speed: 50s;
//  --easing: cubic-bezier(0.9, 0.1, 0.1, 0.9);
//
//  left: calc(50% - var(--size) / 2);
//  top: calc(var(--size) / 2);
//  width: var(--size);
//  height: var(--size);
//  filter: blur(calc(var(--size) / 5));
//  background-image: linear-gradient(hsl(158, 82%, 57%, 85%), hsl(252, 82%, 57%));
//  animation: rotate var(--speed) var(--easing) alternate infinite;
//  border-radius: 30% 70% 70% 30% / 30% 30% 70% 70%;
//}
//
//@keyframes rotate {
//  0% {
//    transform: rotate(0deg);
//  }
//  100% {
//    transform: rotate(360deg);
//  }
//}


.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.form-v-enter-from {
  opacity: 0;
}

.v-leave-to {
  opacity: 0;
}
</style>