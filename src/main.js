import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";

import "@/assets/main.css";
import "@/assets/cropper.css";
import "@/assets/swiper.css";


const app = createApp(App);

app.use(createPinia());
app.use(router);

// app.directive('focus', {
//   // When the bound element is mounted into the DOM...
//   mounted(el) {
//     // Focus the element
//     el.focus()
//   }
// })

app.mount("#app");
