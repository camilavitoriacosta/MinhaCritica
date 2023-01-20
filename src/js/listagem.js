import { adicionarLivro, exibirCabecalho, redirecionarPara } from "../js/base.js";
import { buscarTodos } from "../js/repositorios/livrosRepositorio.js";


inicializar();

async function inicializar() {
    exibirCabecalho();

    var livros = await buscarTodos();
    listarLivros(livros);

    const btnCadastroLivro = document.getElementById("btn-cadastro-livro");
    btnCadastroLivro.addEventListener('click', () => {
        adicionarLivro();
    })

    const search = document.getElementById("search");
    search.oninput = async () => {
        let filtro = livros.filter(livro => livro.titulo.toLowerCase().includes(search.value.toLowerCase()));
        listarLivros(filtro);
    }
}

function listarLivros(lista) {
    let listagem = document.getElementById("listagem");
    listagem.innerHTML = "";

    for (let livro of lista) {
        var item = preencherLivro(livro);
        listagem.appendChild(item);
    }
}

function preencherLivro(livro) {
    let itemLista = document.createElement("li");
    itemLista.className = "lista-livros__item";
    let imagem = document.createElement("img");
    imagem.className = "lista-livros__item__banner";
    imagem.src = livro.banner;
    let titulo = document.createElement("p");
    titulo.innerHTML = livro.titulo;
    titulo.className = "lista-livros__item__titulo";
    itemLista.appendChild(imagem);
    itemLista.appendChild(titulo);

    itemLista.addEventListener('click', () => {
        let caminho = "detalhesLivro.html?idLivro=" + livro.id;
        redirecionarPara(caminho);
    });

    return itemLista;
}