import axiosBackend from "./axiosServicio";

class UsuarioServicio{
    obtenerUsuarioPorCorreo(correo){
        try{
            const res = axiosBackend.get('usuarioPorCorreo', {
                params: {
                    correo: correo,
                }
            });
            return res;
        }
        catch(error){
            console.log(error);
        }
    }
}

const usuarioServicio = new UsuarioServicio();
export default usuarioServicio;