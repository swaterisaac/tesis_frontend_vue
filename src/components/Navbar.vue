<template>
    <v-app-bar app color="primario">
        <v-btn
            class="text-left"
            @click="goHome"
            text
            color="#fff">
            <v-img
                alt="Logo de la aplicación"
                class="shrink mr-2"
                contain
                src=""
                width="40" />
            Inicio
        </v-btn>

        <v-spacer></v-spacer>
        <v-menu
            v-model="menuFiltro"
            :close-on-content-click="false"
            :nudge-width="250"
            offset-y
            v-if="login">
            <template v-slot:activator="{ on, attrs }">
                <v-btn
                    text
                    color="#fff"
                    v-bind="attrs"
                    v-on="on">
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
                        label="Región"></v-autocomplete>
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
                        :label="tituloComuna"></v-autocomplete>
                    <v-autocomplete
                        rounded
                        filled
                        color="#000"
                        background-color="#fff"
                        :items="proveedores"
                        item-text="nombre"
                        prepend-icon="mdi-account-supervisor"
                        v-model="filtroProveedor"
                        label="Proveedor"></v-autocomplete>
                </v-flex>

                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn text @click="menuFiltro = false">
                        Cerrar
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-menu>
        <v-responsive max-width="260">
            <v-text-field
                append-icon="mdi-magnify"
                placeholder="Busca ofertas turísticas"
                background-color="#fff"
                class="pt-5"
                rounded
                v-model="query"
                v-if="login"
                @keydown.enter.prevent="ejecutarQuery"></v-text-field>
        </v-responsive>
        <div class="px-2" v-if="login">
            <v-btn
                rounded
                color="secundario"
                class="white--text"
                @click="ejecutarQuery">Buscar</v-btn>
        </div>

        <v-btn
            text
            @click="goProfile"
            color="#fff"
            v-if="login">
            <v-icon large left>mdi-account</v-icon>
            <span class="mr-2">Ver tu perfil</span>
        </v-btn>
        <v-btn
            text
            @click="cerrarSesion"
            color="#fff"
            v-if="login || enRegistro">
            <v-icon large left>mdi-logout</v-icon>
            <span class="mr-2">Cerrar sesión</span>
        </v-btn>
    </v-app-bar>
</template>

<script>
import {
    getAuth,
    signOut
} from 'firebase/auth';
import ubicacionServicio from '../service/ubicacionServicio';
import ofertaServicio from '../service/ofertaServicio';
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
            filtroComuna: '',
            filtroRegion: '',
            filtroProveedor: '',

            cargarComunas: false,
            deshabilitarComunas: true,
            menuFiltro: false,
        }
    },
    computed: {
        enRegistro() {
            return this.$route.name === 'Registro'
        }
    },
    props: ['usuarioApp', 'usuarioFirebase'],
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
            signOut(auth).then(() => {
                window.location.href = "/login";
            }).catch(error => {
                console.log(error);
            });
        },
        ejecutarQuery: function () {
            this.$router.push({
                path: '/',
                query: {
                    query: this.query,
                    filtroComuna: this.filtroComuna,
                    filtroRegion: this.filtroRegion.nombre,
                    filtroProveedor: this.filtroProveedor,
                }
            }).catch(() => {});
            location.reload();
        },
        async traerComunas() {

            if (this.filtroRegion) {
                this.cargarComunas = true;
                const respComunas = await ubicacionServicio.obtenerComunas(this.filtroRegion.id);
                this.comunas = respComunas.data;

                this.deshabilitarComunas = false;
                this.cargarComunas = false;
                this.tituloComuna = "Comuna";
            } else {
                this.comunas = []
            }

        },
    },
};
</script>
