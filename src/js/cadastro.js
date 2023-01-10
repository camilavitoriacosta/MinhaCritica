import { criarAutentificacao } from "../js/repositorios/usuarioRepositorio.js";

document.querySelector("#cadastro-usuario").addEventListener('click', () => {
    let usuario = {
        "username": document.querySelector("#username").value,
        "email": document.querySelector("#email").value,
        "senha": document.querySelector("#senha").value
    }
    if(usuario.senha.length >= 6){
        criarAutentificacao(usuario);
    }
    else{
        console.log("Senha curta");
    }
})