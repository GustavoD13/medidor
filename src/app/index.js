import Vue from 'vue';
import App from './components/App.vue';
import VueRouter from 'vue-router';
import Cliente from './components/Cliente.vue';
import Home from './components/Home.vue';
import Reporte from './components/Reporte.vue';
import Procesador from './components/Procesador.vue';
import BootstrapVue from 'bootstrap-vue';

Vue.use(VueRouter);
Vue.use(BootstrapVue);


import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';



const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        { name: 'Home', path: '/', component: Home },
        { name: 'Reporte', path: '/Reporte', component: Reporte },
        { name: 'Cliente', path: '/cliente', component: Cliente },
        { name: 'Procesador', path: '/Procesador', component: Procesador }

    ]


})
new Vue({
    router,
    render: h => h(App)
}).$mount('#app');