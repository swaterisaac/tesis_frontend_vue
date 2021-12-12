import axiosBackend from "./axiosServicio";

class ConsideracionesServicio{
    obtenerConsideracionesMedicas(){
        try{
            const resp = axiosBackend.get("obtenerConsideraciones");
            return resp;
        }
        catch(error){
            console.log(error);
        }
    }
    obtenerConsideracionesPorOferta(idOferta){
        try{
            const resp = axiosBackend.get("obtenerConsideracionesPorOferta",{
                params:{
                    idOferta: idOferta,
                }
            });
            return resp;
        }
        catch(error){
            console.log(error);
        }
    }
}

const consideracionesServicio = new ConsideracionesServicio();
export default consideracionesServicio;