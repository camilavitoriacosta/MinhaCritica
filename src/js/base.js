const caminhoTemplates = "../../templates";

function exibirConteudoEm(container, conteudo) {
    container.load(conteudo);
}

export function exibirCabecalho() {
    exibirConteudoEm($("#cabecalho"), caminhoTemplates + "/cabecalho.html");
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