<template>
    <v-flex class="d-flex justify-center pt-6">
        <p class="headline" v-show="activado">Hay un problema con el servidor, por favor, intente más tarde</p>
    </v-flex>
</template>

<script>

export default{
    name: "mensajeError",
    props:{
        activado: {
            type: Boolean,
            default: false,
        }
    },
    data(){
        return{

        }
    }
}
</script>
