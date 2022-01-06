<template>
    <v-app v-if="appCreated">
        <navbar :usuarioFirebase="usuarioFirebase" :usuarioApp="usuarioApp"></navbar>
        <v-main :style="{background: $vuetify.theme.themes[theme].fondo}">
            <v-container fluid>
                <router-view v-if="!errorBackend" :usuarioFirebase="usuarioFirebase" :usuarioApp="usuarioApp" />
                <v-flex v-else>
                    <p class="text-center display-3">Hay un error en el servidor, intente más tarde.</p>
                </v-flex>
            </v-container>
        </v-main>
    </v-app>
</template>

<script>
import Navbar from './components/Navbar.vue';
import {
    getAuth
} from 'firebase/auth';
import usuarioServicio from './service/usuarioServicio';

export default {
    components: {
        Navbar
    },

    name: 'App',

    data: () => ({
        theme: 'light',
        usuarioFirebase: undefined,
        usuarioApp: undefined,
        appCreated: false,
        errorBackend: false,
    }),
    async created() {
        const auth = getAuth();
        this.usuarioFirebase = auth.currentUser;
        if (this.usuarioFirebase) {
            try {
                const resp = await usuarioServicio.obtenerUsuarioPorCorreo(this.usuarioFirebase.email);
                if (resp.status === 200) {
                    this.usuarioApp = resp.data;
                } else if (resp.status === 204) {
                    this.$router.push("/registro");
                }
            }
            catch(error){
                this.errorBackend = true;
            }
        }
        this.appCreated = true;
    },

    methods: {
        goHome: function () {
            this.$router.push('/').catch(() => {});
        },
        goTest: function () {
            this.$router.push('/test').catch(() => {});
        },
        goProfile: function () {
            this.$router.push('/profile').catch(() => {});
        }
    }
};
</script>
