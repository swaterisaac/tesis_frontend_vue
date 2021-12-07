export function formatearFechaDB(fecha){
    let fechaFormateada = new Date(fecha);
    let dia = fechaFormateada.getDate();
    if (dia < 10) {
        dia = "0" + dia;
    }
    let mes = fechaFormateada.getMonth();
    if (mes < 10) {
        mes = "0" + mes;
    }
    return dia + "-" + mes + "-" + fechaFormateada.getFullYear();
}