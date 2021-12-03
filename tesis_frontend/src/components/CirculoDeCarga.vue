<template>
    <v-progress-circular
    v-show="activado"
    indeterminate
    color="black"
    size="100"></v-progress-circular>
</template>

<script>
export default{
    name: "CirculoCarga",
    props:{
        activado:{
            type: Boolean,
            default: false,
        }
    },
    data(){
        return{

        }
    }
}
</script>
