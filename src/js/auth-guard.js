import { obterUsuario } from './repositorios/usuarioRepositorio.js';

export function criarCookie(userCredential) {
    document.cookie = "usuarioToken=" + userCredential.user.accessToken;
    document.cookie = "usuarioUid=" + userCredential.user.uid;
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