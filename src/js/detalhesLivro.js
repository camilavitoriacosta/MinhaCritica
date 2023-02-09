import { adicionarCritica, exibirCabecalho, redirecionarPara } from "../js/base.js";
import { buscarLivro } from "../js/repositorios/livrosRepositorio.js";
import { buscarCriticasLivro, deletarCritica } from "../js/repositorios/criticasRepositorio.js";

inicializar();

function inicializar() {
    exibirCabecalho();
    let idLivro = obterIdLivro();
    preencherDadosLivro(idLivro);

    const btnCadastroCritica = document.getElementById("adicionarCritica");
    btnCadastroCritica.addEventListener('click', () => {
        let caminho = window.location.href = "adicionarCritica.html?idLivro=" + idLivro;
        redirecionarPara(caminho);
    })
}

function obterIdLivro() {
    // Get idLivro in url
    // example url: http://127.0.0.1:5500/templates/detalhesLivro.html?idLivro=zAe2KrUkM7T3XlZJNW3F
    const urlParams = new URLSearchParams(window.location.search);
    const idLivro = urlParams.get('idLivro')
    return idLivro;
}

async function preencherDadosLivro(idLivro) {
    const livro = await buscarLivro(idLivro);
    document.getElementById('banner').src = livro.banner;
    document.getElementById('titulo').textContent = livro.titulo;
    document.getElementById('sinopse').textContent = livro.sinopse;
    document.getElementById('autor').textContent = "Autor: " + livro.autor;
    document.getElementById('genero').textContent = "Genero: " + livro.genero;
    document.getElementById('quantidadePaginas').textContent = "Quantidade de páginas: " + livro.quantidadePaginas;

    preencherDadosCritica(idLivro);
}

async function preencherDadosCritica(livro) {
    let criticas = await buscarCriticasLivro(livro);
    setTimeout(() => {
        if (criticas.length == 0) {
            let container = document.getElementById('criticas-livro');
            container.innerHTML = "<span class='alerta alerta-padrao'> Não há criticas para esse livro </span>"
        }
        else {
            criticas.forEach((critica) => {
                criarCriticaHTML(critica);
            });
        }
    }, 1000);
}


function criarCriticaHTML(critica) {
    let container = document.getElementById('criticas-livro');
    let criticaDiv = `
        <div class='critica'> 
            <a class='critica-username' id='user' href='perfil.html?idUsuario=${critica.usuario.id}'>${critica.usuario.username}</a>
            <p class='critica-data' id='data'>${critica.data}</p>
            <p class='critica-descricao texto' id='criticaDescricao'>${critica.critica}</p>
        </div>`
    container.innerHTML += criticaDiv;
}
