import Vue from "vue";
import router from "./router";
import "babel-polyfill";
import App from "./App.vue";
import Vuetify from "vuetify";
import "vuetify/dist/vuetify.min.css";

Vue.use(Vuetify);

import { store } from "./store/store";

new Vue({
  el: "#app",
  store,
  router,
  render: h => h(App)
});
