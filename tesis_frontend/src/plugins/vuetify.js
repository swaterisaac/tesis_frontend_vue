import Vue from 'vue';
import Vuetify from 'vuetify';
import 'vuetify/dist/vuetify.min.css';

Vue.use(Vuetify);

export default new Vuetify({
    theme: {
        themes: {
          light: {
            primario: '#386641',
            secundario: '#6a994e',
            terciario: '#a7c957',
            rojizo: '#bc4749',
            fondo: '#f2e8cf',
          },
        },
      },
});
