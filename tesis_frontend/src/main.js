import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
import { getAuth } from 'firebase/auth';

import { initializeApp } from 'firebase/app';
import firebaseConfig from './firestoreKey';
initializeApp(firebaseConfig);

Vue.config.productionTip = false


const auth = getAuth();
let app;

auth.onAuthStateChanged(user => {
  console.log(user);
  if(!app){
    app = new Vue({
      router,
      vuetify,
      render: h => h(App)
    }).$mount('#app')
  }
});

// new Vue({
//   router,
//   vuetify,
//   render: h => h(App)
// }).$mount('#app')
