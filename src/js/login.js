import { logar, usuarioLogado } from "../js/repositorios/usuarioRepositorio.js";
import { redirecionarPara } from "../js/base.js";

if (usuarioLogado) {
    redirecionarPara("../../templates/listagemLivro.html");
}

document.querySelector("#entrar").addEventListener('click', () => {
    let usuario = {
        "email": document.querySelector("#email").value,
        "senha": document.querySelector("#senha").value
    }
    logar(usuario);
    redirecionarPara("../../templates/listagemLivro.html");
})