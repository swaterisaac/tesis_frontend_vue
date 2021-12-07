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
    
    crearUsuario(usuario){
        const resp = axiosBackend.post('crearUsuario', usuario);
        return resp;
    }
}

const usuarioServicio = new UsuarioServicio();
export default usuarioServicio;