const caminhoTemplates = "../../templates";
import { logout, usuarioLogado } from "../js/repositorios/usuarioRepositorio.js";

function exibirConteudoEm(container, conteudo) {
    container.load(conteudo);
}

export function exibirCabecalho() {
    exibirConteudoEm($("#cabecalho"), caminhoTemplates + "/cabecalho.html");
    setTimeout(() => {
        const botao = document.querySelector("#logout");
        if (usuarioLogado()) {
            botao.addEventListener('click', () => {
                logout();
                redirecionarPara("../index.html")
            })
        }
        else {
            botao.textContent = "Login";
            botao.addEventListener('click', () => {
                redirecionarPara("../index.html")
            })
        }
    }, 3000)
}

export function listagemLivros() {
    redirecionarPara("../templates/index.html");
}

export function adicionarLivro() {
    redirecionarPara("../templates/adicionarLivro.html");
}

export function detalhesLivro() {
    redirecionarPara("../templates/detalhesLivro.html");
}

export function adicionarCritica() {
    redirecionarPara("../templates/adicionarCritica.html");
}

export function redirecionarPara(caminho) {
    window.location.href = caminho;
}

