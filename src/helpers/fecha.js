export function formatearFechaDB(fecha){
    let fechaAux = new Date(fecha)
    let fechaFormateada = new Date(fechaAux.valueOf() + fechaAux.getTimezoneOffset() * 60000);
    let dia = fechaFormateada.getDate();
    if (dia < 10) {
        dia = "0" + dia;
    }
    let mes = fechaFormateada.getMonth() + 1;
    if (mes < 10) {
        mes = "0" + mes;
    }
    return dia + "-" + mes + "-" + fechaFormateada.getFullYear();
}