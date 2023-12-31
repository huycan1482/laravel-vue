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

import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';

const app = createApp(App)
app.component("font-awesome-icon", FontAwesomeIcon)
app.use(router)
app.use(VueSweetalert2)
app.use(ElementPlus)
// app.use(BootstrapVue)
// app.use(IconsPlugin)
app.use(store)
// app.use(VueToastify)
app.mount('#app')