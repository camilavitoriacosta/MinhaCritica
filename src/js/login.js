import { logar } from "../js/repositorios/usuarioRepositorio.js";
import { usuarioLogado } from "./auth-guard.js";
import { redirecionarPara } from "../js/base.js";

if (usuarioLogado()) {
    redirecionarPara("../../templates/listagemLivro.html");
}

document.querySelector("#entrar").addEventListener('click', () => {
    let usuario = {
        "email": document.querySelector("#email").value,
        "senha": document.querySelector("#senha").value
    }
    logar(usuario);
    setTimeout (()=>{
        redirecionarPara("../../templates/listagemLivro.html");
    }, 3000
    )
})