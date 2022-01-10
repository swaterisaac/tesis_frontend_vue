<template>
    <v-flex>
        <v-row class="d-flex justify-center pt-4">
            <p class="display-2">Registro</p>
        </v-row>
        <v-row class="d-flex justify-center pt-4" v-if="servidorError">
            <p class="body-1 red--text text--darken-3">Error con el servidor, por favor, intente más tarde</p>
        </v-row>
        <v-form
            ref="form"
            v-model="valid"
            lazy-validation>
            <v-row justify="center">
                <v-col
                    cols="12"
                    sm="10"
                    md="8"
                    lg="6">
                    <v-text-field
                        rounded
                        filled
                        color="#000"
                        background-color="#fff"
                        prepend-icon="mdi-account"
                        label="Nombre completo"
                        :rules="reglasNombre"
                        v-model="nombreCompleto"></v-text-field>
                    <v-text-field
                        rounded
                        filled
                        color="#000"
                        background-color="#fff"
                        prepend-icon="mdi-email"
                        :value="correo"
                        :disabled="true"
                        :loading="cargarUsuario"
                        :rules="reglasCorreo"
                        label="Correo"></v-text-field>
                    <v-menu
                        ref="menu"
                        v-model="menu"
                        :close-on-content-click="false"
                        transition="scale-transition"
                        offset-y
                        min-width="auto">
                        <template v-slot:activator="{ on, attrs }">
                            <v-text-field
                                rounded
                                filled
                                color="#000"
                                background-color="#fff"
                                v-model="fechaNacimientoFormateada"
                                label="Fecha de nacimiento"
                                prepend-icon="mdi-calendar"
                                readonly
                                :rules="reglasFechaNacimiento"
                                v-bind="attrs"
                                v-on="on"></v-text-field>
                        </template>
                        <v-date-picker
                            color="rojizo"
                            v-model="fechaNacimiento"
                            :active-picker.sync="activePicker"
                            :max="(new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10)"
                            min="1900-01-01"
                            locale="es-CL"
                            @change="save"></v-date-picker>
                    </v-menu>

                    <v-autocomplete
                        rounded
                        filled
                        color="#000"
                        background-color="#fff"
                        :items="regiones"
                        item-text="nombre"
                        prepend-icon="mdi-map-marker"
                        return-object
                        v-model="region"
                        @change="traerComunas()"
                        :rules="reglasRegion"
                        label="Región"></v-autocomplete>
                    <v-autocomplete
                        rounded
                        filled
                        color="#000"
                        background-color="#fff"
                        :loading="cargarComunas"
                        :disabled="deshabilitarComunas"
                        :items="comunas"
                        item-text="nombre"
                        item-value="id"
                        prepend-icon="mdi-map-marker"
                        v-model="comuna"
                        :rules="reglasComuna"
                        :label="tituloComuna"></v-autocomplete>
                    <v-autocomplete
                        rounded
                        filled
                        color="#000"
                        background-color="#fff"
                        prepend-icon="mdi-medical-bag"
                        chips
                        deletable-chips
                        multiple
                        :items="consideraciones"
                        v-model="consideracionesMedicas"
                        item-text="nombre"
                        item-value="id"
                        label="Buscar consideraciones médicas"></v-autocomplete>
                    <v-flex class="d-flex justify-end">
                        <v-btn
                            :disabled="!valid"
                            color="terciario"
                            class="mr-4"
                            @click="registrarse">
                            Registrarse
                        </v-btn>
                    </v-flex>
                </v-col>
            </v-row>
        </v-form>
    </v-flex>
</template>

<script>
import ubicacionServicio from '../service/ubicacionServicio';
import consideracionesServicio from '../service/consideracionesServicio';
import usuarioServicio from '../service/usuarioServicio';
import reglasValidadoras from '../helpers/reglas';

export default {
    name: "Registro",
    props: ['usuarioApp', 'usuarioFirebase'],
    data() {
        return {
            //Cargas y activaciones
            cargarUsuario: true,
            cargarComunas: false,
            deshabilitarComunas: true,

            //Datos helpers
            tituloComuna: "Comuna (Seleccione una región primero)",
            activePicker: null,
            valid: false,
            menu: false,
            servidorError: false,

            //Datos necesarios
            regiones: [],
            comunas: [],
            consideraciones: [],

            //Datos de registro
            nombreCompleto: '',
            region: '',
            comuna: '',
            fechaNacimiento: null,
            fechaNacimientoFormateada: null,
            correo: '',
            consideracionesMedicas: [],

            //Reglas
            reglasNombre: reglasValidadoras.nombre.reglas,
            reglasCorreo: reglasValidadoras.correo.reglas,
            reglasFechaNacimiento: reglasValidadoras.fechaNacimiento.reglas,
            reglasRegion: reglasValidadoras.region.reglas,
            reglasComuna: reglasValidadoras.comuna.reglas,
        }
    },
    async mounted() {
        if(this.usuarioApp){
            this.$router.push("/");
        }
        this.correo = this.usuarioFirebase.email;
        this.cargarUsuario = false;

        const respRegiones = await ubicacionServicio.obtenerRegiones();
        this.regiones = respRegiones.data;

        const respConsideraciones = await consideracionesServicio.obtenerConsideracionesMedicas();
        this.consideraciones = respConsideraciones.data;
    },
    methods: {
        async traerComunas() {
            this.cargarComunas = true;

            const respComunas = await ubicacionServicio.obtenerComunas(this.region.id);
            this.comunas = respComunas.data;

            this.deshabilitarComunas = false;
            this.cargarComunas = false;
            this.tituloComuna = "Comuna";
        },
        save(fechaNacimiento) {
            this.$refs.menu.save(fechaNacimiento);
            this.fechaNacimientoFormateada = this.formatearFecha(fechaNacimiento);
        },
        formatearFecha(fecha) {
            let [anio, mes, dia] = fecha.split("-");
            return dia + "-" + mes + "-" + anio;
        },
        async registrarse() {
            if (this.$refs.form.validate()) {
                const nuevoUsuario = {
                    'nombre': this.nombreCompleto,
                    'correo': this.correo,
                    'fechaNacimiento': this.fechaNacimiento,
                    'idComuna': this.comuna,
                    'consideraciones': this.consideracionesMedicas,
                };
                const resp = await usuarioServicio.crearUsuario(nuevoUsuario);
                if(resp.status !== 200){
                    this.servidorError = true;
                }
                else{
                    window.location.href = "/";
                }
            }
        },
    },
    watch: {
        menu(val) {
            val && setTimeout(() => (this.activePicker = 'YEAR'))
        },
    },
}
</script>

