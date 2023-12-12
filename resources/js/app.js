require('./bootstrap');
import { createApp, Vue } from "vue";
import router from "./router"; 
import App from "./App.vue";

import store from './store'

import { library, dom } from "@fortawesome/fontawesome-svg-core";
import { fas } from '@fortawesome/free-solid-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';

library.add(fas, fab, far);
dom.watch();
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

// import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
// import 'bootstrap/dist/css/bootstrap.css'
// import 'bootstrap-vue/dist/bootstrap-vue.css'

// import VueToastify from 'vue3-toastify';
// import 'vue3-toastify/dist/index.css';

import Echo from 'laravel-echo';
import Pusher from 'pusher-js';

window.Pusher = Pusher;

window.Echo = new Echo({
    broadcaster: 'pusher',
    key: process.env.MIX_PUSHER_APP_KEY,
    cluster: process.env.MIX_PUSHER_APP_CLUSTER,
    encrypted: true,
    appId: '1708835',
    // disableStats: true,
    // auth:{
    //     headers:{
    //      'Accept':'application/json',
    //      'Content-Type':'application/json',
    //      }
    //     },
    //    authEndpoint: 'http://laravel-vue.com/broadcasting/auth'
});

const app = createApp(App)
app.component("font-awesome-icon", FontAwesomeIcon)
app.use(router)
app.use(VueSweetalert2)
// app.use(BootstrapVue)
// app.use(IconsPlugin)
app.use(store)
// app.use(VueToastify)
app.mount('#app')