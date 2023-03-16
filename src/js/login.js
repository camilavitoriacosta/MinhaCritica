import { logar } from "./../js/repositorios/usuarioRepositorio.js";
import { usuarioLogado } from "./usuarioAutentificacao.js";
import { redirecionarPara } from "./../js/base.js";
import { validarCampos } from "./validadores/validacao.js";

if (usuarioLogado()) {
    redirecionarPara("./../../listagemLivro.html");
}

document.querySelector("#entrar").addEventListener('click', () => {
    let emailCampo = document.querySelector("#email");
    let senhaCampo = document.querySelector("#senha");

    if (validarCampos([emailCampo, senhaCampo])) {
        let usuario = {
            "email": emailCampo.value,
            "senha": senhaCampo.value
        }
        logar(usuario);
        setTimeout(() => {
            if (usuarioLogado()) {
                window.location.href = "./../../listagemLivro.html";
            }
        }, 1000);
    }
})