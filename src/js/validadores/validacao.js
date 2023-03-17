import { mostrarAlertaErro, esconderAlertaErro } from "./alerta.js";

const validadores = {
    senha(campo) {
        return campoVazio(campo) || campo.length < 6;
    },

    texto(campo) {
        return campoVazio(campo);
    },

    email(campo) {
        return campoVazio(campo);
    }
}

// const mensagemDeErro = {
//     texto:{
//         campoVazio: "O campo nome não pode estar vazio"
//     },
//     email:{
//         campoVazio: "O campo email não pode estar vazio",
//     },
//     senha:{
//         campoVazio: "O campo de senha não pode estar vazio",
//         tamanhoInvalido: "A senha possui mais de 6 caracteres"
//     },
// }

function campoVazio(campo) {
    return campo == "";
}

export function validarCampos(dados) {
    let valido = [];
    dados.forEach(dado => {
        const tipoInput = dado.dataset.tipo;
        if (validadores[tipoInput](dado.value)) {
            mostrarAlertaErro("alerta-" + dado.name, "Campo inválido");
            valido.push(false);
        } else {
            esconderAlertaErro("alerta-" + dado.name);
        }
    });

    console.log("FIM: " + !valido.includes(false));
    return !valido.includes(false);
}