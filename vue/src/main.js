import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from './store'
import { ValidationProvider, ValidationObserver } from 'vee-validate/dist/vee-validate.full.esm';
import { setInteractionMode } from 'vee-validate';

Vue.component('ValidationProvider', ValidationProvider);
Vue.component('ValidationObserver', ValidationObserver);
setInteractionMode('eager');

Vue.config.productionTip = false;

new Vue({
    router,
    store,
    render: (h) => h(App)
}).$mount("#app");
