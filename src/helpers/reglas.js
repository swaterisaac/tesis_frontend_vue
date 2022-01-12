const reglasValidadoras = {
    nombre: {
        largoMaximo: 280,
        reglas: [
            v => !!v || 'Debe ingresar su nombre completo.',
            v => !!v && v.length < reglasValidadoras.nombre.largoMaximo || 'Su nombre debe ser de menos de ' + reglasValidadoras.nombre.largoMaximo + ' carácteres',
        ]
    },
    correo: {
        reglas: [
            v => !!v || 'Debe ingresar su correo',
            v => /.+@.+\..+/.test(v) || 'El correo debe tener el formato nombre@gmail.com',
        ]
    },
    fechaNacimiento: {
        reglas: [
            v => !!v || 'Debe ingresar su fecha de nacimiento',
            v => {
                if(!v){
                    return '';
                }
                const anioMinimo = 1900
                const [anio, mes, dia] = v.split("-");
                mes + dia;
                return parseInt(anio) >= anioMinimo || `Debe ingresar un año mayor a ${anioMinimo}`;
            },
            v => {
                if(!v){
                    return '';
                }
                const [anio, mes, dia] = v.split("-");
                const fechaActual = new Date();
                const anioActual = fechaActual.getFullYear();
                mes + dia;
                return parseInt(anio) <= anioActual || `Debe ingresar un año menor al actual (${anioActual})`;
            }
        ]
    },
    region: {
        reglas: [
            v => !!v || 'Debe ingresar una región',
        ]
    },
    comuna: {
        reglas: [
            v => !!v || 'Debe ingresar una comuna',
        ]
    }
}

export default reglasValidadoras;