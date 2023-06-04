<template>
  <div :class="{'login--visible': true}" class="login">
    <img :src="pillowIcon" alt="pillow" class="login__logo" height="96">
    <Transition
      enter-active-class="animate__animated animate__fadeInRight"
      leave-active-class="animate__animated animate__fadeOutLeft"
      mode="out-in"
    >
      <div v-if="currentState === states.signIn" class="login__form">
        <span class="login__title">Войдите в сервис!</span>
        <form
          v-if="currentState === states.signIn"
          class="login__sign-in login__card"
          name="sign-in"
          @submit.prevent="onSignInClick"
        >
          <InputItem
            v-model.lazy="v$.email.$model"
            :error="!v$.email.$error ? '' : v$.email.$errors[0]?.$message ?? ''"
            :maxlength="75"
            autofocus
            class="login__input"
            label="Введите ваш email."
            name="email"
            placeholder="username@example.com"
          />
          <BaseButton
            :disabled="!userData.email || v$.email.$error"
            class="login__button login__login-button"
            text="Войти"
            @click="onSignInClick"
          />
          <TelegramLogin class="login__telegram" telegram-login="ImageSharingServiceBot" @login="onTelegramLogin" />
        </form>
      </div>
      <div v-else-if="currentState === states.confirmCode" class="login__form">
        <span class="login__title">Подтверждение почты.</span>
        <form
          class="login__code login__card"
          name="code"
          @input.prevent="onCodeInput"
        >
          <InputItem
            v-model="v$.code.$model"
            :error="!v$.code.$error ? '' : v$.code.$errors[0]?.$message ?? ''"
            :maxlength="4"
            align="center"
            autocomplete="off"
            class="login__input"
            label="Код из письма."
            name="code"
            placeholder="0000"
          />
          <BaseButton
            class="login__button login__confirm-button"
            text="Назад"
            @click="onBackClick"
          />
          <Transition
            appear
            enter-active-class="animate__animated animate__fadeIn"
            leave-active-class="animate__animated animate__fadeOut"
            mode="out-in"
          >
            <span
              v-if="countDown > 0"
              class="login__countdown"
            >
              Отправить код повторно через {{ countDown }} сек.
            </span>
            <span
              v-else
              class="login__countdown login__repeat-code"
              @click="onSignInClick"
            >
              Отправить код повторно.
            </span>
          </Transition>
        </form>
      </div>
      <div v-else-if="currentState === states.signUp" class="login__form">
        <span class="login__title">Создание аккаунта.</span>
        <form
          class="sign-up login__card"
          name="sign-up"
          @submit.prevent="onSignUpClick"
        >
          <InputItem
            v-model="v$.username.$model"
            :error="!v$.username.$error ? '' : v$.username.$errors[0]?.$message ?? ''"
            :maxlength="25"
            class="login__input"
            label="Придумайте имя пользователя."
            name="username"
            placeholder="username"
          />
          <InputItem
            v-model="v$.name.$model"
            :maxlength="50"
            class="login__input"
            label="Введите ваше имя."
            name="name"
            placeholder="Алексей Миронов"
          />
          <BaseButton
            :disabled="!userData.username"
            class="login__button login__save-button"
            text="Подтвердить"
            @click="onSignUpClick"
          />
        </form>
      </div>
      <div v-else-if="currentState === states.loginComplete" class="login__form">
        <h1 class="login__title login__welcome">Добро пожаловать!</h1>
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { computed, onMounted, reactive, ref } from "vue";
import { useVuelidate } from "@vuelidate/core";
import {
  required,
  email,
  helpers,
  between,
  numeric,
  minLength,
  maxLength,
  alpha
} from "@vuelidate/validators";
import pillowIcon from "@/assets/icons/pillow.svg";
import BaseButton from "@/components/buttons/AppButton.vue";
import InputItem from "@/components/common/InputItem.vue";
import { useRouter } from "vue-router";
import TelegramLogin from "@/components/login/TelegramLogin.vue";
import { confirmCode, signIn, signInViaTelegram, signUp, usernameAvailable } from "@/services/api";
import { useTimer } from "@/services/timer";
import { useUserInfoStore } from "@/stores/userinfo";

const router = useRouter();
const timer = useTimer();
const countDown = ref(30);
const timeout = 45;

const isReady = ref(false);

const states = Object.freeze({
  signIn: 0,
  signUp: 1,
  confirmCode: 2,
  loginComplete: 3
});
const currentState = ref(states.signIn);
const userinfo = useUserInfoStore();

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
      minLength: helpers.withMessage("Некорректный код!", minLength(4)),
      maxLength: helpers.withMessage("Некорректный код!", maxLength(4)),
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
      alphaNum: helpers.withMessage("Только буквы и цифры!", alpha),
      available: helpers.withMessage("Имя пользователя занято!", helpers.withAsync(isUsernameAvailable)),
      $autoDirty: true,
      $lazy: true
    }
  }))
;

const v$ = useVuelidate(rules, userData);

async function isUsernameAvailable(username) {
  let response = await usernameAvailable(username);
  if (response.ok) {
    let result = await response.json();
    return result["available"];
  }
  return false;
}

async function onTelegramLogin(data) {
  let response = await signInViaTelegram(data);
  if (response.ok) {
    let result = await response.json();
    if (result["userExists"]) {
      currentState.value = states.loginComplete;
      await userinfo.get();
      await new Promise(r => setTimeout(r, 2000));
      await router.push({ path: "/explore" });
    } else {
      currentState.value = states.signUp;
      userData.username = data["username"] ?? "";
      userData.name = [data["first_name"], data["last_name"] ?? ""].join(" ").trim();
    }
  }
}


async function onSignInClick() {
  if (v$.value.email.$invalid) {
    return;
  }
  let response = await signIn(userData.email);
  if (response.ok) {
    currentState.value = states.confirmCode;
    countDown.value = timeout;
    timer(countDown);
  } else {
    alert("Ошибка HTTP: " + JSON.stringify(await response.json()));
  }
}

function onBackClick() {
  currentState.value = states.signIn;
}

async function onCodeInput() {
  if (v$.value.code.$invalid) {
    return;
  }
  let response = await confirmCode(userData.email, userData.code);
  if (response.ok) {
    let result = await response.json();
    if (result["userExists"]) {
      currentState.value = states.loginComplete;
      await userinfo.get();
      await new Promise(r => setTimeout(r, 2000));
      await router.push({ path: "/explore" });
    } else {
      currentState.value = states.signUp;
    }
  } else {
    // alert("Ошибка HTTP: " + JSON.stringify(await response.json()));
  }
}

async function onSignUpClick() {
  if (v$.value.username.$invalid) {
    return;
  }

  let response = await signUp(userData.username, userData.name);
  if (response.ok) {
    currentState.value = states.loginComplete;
    await userinfo.get();
    await new Promise(r => setTimeout(r, 2000));
    await router.push({ path: "/explore" });
  } else {
    alert("Ошибка HTTP: " + JSON.stringify(await response.json()));
  }

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

  &__countdown {
    font-size: 10.5pt;
    color: grey;
    margin-top: 0.75rem;
    user-select: none;
  }

  &__telegram {
    margin-top: 1rem;
    //margin-bottom: 1rem;
  }

  &__repeat-code {
    text-decoration: underline;
    text-underline-offset: 2pt;
    cursor: pointer;
    transition: color ease-in-out 100ms;

    &:hover {
      color: darkgray;
    }

    &:active {
      color: whitesmoke;
    }
  }

  &__form {
    width: 100%;
    text-align: center;
    display: grid;
    grid-template-columns: 100%;
    grid-gap: 1rem;
  }

  &__button {
    font-size: 12pt;
  }

  &__input {
    margin-bottom: 1.75rem;
    margin-top: 1.75rem;
    height: 2rem;
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
    padding: 1.25rem 1.5rem 1.25rem 1.5rem;
    transition: all ease-in-out 0.5s;
  }
}
</style>