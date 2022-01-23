export function formatearFechaDB(fecha){
    if(!fecha){
        return "Indefinido"
    }
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

export function formatearFechaInput(fecha){
    if(!fecha){
        return "Indefinido"
    }
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
    return fechaFormateada.getFullYear() + "-" + mes + "-" + dia;
}
export function obtenerFechaMinima(){
    return "1900-01-01";
}
export function obtenerFechaHoy(){
    let fechaHoy = new Date();
    const dia = fechaHoy.getDate() < 10 ? `0${fechaHoy.getDate()}` : fechaHoy.getDate();
    const mes = fechaHoy.getMonth() + 1 < 10 ? `0${fechaHoy.getMonth() + 1}` : fechaHoy.getMonth() + 1; 
    return `${fechaHoy.getFullYear()}-${mes}-${dia}`;
}