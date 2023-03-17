import { criarAutentificacao } from "../js/repositorios/usuarioRepositorio.js";
import { mostrarAlertaErro } from "./validadores/alerta.js";
import { validarCampos } from "./validadores/validacao.js";


document.querySelector("#cadastro-usuario").addEventListener('click', () => {
    let usernameCampo = document.querySelector("#username");
    let emailCampo = document.querySelector("#email");
    let senhaCampo = document.querySelector("#senha");
    const campos = [usernameCampo, emailCampo, senhaCampo];

    if (validarCampos(campos)) {
        let usuario = {
            "username": usernameCampo.value,
            "email": emailCampo.value,
            "senha": senhaCampo.value
        }
        criarAutentificacao(usuario);
    }
})