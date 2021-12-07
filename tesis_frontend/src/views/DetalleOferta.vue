<template>
    <v-container>
        <v-flex v-if="existeOferta">
            <v-flex class="pb-6">
                <v-btn @click="volver" v-if="false">
                    <v-icon>mdi-arrow-left</v-icon>
                    Volver</v-btn>
                <p class="text-center display-2">Oferta turística {{oferta.nombre}}</p>
            </v-flex>
            <v-row>
                <v-col cols="6">
                    <v-img src="https://cdn.vuetifyjs.com/images/cards/cooking.png"></v-img>
                </v-col>
                <v-col cols="6">
                    <v-card
                        class="pa-4"
                        outlined
                        shaped
                        color="terciario">
                        <v-card
                            class="pa-4"
                            outlined
                            shaped
                            color="fondo">
                            <p class="text-center headline text-decoration-underline font-weight-bold">Ubicación</p>
                            <p class="text-left title font-weight-regular"><b>Región: </b>{{oferta.region}}</p>
                            <p class="text-left title font-weight-regular"><b>Comuna: </b>{{oferta.comuna}}</p>

                            <p class="text-center headline text-decoration-underline font-weight-bold">Fechas</p>
                            <p class="text-left title font-weight-regular"><b>Fecha de inicio: </b>{{formatearFecha(oferta.fecha_inicio)}}</p>
                            <p class="text-left title font-weight-regular"><b>Fecha de término: </b>{{formatearFecha(oferta.fecha_final)}}</p>

                            <p class="text-center headline text-decoration-underline font-weight-bold">General</p>
                            <p class="text-left title font-weight-regular"><b>Precio: </b>{{oferta.precio}}</p>
                            <p class="text-left title font-weight-regular"><b>Proveedor: </b>{{oferta.proveedor}}</p>
                        </v-card>
                    </v-card>
                </v-col>
            </v-row>
        </v-flex>
        <v-flex v-else>
            <p class="text-center display-2">No existe esta oferta turística</p>
        </v-flex>
    </v-container>
</template>

<script>
import ofertaServicio from '../service/ofertaServicio';
import {
    formatearFechaDB
} from '../helpers/fecha';
export default {
    name: "DetalleOferta",
    async created() {
        const idOferta = this.$route.params.idOferta;
        const resp = await ofertaServicio.obtenerOfertaPorId(idOferta)
        if (resp.status === 200) {
            this.oferta = resp.data;
            console.log(this.oferta);
        } else {
            this.existeOferta = false;
        }

    },
    data() {
        return {
            oferta: [],
            existeOferta: true,
        }
    },
    methods:{
        formatearFecha(fecha){
            return formatearFechaDB(fecha);
        },
        volver(){
            this.$router.go(-1)
        }
    }
}
</script>
