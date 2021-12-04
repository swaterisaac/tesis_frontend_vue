<template>
    <v-flex>
        <div class="text-center display-2">{{titulo}}</div>
        <v-row>
            <v-col
                cols="4"
                v-for="oferta in ofertas"
                :key="oferta.id">
                <oferta
                    :titulo="oferta.nombre"
                    :comuna="oferta.comuna"
                    :region="oferta.region"
                    :fechaInicio="formatearFecha(oferta.fecha_inicio)"
                    :fechaFinal="formatearFecha(oferta.fecha_final)"
                    :precio="oferta.precio"></oferta>
            </v-col>
        </v-row>
        <sin-datos :mensaje="mensajeFinal" :activado="finalDatos"></sin-datos>
        <circulo-de-carga :activado="this.cargarDatos"></circulo-de-carga>
    </v-flex>
</template>

<script>
import ofertaServicio from "../service/ofertaServicio"
import Oferta from '../components/Oferta'
import CirculoDeCarga from '../components/CirculoDeCarga.vue';
import SinDatos from '../components/SinDatos.vue';

export default {
    name: 'Home',
    components: {
        Oferta,
        CirculoDeCarga,
        SinDatos,
    },
    data() {
        return {
            titulo: 'Recomendaciones para ti',
            ofertas: [],
            correo: 'wfilppetti1@reuters.com',
            cargarDatos: false,
            finalDatos: false,
            mensajeFinal: "No tienes más recomendaciones. ¡Prueba a buscar algo!",
            pagina: 1,
            tamanio: 6,
        }
    },
    methods: {
        async obtenerOfertas() {
            this.cargarDatos = true;
            const resp = await ofertaServicio.obtenerRecomendaciones(this.correo, this.pagina, this.tamanio);
            this.ofertas = resp.data;
            this.pagina += 1;
            this.cargarDatos = false;

            console.log("DatosRecomendacion: ", resp.data);
        },
        async obtenerOfertasQuery(query){
            this.cargarDatos = true;
            const resp = await ofertaServicio.obtenerOfertasQuery(this.correo, this.pagina, this.tamanio, query);
            this.ofertas = resp.data;
            this.pagina += 1;
            this.cargarDatos = false;

            console.log("DatosQuery: ", resp.data);
        },
        async recargarOfertas() {
            //Comprobación de si se está en el inferior de la página
            let limiteInferior = document.documentElement.scrollTop + window.innerHeight === document.documentElement.offsetHeight;
            if (limiteInferior) {
                //Si está, se empiezan a traer datos.
                this.cargarDatos = true;
                //Se quita el evento por tema de bugs (ya que esta función se puede ejecutar más de una vez)
                this.quitarScrollInfinitoRecomendacion(false);
                const resp = await ofertaServicio.obtenerRecomendaciones(this.correo, this.pagina, this.tamanio);
                const ofertas = resp.data;
                const status = resp.status;
                //Si no hay datos, se quita este evento para siempre
                if (status === 204) {
                    this.quitarScrollInfinitoRecomendacion(true);
                //Si hay datos, se colocan en la lista de ofertas y se vuelve a poner el evento
                } else if(status === 200){
                    this.ofertas.push(...ofertas);
                    this.pagina += 1;
                    this.ponerScrollInfinitoRecomendacion(false);
                }
                this.cargarDatos = false;
            }
        },
        ponerScrollInfinitoRecomendacion: function () {
            window.addEventListener('scroll', this.recargarOfertas);
        },
        quitarScrollInfinitoRecomendacion: function (final) {
            window.removeEventListener('scroll', this.recargarOfertas);
            if (final){
                this.finalDatos = true;
            }
        },
        formatearFecha: function (fecha) {
            let fechaFormateada = new Date(fecha);
            let dia = fechaFormateada.getDate();
            if (dia < 10) {
                dia = "0" + dia;
            }
            let mes = fechaFormateada.getMonth();
            if (mes < 10) {
                mes = "0" + mes;
            }
            return dia + "-" + mes + "-" + fechaFormateada.getFullYear();
        }
    },
    mounted() {
        const query = this.$route.query.query;
        if(query){
            this.obtenerOfertasQuery(query);
        }
        else{
            this.ponerScrollInfinitoRecomendacion();
            this.obtenerOfertas();
        }
        console.log(this.$route.query.query)
    }
}
</script>
