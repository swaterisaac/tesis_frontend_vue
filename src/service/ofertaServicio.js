import axiosBackend from "./axiosServicio";

class OfertaServicio{
    obtenerRecomendaciones(correo, pagina, tamanio){
        try{
            const res = axiosBackend.get('ofertas', {
                params: {
                    correo: correo,
                    pagina: pagina,
                    tamanio: tamanio,
                }
            });
            return res;
        }
        catch(error){
            console.log(error);
        }
    }

    obtenerOfertasQuery(correo, pagina, tamanio, query, filtroComuna, filtroRegion, filtroProveedor){
        try{
            const res = axiosBackend.get('ofertasQuery', {
                params: {
                    correo: correo,
                    pagina: pagina,
                    tamanio: tamanio,
                    query: query,
                    filtroComuna: filtroComuna,
                    filtroRegion: filtroRegion,
                    filtroProveedor: filtroProveedor,
                }
            });
            return res;
        }
        catch(error){
            console.log(error);
        }
    }
    obtenerOfertaPorId(idOferta){
        try{
            const res = axiosBackend.get('obtenerOfertaPorId',{
                params:{
                    idOferta: idOferta,
                }
            });
            return res;
        }
        catch(error){
            console.log(error);
        }
    }
    obtenerProveedores(){
        try{
            const res = axiosBackend.get('obtenerProveedores');
            return res;
        }
        catch(error){
            console.log(error);
        }
    }
}

const ofertaServicio = new OfertaServicio();
export default ofertaServicio;