<template>
    <v-flex>
        <div class="text-center display-2">Recomendaciones para ti</div>
        <v-row>
            <v-col cols="4" v-for="oferta in ofertas" :key="oferta.id">
                <oferta
                  :titulo="oferta.nombre"
                  :comuna="oferta.comuna"
                  :region="oferta.region"
                  :fechaInicio="formatearFecha(oferta.fecha_inicio)"
                  :fechaFinal="formatearFecha(oferta.fecha_final)"
                  :precio="oferta.precio"
                ></oferta>
            </v-col>
        </v-row>
        <circulo-de-carga :activado="false"></circulo-de-carga>
    </v-flex>
</template>

<script>
import axiosBackend from "../service/axiosService";
import Oferta from '../components/Oferta'
import CirculoDeCarga from '../components/CirculoDeCarga.vue';

export default {
    name: 'Home',
    components: {
        Oferta,
        CirculoDeCarga,
    },
    data() {
        return {
            ofertas: [],
            correo: 'gprobin0@si.edu',
            cargarDatos: false,
            pagina: 1,
            tamanio: 6,
        }
    },
    methods: {
        async obtenerOfertas() {
            let r = await axiosBackend.get('ofertas', {
                params: {
                    correo: this.correo,
                    pagina: this.pagina,
                    tamanio: this.tamanio,
                }
            });
            this.ofertas = r.data;
            console.log("DATA: ", r.data);
        },
        formatearFecha: function (fecha){
            let fechaFormateada = new Date(fecha);
            let dia = fechaFormateada.getDate();
            if (dia < 10){
                dia = "0" +  dia;
            }
            let mes = fechaFormateada.getMonth();
            if (mes < 10){
                mes = "0" + mes;
            }
            return dia + "-" + mes + "-" + fechaFormateada.getFullYear(); 
        }
    },
    mounted() {
        this.obtenerOfertas();
    }
}
</script>
