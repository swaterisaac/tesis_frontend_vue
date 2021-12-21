<template>
    <v-flex>
        <div class="text-center display-2">{{titulo}}</div>
        <v-row>
            <v-col
                cols="4"
                v-for="oferta in ofertas"
                :key="oferta.id">
                <oferta
                    :idOferta="oferta.id"
                    :titulo="oferta.nombre"
                    :comuna="oferta.comuna"
                    :region="oferta.region"
                    :fechaInicio="formatearFecha(oferta.fecha_inicio)"
                    :fechaFinal="formatearFecha(oferta.fecha_final)"
                    :precio="oferta.precio"
                    :imagenRegion="oferta.imagen_region"
                    :imagenOferta="oferta.imagen_oferta.String"></oferta>
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
import {
    formatearFechaDB
} from '../helpers/fecha';
import historialServicio from '../service/historialServicio';

export default {
    name: 'Home',
    components: {
        Oferta,
        CirculoDeCarga,
        SinDatos,
    },
    props: ['usuarioApp', 'usuarioFirebase'],
    data() {
        return {
            //Mensajes
            titulo: 'Recomendaciones para ti',
            mensajeFinal: "No tienes más recomendaciones. ¡Prueba a buscar algo!",
            tituloComuna: "Comuna (Seleccione una región primero)",
            //Datos
            correo: '',
            ofertas: [],
            query: '',
            filtroComuna: '',
            filtroRegion: '',
            filtroProveedor: '',
            //Helpers
            finalDatos: false,
            //Cargas y habilitadores
            cargarDatos: false,
            //Paginación
            pagina: 1,
            tamanio: 6,
        }
    },
    methods: {
        //Ofertas de recomendación
        async obtenerOfertas() {
            this.cargarDatos = true;
            const resp = await ofertaServicio.obtenerRecomendaciones(this.correo, this.pagina, this.tamanio);
            this.ofertas = resp.data;
            this.pagina += 1;
            this.cargarDatos = false;

            console.log("DatosRecomendacion: ", resp.data);
        },
        ponerScrollInfinitoRecomendacion: function () {
            window.addEventListener('scroll', this.recargarOfertas);
        },
        quitarScrollInfinitoRecomendacion: function (final) {
            window.removeEventListener('scroll', this.recargarOfertas);
            if (final) {
                this.finalDatos = true;
            }
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
                } else if (status === 200) {
                    this.ofertas.push(...ofertas);
                    this.pagina += 1;
                    this.ponerScrollInfinitoRecomendacion(false);
                }
                this.cargarDatos = false;
            }
        },

        //Ofertas query
        async obtenerOfertasQuery() {
            this.cargarDatos = true;
            const resp = await ofertaServicio.obtenerOfertasQuery(this.correo, this.pagina, this.tamanio, this.query, this.filtroComuna, this.filtroRegion, this.filtroProveedor);
            this.ofertas = resp.data;
            this.pagina += 1;
            this.cargarDatos = false;

            console.log("DatosQuery: ", resp.data);
        },
        ponerScrollInfinitoQuery: function () {
            window.addEventListener('scroll', this.recargarOfertasQuery);
        },
        quitarScrollInfinitoQuery: function (final) {
            window.removeEventListener('scroll', this.recargarOfertasQuery);
            if (final) {
                this.finalDatos = true;
            }
        },
        async recargarOfertasQuery() {
            //Comprobación de si se está en el inferior de la página
            let limiteInferior = document.documentElement.scrollTop + window.innerHeight === document.documentElement.offsetHeight;
            if (limiteInferior) {
                //Si está, se empiezan a traer datos.
                this.cargarDatos = true;
                //Se quita el evento por tema de bugs (ya que esta función se puede ejecutar más de una vez)
                this.quitarScrollInfinitoQuery(false);
                const resp = await ofertaServicio.obtenerOfertasQuery(this.correo, this.pagina, this.tamanio, this.query, this.filtroComuna, this.filtroRegion, this.filtroProveedor);
                const ofertas = resp.data;
                const status = resp.status;
                //Si no hay datos, se quita este evento para siempre
                if (status === 204) {
                    this.quitarScrollInfinitoQuery(true);
                    //Si hay datos, se colocan en la lista de ofertas y se vuelve a poner el evento
                } else if (status === 200) {
                    this.ofertas.push(...ofertas);
                    this.pagina += 1;
                    this.ponerScrollInfinitoQuery(false);
                }
                this.cargarDatos = false;
            }
        },
        formatearFecha: function (fecha) {
            return formatearFechaDB(fecha);
        },
    },
    async mounted() {
        this.query = this.$route.query.query;
        this.filtroComuna = this.$route.query.filtroComuna;
        this.filtroRegion = this.$route.query.filtroRegion;
        this.filtroProveedor = this.$route.query.filtroProveedor;

        
        this.correo = this.usuarioApp.correo;

        if (this.query || this.filtroComuna || this.filtroRegion || this.filtroProveedor) {
            this.query ? this.query : this.query = this.filtroRegion + " " + this.filtroComuna + " " + this.filtroProveedor;
            this.titulo = 'Resultados para : "' + this.query + '"';
            this.ponerScrollInfinitoQuery();
            this.obtenerOfertasQuery();
            await historialServicio.crearHistorialBusqueda(this.correo, this.query);

        } else {
            this.ponerScrollInfinitoRecomendacion();
            this.obtenerOfertas();
        }
    }
}
</script>
