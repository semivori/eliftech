import Vue from "vue";
import VueRouter from "vue-router";
import Index from "../views/bank/Index";
import Calculator from "../views/Calculator";

Vue.use(VueRouter);

const routes = [
    {
        path: "/",
        component: Index,
    },
    {
        path: "/calculator",
        component: Calculator,
    }
];

const router = new VueRouter({
    mode: "history",
    base: process.env.BASE_URL,
    routes,
});

export default router;
