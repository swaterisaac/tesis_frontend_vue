<template>
    <v-flex class="d-flex justify-center">
        <p class="headline" v-show="activado">{{mensaje}}</p>
    </v-flex>
</template>

<script>

export default{
    name: "sinDatos",
    props:{
        mensaje:{
            type: String,
            default: "No hay más datos",
        },
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
