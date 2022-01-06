<template>
    <v-flex class="d-flex justify-center pt-8">
        <v-progress-circular
            v-show="activado"
            indeterminate
            color="black"
            size="50"></v-progress-circular>
    </v-flex>
</template>

<script>
export default {
    name: "CirculoCarga",
    props: {
        activado: {
            type: Boolean,
            default: false,
        }
    },
    data() {
        return {

        }
    }
}
</script>
