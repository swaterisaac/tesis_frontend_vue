<template>
    <v-flex>
        <v-row class="d-flex justify-center pt-4">
            <p class="display-2">Registro</p>
        </v-row>
        <v-form>
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
                        label="Nombre completo"></v-text-field>
                    <v-text-field
                        rounded
                        filled
                        color="#000"
                        background-color="#fff"
                        label="Correo"></v-text-field>
                    <v-text-field
                        rounded
                        filled
                        color="#000"
                        background-color="#fff"
                        label="Fecha de nacimiento"></v-text-field>
                    <v-select
                        rounded
                        filled
                        color="#000"
                        background-color="#fff"
                        :items="regiones"
                        item-text="nombre"
                        return-object
                        v-model="datosRegistro.region"
                        @change="traerComunas()"
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
                        return-object
                        v-model="datosRegistro.comuna"
                        :label="tituloComuna"></v-select>
                </v-col>
            </v-row>
        </v-form>

    </v-flex>
</template>

<script>
import ubicacionServicio from '../service/ubicacionServicio';
export default {
    name: "Registro",
    data(){
        return{
            regiones: [],
            comunas: [],
            tituloComuna: "Comuna (Seleccione una región primero)",
            deshabilitarComunas: true,
            cargarComunas: false,
            datosRegistro: {
                nombreCompleto: '',
                region: '',
                comuna: '',
                correo: '',
            }
        }
    },
    async mounted() {
        const respRegiones = await ubicacionServicio.obtenerRegiones();
        this.regiones = respRegiones.data;
        console.log(this.regiones);
    },
    methods:{
        async traerComunas(){
            this.cargarComunas = true;
            const respComunas = await ubicacionServicio.obtenerComunas(this.datosRegistro.region.id);
            this.comunas = respComunas.data;
            console.log(this.comunas);
            this.deshabilitarComunas = false;
            this.cargarComunas = false;
            this.tituloComuna = "Comuna";
        }
    },
}
</script>

<style>

</style>
