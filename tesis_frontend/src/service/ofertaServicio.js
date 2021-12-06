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

    obtenerOfertasQuery(correo, pagina, tamanio, query){
        try{
            const res = axiosBackend.get('ofertasQuery', {
                params: {
                    correo: correo,
                    pagina: pagina,
                    tamanio: tamanio,
                    query: query,
                }
            });
            return res;
        }
        catch(error){
            console.log(error);
        }
    }
}

const ofertaServicio = new OfertaServicio();
export default ofertaServicio;