<template>
  <v-app>
    <navbar></navbar>
    <v-main :style="{background: $vuetify.theme.themes[theme].fondo}">
      <v-container fluid>
        <router-view/>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import Navbar from './components/Navbar.vue';
export default {
  components: { Navbar },
  
  name: 'App',

  data: () => ({
    theme: 'light',
  }),
  methods:{
    goHome: function(){
      this.$router.push('/');
    },
    goTest: function() {
      this.$router.push('/test');
    },
    goProfile: function() {
      this.$router.push('/profile');
    }
  }
};
</script>
