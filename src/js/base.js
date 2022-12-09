const caminhoTemplates = "../../templates";

configurarTela();

function configurarTela() {
    exibirCabecalho();
}

function exibirConteudoEm(container, conteudo) {
    container.load(conteudo);
}

export function exibirCabecalho() {
    exibirConteudoEm($("#cabecalho"), caminhoTemplates + "/cabecalho.html");
}

export function listagemLivros() {
    window.location.href = "../templates/index.html";
}

export function adicionarLivro() {
    window.location.href = "../templates/adicionarLivro.html";
}

export function detalhesLivro() {
    window.location.href = "../templates/detalhesLivro.html";
}