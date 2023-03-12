import { mostrarAlertaErro, esconderAlertaErro } from "./alerta.js";


function campoVazio(campo) {
    return campo == "";
}

export function validarCampos(dados) {
    let valido = [];
    dados.forEach(dado => {
        if (campoVazio(dado.value)) {
            mostrarAlertaErro("alerta-" + dado.name, "Preencha o campo");
            valido.push(false);
        } else {
            esconderAlertaErro("alerta-" + dado.name);
        }
    });

    return !valido.includes(false);
}