import { createApp } from 'vue'
import './style/index.css'
import App from './App.vue'

import { OhVueIcon, addIcons } from "oh-vue-icons";
import { 
    FaRegularCheckCircle, 
    FaRegularCircle,
    IoAddOutline,
    OiTrash,
} from "oh-vue-icons/icons";

addIcons( 
    FaRegularCheckCircle, 
    FaRegularCircle,
    IoAddOutline,
    OiTrash,
);

const app = createApp(App);
app.component("v-icon", OhVueIcon);
app.mount("#app");
