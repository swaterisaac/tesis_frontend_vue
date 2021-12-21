<template>
    <v-card
        class="mx-auto my-12 white--text"
        max-width="374"
        color="rojizo"
        elevation="4">

        <v-img height="250" :src="imagenOferta ? imagenOferta:imagenRegion"></v-img>

        <v-card-title class="d-flex justify-center display-1 ">{{this.titulo}}</v-card-title>
        <v-divider dark class="mx-4"></v-divider>
        <v-card-text class="white--text">

            <div class="my-4 headline text-center">
                {{this.ubicacion}}
            </div>

            <div class="body-1">Válido desde:</div>
            <div class="body-1">{{this.fecha}}</div>
        </v-card-text>

        <v-card-title>Precio: ${{this.precio}}</v-card-title>

        <v-card-actions class="d-flex justify-end align-center">
            <v-btn
                class="d-flex align-center"
                color="terciario"
                rounded
                @click="detalleOferta"
                >
                Ver detalle de la oferta
            </v-btn>
        </v-card-actions>
    </v-card>
</template>

<script>
const sinFecha = "Sin fecha definida";
export default {
    name: "Oferta",
    props: {
        idOferta: {
            type: Number,
            default: 0,
        },
        titulo: {
            type: String,
            default: "<Oferta sin título>",
        },
        comuna: {
            type: String,
            default: "Sin comuna",
        },
        region: {
            type: String,
            default: "Sin región",
        },
        fechaInicio: {
            type: String,
            default: sinFecha,
        },
        fechaFinal: {
            type: String,
            default: sinFecha,
        },
        precio: {
            type: String,
            default: "",
        },
        imagenRegion: {
            type: String,
            default: "https://images.pexels.com/photos/356079/pexels-photo-356079.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
        },
        imagenOferta: {
            type: String,
            default: "",
        }

    },
    computed:{
        ubicacion: function(){
            return this.comuna + ", " + this.region;
        },
        fecha: function(){
            return this.fechaInicio + " al " + this.fechaFinal;
        }
    },
    data: () => ({

    }),
    methods: {
        detalleOferta(){
            this.$router.push("/detalleOferta/" + this.idOferta);
        }
    }
}
</script>
