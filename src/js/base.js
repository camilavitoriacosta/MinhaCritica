const caminhoTemplates =  "../../templates";

configurarTelaInicial();

function configurarTelaInicial(){
    exibirCabecalho();
    listagemLivros();
}

function exibirConteudoEm(container, conteudo){
    container.load(conteudo);   
}

function exibirCabecalho(){
    exibirConteudoEm($("#cabecalho"), caminhoTemplates + "/cabecalho.html");   
}

function listagemLivros(){
    exibirConteudoEm($("#principal"), caminhoTemplates + "/listagem.html");
}