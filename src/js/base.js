const caminhoTemplates = "../../templates";

configurarTelaInicial();

function configurarTelaInicial() {
    exibirCabecalho();
    listagemLivros();
}

function exibirConteudoEm(container, conteudo) {
    container.load(conteudo);
}

function exibirCabecalho() {
    exibirConteudoEm($("#cabecalho"), caminhoTemplates + "/cabecalho.html");
}

export function listagemLivros() {
    exibirConteudoEm($("#principal"), caminhoTemplates + "/listagem.html");
}

export function adicionarLivro() {
    exibirConteudoEm($("#principal"), caminhoTemplates + "/adicionarLivro.html");
}