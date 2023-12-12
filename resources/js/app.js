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
    // auth: {
    //     headers: {
    //         Authorization: 'Bearer ' + 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC9sYXJhdmVsLXZ1ZS5jb21cL2FwaVwvYXV0aFwvbG9naW4iLCJpYXQiOjE3MDIyODA5OTIsImV4cCI6MTcwMjM2NzM5MiwibmJmIjoxNzAyMjgwOTkyLCJqdGkiOiIweFd6VzBDMElKMHc3eEVJIiwic3ViIjoxLCJwcnYiOiIyM2JkNWM4OTQ5ZjYwMGFkYjM5ZTcwMWM0MDA4NzJkYjdhNTk3NmY3In0.R17HBlsIbygfE20XStX7SePt5el7CsQxCJOm51rTVQI'
    //     },
    // },
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