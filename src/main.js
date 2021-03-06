// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import axios from 'axios';
import vueAxios from 'vue-axios';
import App from './App';
import router from './router';
// Import components
import Loading from './components/Loading';

Vue.config.productionTip = false;
Vue.use(vueAxios, axios);

// Setup components here
Vue.component('loading', Loading);

/* eslint-disable no-new */
new Vue({
	el: '#app',
	router,
	template: '<App/>',
	components: { App },
});
