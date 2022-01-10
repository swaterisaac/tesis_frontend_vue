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