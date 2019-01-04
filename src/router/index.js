import Vue from "vue";
import Router from "vue-router";
import Index from "../components/maincomponents/index.vue";
import Configure from "../components/main.vue";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/index",
      name: "Index",
      component: Index
    },
    {
      path: "/configure",
      name: "Configure",
      component: Configure
    }
  ]
});
