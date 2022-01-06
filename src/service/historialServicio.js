import axiosBackend from "./axiosServicio";

class HistorialServicio{
    crearHistorialBusqueda(correo, busqueda){
        try{
            const resp = axiosBackend.post("crearHistorialBusqueda",{
                correo: correo,
                busqueda: busqueda,
            });
            return resp;
        }
        catch(error){
            console.log(error);
        }
    }
    crearHistoriales(correo, idOferta){
        try{
            const resp = axiosBackend.post("crearHistoriales", {
                correo: correo,
                idOferta: idOferta,
            });
            return resp;
        }
        catch(error){
            console.log(error);
        }
    }
}

const historialServicio = new HistorialServicio();

export default historialServicio;