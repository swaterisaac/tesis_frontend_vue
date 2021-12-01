<template>
  <v-flex>
    <div class="text-center display-2">Recomendaciones para ti</div>
    <v-row>
      <v-col cols="4">
        <oferta></oferta>
      </v-col>
      <v-col cols="4">
        <oferta></oferta>
      </v-col>
      
    </v-row>
  </v-flex>
</template>

<script>
  import Oferta from '../components/Oferta'
  export default {
    name: 'Home',

    components: {
        Oferta,
    },
  }
</script>
