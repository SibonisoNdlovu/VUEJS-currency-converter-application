import { createWebHistory, createRouter } from "vue-router";
import { RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/converter",
    name: "converter",
    component: () => import("./components/ConvertCurrencies.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
