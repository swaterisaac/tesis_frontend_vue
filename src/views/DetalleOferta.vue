<template>
  <v-container>
    <v-flex v-if="existeOferta">
      <v-flex class="pb-6">
        <v-btn @click="volver" v-if="false">
          <v-icon>mdi-arrow-left</v-icon>
          Volver
        </v-btn>
        <p class="text-center display-2">
          Oferta turística {{ oferta.nombre }}
        </p>
      </v-flex>
      <v-row>
        <v-col cols="6" class="d-flex align-center">
          <v-img
            :src="oferta.imagen_oferta.String || oferta.imagen_region"
          ></v-img>
        </v-col>
        <v-col cols="6">
          <v-card class="pa-4" outlined shaped color="terciario">
            <v-card class="pa-4" outlined shaped color="fondo">
              <p
                class="
                  text-center
                  headline
                  text-decoration-underline
                  font-weight-bold
                "
              >
                Ubicación
              </p>
              <p class="text-left title font-weight-regular">
                <b>Región: </b>{{ oferta.region }}
              </p>
              <p class="text-left title font-weight-regular">
                <b>Comuna: </b>{{ oferta.comuna }}
              </p>

              <p
                class="
                  text-center
                  headline
                  text-decoration-underline
                  font-weight-bold
                "
              >
                Fechas
              </p>
              <p class="text-left title font-weight-regular">
                <b>Fecha de inicio: </b
                >{{ formatearFecha(oferta.fecha_inicio) }}
              </p>
              <p class="text-left title font-weight-regular">
                <b>Fecha de término: </b
                >{{ formatearFecha(oferta.fecha_final.String) }}
              </p>

              <p
                class="
                  text-center
                  headline
                  text-decoration-underline
                  font-weight-bold
                "
              >
                General
              </p>
              <p class="text-left title font-weight-regular">
                <b>Precio: </b>{{ oferta.precio.String }}
              </p>
              <p class="text-left title font-weight-regular">
                <b>Proveedor: </b>{{ oferta.proveedor }}
              </p>
              <p class="text-left title font-weight-regular">
                <b>Consideraciones Médicas:</b>
              </p>
              <ol v-if="existenConsideraciones">
                <li
                  v-for="consideracion in consideraciones"
                  :key="consideracion.id"
                >
                  <p class="text-left title font-weight-regular">
                    {{ consideracion.nombre }}
                  </p>
                </li>
              </ol>
              <p v-else class="text-left title font-weight-regular">Ninguna</p>
            </v-card>
          </v-card>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <v-card class="pa-4" outlined shaped color="terciario">
            <v-card class="pa-4" outlined shaped color="fondo">
              <v-row>
                <v-col cols="12">
                  <p
                    class="
                      text-center
                      headline
                      text-decoration-underline
                      font-weight-bold
                    "
                  >
                    Contacto
                  </p>
                </v-col>
                <v-col cols="6">
                  <p class="text-left title font-weight-regular">
                    <b>Página: </b
                    ><a>{{ oferta.pagina ? oferta.pagina : "Sin página" }}</a>
                  </p>
                  <p class="text-left title font-weight-regular">
                    <b>Teléfono: </b
                    >{{ oferta.telefono ? oferta.telefono : "Sin teléfono" }}
                  </p>
                </v-col>
                <v-col cols="6">
                  <p class="text-left title font-weight-regular">
                    <b>Correo: </b
                    >{{ oferta.correo ? oferta.correo : "Sin correo" }}
                  </p>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12">
                  <div class="text-left headline font-weight-bold">
                    <v-icon>mdi-map-marker</v-icon>
                    Ubicación oferta: <b class="text-left headline font-weight-regular">{{oferta.ubicacion.String || 'No hay ubicación específica'}}</b>
                  </div>
                </v-col>
              </v-row>
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
import ofertaServicio from "../service/ofertaServicio";
import historialServicio from "../service/historialServicio";
import { formatearFechaDB } from "../helpers/fecha";
import consideracionesServicio from "../service/consideracionesServicio";
export default {
  name: "DetalleOferta",
  props: ["usuarioApp"],
  data() {
    return {
      oferta: [],
      consideraciones: [],
      existeOferta: true,
      existenConsideraciones: false,
    };
  },
  async created() {
    const idOferta = this.$route.params.idOferta;
    const resp = await ofertaServicio.obtenerOfertaPorId(idOferta);
    if (resp.status === 200) {
      this.oferta = resp.data;
      await historialServicio.crearHistoriales(
        this.usuarioApp.correo,
        Number(idOferta)
      );
    } else {
      this.existeOferta = false;
    }
    const respConsideraciones =
      await consideracionesServicio.obtenerConsideracionesPorOferta(
        Number(idOferta)
      );
    if (respConsideraciones.status === 200) {
      this.consideraciones = respConsideraciones.data;
      this.existenConsideraciones = true;
    }
  },
  methods: {
    formatearFecha(fecha) {
      return formatearFechaDB(fecha);
    },
    volver() {
      this.$router.go(-1);
    },
  },
};
</script>
