import axiosBackend from "./axiosServicio";

class UbicacionServicio{
    obtenerRegiones(){
        try{
            const res = axiosBackend.get('obtenerRegiones');
            return res;
        }
        catch(error){
            console.log(error)
        }
    }
    obtenerComunas(idRegion){
        try{
            const res = axiosBackend.get('obtenerComunas', {
                params: {
                    region: idRegion,
                }
            });
            return res;
        }
        catch(error){
            console.log(error)
        }
    }
}
const ubicacionServicio = new UbicacionServicio();

export default ubicacionServicio;