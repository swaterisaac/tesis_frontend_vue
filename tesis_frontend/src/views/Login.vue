<template>
    <v-flex>
        <v-btn @click="login">Inicia sesión con Google</v-btn>
        <v-btn @click="testPost">TestPost</v-btn>
    </v-flex>
</template>

<script>
import {
    getAuth,
    signInWithPopup,
    GoogleAuthProvider
} from "firebase/auth";
import axiosBackend from '../service/axiosServicio';
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
                        this.$router.push('/registro').catch(() => {});
                    } else if (status === 200) {
                        window.location.href = "/";
                    }
                    console.log(user);
                }).catch((error) => {
                    console.log(error);
                });
        },
        async testPost() {
            const prueba2 = {
                'nombre': 'juan',
                'correo': 'a@example.com',
                'fechaNacimiento': '2000-03-29',
                'idComuna': 9,
                'consideraciones': [1,2,3],
            }
            try {
                const resp = await axiosBackend.post('crearUsuario', prueba2)
                console.log(resp.status);
                console.log(resp.data);
            } catch (error) {
                console.log(error);
            }

        }
    },
}
</script>
