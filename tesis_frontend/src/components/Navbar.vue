<template>
    <v-app-bar app color="primario">
        <v-flex
            class="d-flex align-center"
            @click="goHome"
            style="cursor: pointer">
            <v-img
                alt="Vuetify Logo"
                class="shrink mr-2"
                contain
                src=""
                width="40" />
            Logo
        </v-flex>

        <v-spacer></v-spacer>

        <v-responsive max-width="260">
            <v-text-field
                append-icon="mdi-magnify"
                placeholder="Busca ofertas turísticas"
                background-color="#fff"
                class="pt-5"
                rounded
                v-model="query"
                v-if="login"></v-text-field>
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
            v-if="login">
            <v-icon large left>mdi-logout</v-icon>
            <span class="mr-2">Cerrar sesión</span>
        </v-btn>
        <v-btn
            text
            @click="goTest"
            color="#fff">
            <v-icon large left>mdi-test-tube-empty</v-icon>
            <span class="mr-2">Test</span>
        </v-btn>
    </v-app-bar>
</template>

<script>
import { getAuth, signOut } from 'firebase/auth';
export default {
    name: "Navbar",
    data() {
        return {
            login: false,
            query: this.$route.query.query,
        }
    },
    props: ['usuarioApp', 'usuarioFirebase'],
    mounted() {
        if (this.usuarioApp && this.usuarioFirebase) {
            this.login = true;
        }
    },
    methods: {
        goHome: function () {
            this.$router.push("/").catch(() => {});
            location.reload();
        },
        goTest: function () {
            console.log(this.usuarioFirebase, this.usuarioApp);
            //this.$router.push("/test").catch(() => {});
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
                    query: this.query
                }
            }).catch(() => {});
            location.reload();
        },
    },
};
</script>
