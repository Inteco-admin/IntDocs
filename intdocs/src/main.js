import './index.css';
import { createApp } from "vue";
import VueEasyLightbox from 'vue-easy-lightbox';
import { createPinia } from "pinia";
import App from "./App.vue";
import VueCookies from 'vue-cookies'


import router from './router';

import mitt from "mitt"

import { Quasar,Notify,Dialog } from 'quasar'

// Import icon libraries
import '@quasar/extras/material-icons/material-icons.css'

// Import Quasar css
import 'quasar/src/css/index.sass'

const emitter = mitt();
window.emitter = emitter;
const pinia = createPinia();
const app = createApp(App);

app.config.globalProperties.emitter = emitter;
app.provide('emitter', emitter);

// Plugins
app.use(pinia)
app.use(VueCookies, { expire: '7d' })
app.use(VueEasyLightbox)
app.use(router);


app.use(Quasar, {
  plugins: { Notify,Dialog },
});




app.mount("#app");
