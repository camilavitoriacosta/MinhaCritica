import { obterUsuario } from './repositorios/usuarioRepositorio.js';


// TO DO: colocar data de expiração
export function criarCookie(userCredential) {
    document.cookie = "usuarioToken=" + userCredential.user.accessToken;
    document.cookie = "usuarioUid=" + userCredential.user.uid;
}

//Apaga cookie quando o usuario desloga, setando a data de expiração para uma data passada
export function resetarCookie() {
    document.cookie = "usuarioToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie = "usuarioUid=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
}

export function usuarioLogado() {
    // Obtém todos os cookies do documento
    var cookies = document.cookie;

    let uidUsuarioLogado;
    cookies.split('; ').forEach(function (cookie) {
        let [nome, valor] = cookie.split('=');
        if (nome=="usuarioUid"){
            uidUsuarioLogado = valor;
        }
    })

    return uidUsuarioLogado;
}


export async function obterUsuarioLogado(){
    return await obterUsuario(usuarioLogado());
}