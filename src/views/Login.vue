<template>
    <v-flex>
        <p class="text-center display-1">¡Crea una cuenta para obtener ofertas turísticas aptas para ti!</p>
        <v-flex class="d-flex justify-center">
            <v-btn @click="login">
                <v-icon left>mdi-google</v-icon>
                Inicia sesión con Google
            </v-btn>
        </v-flex>
    </v-flex>
</template>

<script>
import {
    getAuth,
    signInWithPopup,
    GoogleAuthProvider
} from "firebase/auth";
import usuarioServicio from '../service/usuarioServicio';

const provider = new GoogleAuthProvider();
const auth = getAuth();

export default {
    name: "Login",
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
                }).catch((error) => {
                    console.log(error);
                });
        },
    },
}
</script>
