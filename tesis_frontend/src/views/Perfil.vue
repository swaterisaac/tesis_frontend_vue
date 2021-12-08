<template>
    <v-container>
        <v-flex class="pb-6">
            <p class="display-2 text-center">Tu perfil</p>
            <p class="body-2 text-center">Aquí podrás ver los datos de tu perfil y editarlos</p>
        </v-flex>
        <v-row>
            <v-col cols="2">
                <v-img :src="usuarioFirebase.photoURL" alt="Foto de perfil de Google"></v-img>
                <p class="subtitle-2">Foto de perfil de Google</p>
            </v-col>
            <v-col cols="2"></v-col>
            <v-col cols="6">
                <v-form
                    ref="form"
                    v-model="valid"
                    lazy-validation>

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

                    <v-select
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
                        label="Región"></v-select>
                    <v-select
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
                        label="Comuna"></v-select>
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
                            @click="guardarDatos">
                            <v-icon>mdi-content-save</v-icon>
                            Guardar datos
                        </v-btn>
                    </v-flex>
                </v-form>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import ubicacionServicio from '../service/ubicacionServicio';
import consideracionesServicio from '../service/consideracionesServicio';
import {
    formatearFechaDB
} from '../helpers/fecha';
export default {
    name: "Perfil",
    props: ['usuarioApp', 'usuarioFirebase'],
    data() {
        return {
            //Cargas y activaciones
            cargarUsuario: true,
            cargarComunas: false,
            deshabilitarComunas: false,

            //Datos helpers
            activePicker: null,
            valid: false,
            menu: false,
            servidorError: false,
            comunaAntigua: null,
            consideracionesMedicasAntiguas: null,

            //Datos del usuario
            nombreCompleto: '',
            region: '',
            comuna: '',
            fechaNacimiento: '',
            fechaNacimientoFormateada: null,
            correo: '',
            consideracionesMedicas: [],

            //Datos necesarios
            regiones: [],
            comunas: [],
            consideraciones: [],

            //Reglas
            reglasNombre: [
                v => !!v || 'Debe ingresar su nombre completo.',
                v => !!v && v.length < 150 || 'Su nombre debe ser de menos de 150 carácteres',
            ],
            reglasCorreo: [
                v => !!v || 'Debe ingresar su correo',
                v => /.+@.+\..+/.test(v) || 'El correo debe tener el formato nombre@gmail.com',
            ],
            reglasFechaNacimiento: [
                v => !!v || 'Debe ingresar su fecha de nacimiento',
            ],
            reglasRegion: [
                v => !!v || 'Debe ingresar una región',
            ],
            reglasComuna: [
                v => !!v || 'Debe ingresar una comuna',
            ],
        }
    },
    async mounted() {
        console.log(this.usuarioApp);
        //Colocando datos del usuario
        this.nombreCompleto = this.usuarioApp.nombre;
        this.region = this.usuarioApp.region;
        this.fechaNacimientoFormateada = formatearFechaDB(this.usuarioApp.fechaNacimiento);
        this.correo = this.usuarioFirebase.email;
        this.cargarUsuario = false;
        this.consideraciones = this.usuarioApp.consideracionesMedicas;

        //Traer regiones
        const respRegiones = await ubicacionServicio.obtenerRegiones();
        this.regiones = respRegiones.data;

        const regionCompleta = this.regiones.filter(obj => {
            return obj.nombre === this.region;
        });
        //Traer comunas de esa región
        const respComunas = await ubicacionServicio.obtenerComunas(regionCompleta[0].id);
        this.comunas = respComunas.data;
        this.comunaAntigua = this.comunas.filter(obj => {
            return obj.nombre === this.usuarioApp.comuna;
        });
        this.comuna = this.comunaAntigua[0].id;
        //Traer consideraciones
        const respConsideraciones = await consideracionesServicio.obtenerConsideracionesMedicas();
        this.consideraciones = respConsideraciones.data;

        const consideracionesCompletas = this.consideraciones.filter(obj => {
            return this.usuarioApp.consideracionesMedicas.includes(obj.nombre);
        });
        this.consideracionesMedicas = consideracionesCompletas.map(obj => {
            return obj.id;
        })
        this.consideracionesMedicasAntiguas = [...this.consideracionesMedicas];
    },
    methods: {
        async traerComunas() {
            this.cargarComunas = true;
            const respComunas = await ubicacionServicio.obtenerComunas(this.region.id);
            this.comunas = respComunas.data;
            console.log(this.comunas);
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
        async guardarDatos() {
            if (this.$refs.form.validate()) {
                const auxConsi = [...this.consideracionesMedicas];
                const auxConsiAntigua = [...this.consideracionesMedicasAntiguas];
                const nuevosDatos = {
                    'nombre': this.nombreCompleto === this.usuarioApp.nombre ? '' : this.nombreCompleto,
                    'correo': this.correo === this.usuarioApp.correo ? '' : this.correo,
                    'fechaNacimiento': this.fechaNacimiento,
                    'idComuna': this.comuna === this.comunaAntigua[0].id ? '' : this.comuna,
                    'consideraciones': JSON.stringify(auxConsi) === JSON.stringify(auxConsiAntigua) ? '' : this.consideracionesMedicas,
                };
                console.log(nuevosDatos);
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
