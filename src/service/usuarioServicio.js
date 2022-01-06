import axiosBackend from "./axiosServicio";

class UsuarioServicio{
    obtenerUsuarioPorCorreo(correo){
        const res = axiosBackend.get('usuarioPorCorreo', {
            params: {
                correo: correo,
            }
        });
        return res;
    }
    
    crearUsuario(usuario){
        const resp = axiosBackend.post('crearUsuario', usuario);
        return resp;
    }
    editarUsuario(usuario){
        try{
            const resp = axiosBackend.put('editarUsuario', usuario);
            return resp;
        }
        catch(error){
            console.log(error);
        }
    }
}

const usuarioServicio = new UsuarioServicio();
export default usuarioServicio;