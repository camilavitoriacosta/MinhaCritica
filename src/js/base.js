const caminhoTemplates = "./../../templates";
import { logout } from "./../js/repositorios/usuarioRepositorio.js";
import { usuarioLogado } from "./usuarioAutentificacao.js";

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
            document.querySelector("#perfil").style.display = "none";
        }
    }, 3000)
}

export function adicionarLivro() {
    redirecionarPara("./../templates/adicionarLivro.html");
}

export function redirecionarPara(caminho) {
    window.location.href = caminho;
}

