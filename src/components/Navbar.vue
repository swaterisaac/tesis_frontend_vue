<template>
  <v-app-bar app color="primario">
    <v-btn
      class="text-left"
      @click="goHome"
      text
      color="#fff"
      aria-label="Presiona aquí para ir a las recomendaciones"
      v-if="login"
    >
    <v-icon left>mdi-forest</v-icon>
      Ir a recomendaciones
    </v-btn>

    <v-spacer></v-spacer>
    <v-menu
      v-model="menuFiltro"
      :close-on-content-click="false"
      :nudge-width="250"
      offset-y
      v-if="login"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          text
          color="#fff"
          v-bind="attrs"
          v-on="on"
          aria-label="Filtros, active los filtros y luego navegue hasta el final"
        >
          <span class="mr-2">Filtros</span>
          <v-icon large right>mdi-filter-variant</v-icon>
        </v-btn>
      </template>

      <v-card>
        <v-card-title>Filtros</v-card-title>
        <v-flex class="px-4">
          <v-autocomplete
            rounded
            filled
            color="#000"
            background-color="#fff"
            :items="regiones"
            item-text="nombre"
            prepend-icon="mdi-map-marker"
            return-object
            v-model="filtroRegion"
            @change="traerComunas()"
            label="Región"
            aria-label="Estás en filtros, ingresa una región"
          ></v-autocomplete>
          <v-autocomplete
            rounded
            filled
            color="#000"
            background-color="#fff"
            :loading="cargarComunas"
            :disabled="deshabilitarComunas"
            :items="comunas"
            item-text="nombre"
            prepend-icon="mdi-map-marker"
            v-model="filtroComuna"
            :label="tituloComuna"
          ></v-autocomplete>
          <v-autocomplete
            rounded
            filled
            color="#000"
            background-color="#fff"
            :items="proveedores"
            item-text="nombre"
            prepend-icon="mdi-account-supervisor"
            v-model="filtroProveedor"
            label="Proveedor"
          ></v-autocomplete>
        </v-flex>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="secundario"
            text
            @click="ejecutarQuery"
            aria-label="Aplicar filtro"
          >
            Aplicar
          </v-btn>
          <v-btn text @click="menuFiltro = false" aria-label="Cerrar filtros">
            Cerrar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-menu>
    <v-responsive max-width="260">
      <v-text-field
        append-icon="mdi-magnify"
        placeholder="Busca ofertas turísticas"
        aria-label="Escribe aquí para buscar ofertas turísticas"
        background-color="#fff"
        class="pt-5"
        rounded
        v-model="query"
        v-if="login"
        @keydown.enter.prevent="ejecutarQuery"
      ></v-text-field>
    </v-responsive>
    <div class="px-2 pr-8" v-if="login">
      <v-btn
        rounded
        color="secundario"
        class="white--text"
        @click="ejecutarQuery"
        >Buscar</v-btn
      >
    </div>
    <!--Botón de ayuda-->
    <v-dialog
        v-model="dialogoAyuda"
        width="60%"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          text
          color="#fff"
          v-if="login || enRegistro"
          v-on="on"
          v-bind="attrs"
        >
          <v-icon large left>mdi-information</v-icon>
          <span class="mr-2">Ayuda</span>
        </v-btn>
      </template>
      <v-card>
        <v-card-title class="d-flex justify-center">
          <p class="display-1"
            >Ayuda sobre el recomendador de ofertas turísticas</p
          >
        </v-card-title>
        <v-card-text class="text-justify black--text">
        <p class="title text-center">Registro</p>
        <p class="body-1">La primera vez que entres a la aplicación, tendrás que colocar algunos datos para que sepamos más de ti. Estos datos se utilizarán
            para que puedas encontrar ofertas turísticas más relevantes. Una vez te registres, no será necesario volver a completar estos datos.
          </p>
          <p class="title text-center">Recomendaciones</p>
          <p class="body-1">Las recomendaciones de ofertas turísticas que te aparezcan son en base a tu historial en la plataforma y tus consideraciones médicas.
              Para ir a tus recomendaciones, en la parte superior izquierda de la pantalla aparece un botón que dice "IR A MIS RECOMENDACIONES". 
              Si necesitas buscar ofertas turísticas con alguna palabra clave, escríbelas en el buscador que está en la parte superior de la pantalla y 
              luego presiona el botón "BUSCAR". Si necesitas ofertas turísticas de cierta ubicación, puedes aplicar filtros. Estos aparecen en la parte superior de la pantalla
              con el botón "FILTROS", una vez lo presiones puedes seleccionar una región y una comuna si quieres especificar más. Una vez los selecciones debes presionar el botón
              "APLICAR" que aparece un poco más abajo o presionar el botón "BUSCAR".<br><br>
              También puedes ver el detalle de la oferta turística presionando el botón "VER DETALLE DE LA OFERTA". En el caso de que una oferta te 
              interese, debes contactar con el contacto del proveedor que aparece en el detalle de cada oferta.<br><br>
              Si quieres obtener más ofertas turísticas, basta con navegar hacia abajo de la página hasta que se acaben las recomendaciones.
          </p>
          <p class="title text-center">Editar y ver tu perfil</p>
            <p class="body-1">Para ver tu perfil, existe un botón en la parte superior derecha de la pantalla que dice "VER TU PERFIL". Presionando ese botón
                podrás ver todos los datos de tu perfil y editarlos. Estos datos son privados y solo tú podrás verlos.<br><br>
                Si quieres editar tu perfil, basta con modificar los datos que quieras cambiar y luego apretar el botón de "GUARDAR" para actualizar
                esos cambios nuevos.<br><br>
                Si quieres cerrar tu sesión de perfil y volver a la página de presentación que viste al principio, debes presionar el botón de "CERRAR SESIÓN".
                No te preocupes, todos los cambios quedan guardados, así que cuando te conectes otra vez estará todo como cuando te desconectaste.
            </p>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text @click="dialogoAyuda = false">
            ¡Entendido, navegaré por el recomendador!
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!--Botón perfil-->
    <v-btn text @click="goProfile" color="#fff" v-if="login">
      <v-icon large left>mdi-account</v-icon>
      <span class="mr-2">Ver tu perfil</span>
    </v-btn>
    <!--Botón cerrar sesión-->
    <v-btn text @click="cerrarSesion" color="#fff" v-if="login || enRegistro">
      <v-icon large left>mdi-logout</v-icon>
      <span class="mr-2">Cerrar sesión</span>
    </v-btn>
  </v-app-bar>
</template>

<script>
import { getAuth, signOut } from "firebase/auth";
import ubicacionServicio from "../service/ubicacionServicio";
import ofertaServicio from "../service/ofertaServicio";
export default {
  name: "Navbar",
  data() {
    return {
      login: false,
      query: this.$route.query.query,
      tituloComuna: "Comuna (Seleccione una región primero)",

      comunas: [],
      regiones: [],
      proveedores: [],
      filtroComuna: "",
      filtroRegion: "",
      filtroProveedor: "",

      cargarComunas: false,
      deshabilitarComunas: true,
      menuFiltro: false,
      dialogoAyuda: false,
    };
  },
  computed: {
    enRegistro() {
      return this.$route.name === "Registro";
    },
  },
  props: ["usuarioApp", "usuarioFirebase"],
  async mounted() {
    if (this.usuarioApp && this.usuarioFirebase) {
      this.login = true;
      //Traer regiones
      const respRegiones = await ubicacionServicio.obtenerRegiones();
      this.regiones = respRegiones.data;

      //Traer proveedores
      const respProveedores = await ofertaServicio.obtenerProveedores();
      this.proveedores = respProveedores.data;
    }
  },
  methods: {
    goHome: function () {
      window.location.href = "/";
    },
    goProfile: function () {
      this.$router.push("/perfil").catch(() => {});
    },
    cerrarSesion: function () {
      const auth = getAuth();
      signOut(auth)
        .then(() => {
          window.location.href = "/login";
        })
        .catch((error) => {
          console.log(error);
        });
    },
    ejecutarQuery: function () {
      this.$router
        .push({
          path: "/",
          query: {
            query: this.query,
            filtroComuna: this.filtroComuna,
            filtroRegion: this.filtroRegion.nombre,
            filtroProveedor: this.filtroProveedor,
          },
        })
        .catch(() => {});
      location.reload();
    },
    async traerComunas() {
      if (this.filtroRegion) {
        this.cargarComunas = true;
        const respComunas = await ubicacionServicio.obtenerComunas(
          this.filtroRegion.id
        );
        this.comunas = respComunas.data;

        this.deshabilitarComunas = false;
        this.cargarComunas = false;
        this.tituloComuna = "Comuna";
      } else {
        this.comunas = [];
      }
    },
  },
};
</script>
