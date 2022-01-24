<template>
  <v-flex>
    <p class="text-center display-1 font-weight-black" tabindex="0">
      ¡Inicia sesión o crea una cuenta para obtener ofertas turísticas aptas
      para ti!
    </p>
    <v-row justify="center" class="py-4">
      <v-btn @click="login" height="80" >
        <v-icon color="red" left class="px-4">mdi-google</v-icon>
        Inicia sesión/Registrate con Google
      </v-btn>
    </v-row>
    <br><br>
    <v-row class="py-6" justify="center">
      <v-col
        class="d-flex justify-center"
        cols="3"
        v-for="(mensaje, index) in mensajes"
        :key="index"
      >
        <v-card height="200" width="200" :color="mensaje.color" shaped>
          <v-card-title class="d-flex justify-center">
            <v-icon x-large :color="mensaje.color_icono">{{ mensaje.icono }}</v-icon>
          </v-card-title>
          <v-card-text class="black--text">
            <p :class="'body-1 text-center ' + mensaje.letras">{{ mensaje.msg }}</p>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <br><br><br>
    <p class="display-1 text-center">Las ofertas turísticas están a través de todas las regiones de Chile</p>
    <v-row justify="center" class="pb-4">
        
      <v-card
        width="1200"
        max-width="1200"
        class="d-flex justify-center text-center"
      >
      
        <v-carousel hide-delimiters cycle max="100">
          <v-carousel-item
            v-for="(region, i) in regiones"
            :key="i"
            :src="region.url_imagen"
            :aria-label="region.nombre"
            :alt="region.nombre"
          >
            <v-row class="fill-height" align="end" justify="center">
              <v-card color="rgb(255, 255, 255, 0.6)">
                <div class="display-2">{{ region.nombre }}</div>
              </v-card>
            </v-row>
          </v-carousel-item>
        </v-carousel>
      </v-card>
    </v-row>
  </v-flex>
</template>

<script>
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import usuarioServicio from "../service/usuarioServicio";
import ubicacionServicio from "../service/ubicacionServicio";

const provider = new GoogleAuthProvider();
const auth = getAuth();

export default {
  name: "Login",
  data() {
    return {
      regiones: [],
      mensajes: [
        {
          msg: "¡Conoce ofertas turísticas a lo largo de todo Chile!",
          icono: "mdi-rabbit",
          color: "terciario",
          letras: "black--text",
          color_icono: "#000",
        },
        {
          msg: "Te recomendamos ofertas según tu perfil turístico",
          icono: "mdi-cog",
          color: "secundario",
          letras: "white--text",
          color_icono: "#fff",
        },
        {
          msg: "¡Contacta a los proveedores de las ofertas turísticas para obtener más información!",
          icono: "mdi-account-box",
          color: "secundario_claro",
          letras: "black--text",
          color_icono: "#000",
        },
      ],
    };
  },
  async created() {
    let resp = await ubicacionServicio.obtenerRegiones();
    this.regiones = resp.data;
  },
  methods: {
    login() {
      signInWithPopup(auth, provider)
        .then(async (result) => {
          const user = result.user;
          const res = await usuarioServicio.obtenerUsuarioPorCorreo(user.email);
          const status = res.status;
          if (status === 204) {
            window.location.href = "/registro";
          } else if (status === 200) {
            window.location.href = "/";
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>
