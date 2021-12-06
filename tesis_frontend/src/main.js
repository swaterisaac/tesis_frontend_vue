import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

import firebaseConfig from './firestoreKey';

Vue.config.productionTip = false
initializeApp(firebaseConfig);

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
