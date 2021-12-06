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
                    if(status === 204){
                        this.$router.push('/registro').catch(() => {});
                    }
                    else if(status === 200){
                        this.$router.push('/').catch(() => {});
                    }
                    console.log(user);
                }).catch((error) => {
                    console.log(error);
                });
        },
        testPost(){
            const prueba = new URLSearchParams();
            prueba.append('nombre', 'Juan');
            prueba.append('consideraciones', ['1','2','3']);
            
            axiosBackend.post('crearUsuario', prueba)
        }
    },
}
</script>
