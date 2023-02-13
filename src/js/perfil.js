import { exibirCabecalho, redirecionarPara } from "../js/base.js";
import { buscarCriticasUsuario, deletarCritica } from "../js/repositorios/criticasRepositorio.js";
import { obterUsuario } from "../js/repositorios/usuarioRepositorio.js";
import { obterUsuarioLogado, usuarioLogado } from "./auth-guard.js";
import { buscarLivro } from "./repositorios/livrosRepositorio.js";


let idUsuario = obterIdUsuario();
inicializar();

async function inicializar() {
    exibirCabecalho();

    if (idUsuario != null) {
        //preencher dados do usuario --> perfil publico
        let usuario = await obterUsuario(idUsuario);
        preencherDadosCriticas(usuario.referencia);
        document.getElementById('username').innerHTML = usuario.username;
    }
    else if (usuarioLogado()) {
        let usuario = await obterUsuarioLogado();
        preencherDadosCriticas(usuario.referencia);
        document.getElementById('username').innerHTML = usuario.username;
    }
    else {
        // usuario não logado e idUsuario == null
        redirecionarPara("../index.html")
    }
}

function obterIdUsuario() {
    // Get idLivro in url
    // example url: http://127.0.0.1:5500/templates/perfil.html?idUsuario=
    const urlParams = new URLSearchParams(window.location.search);
    const idUsuario = urlParams.get('idUsuario')
    return idUsuario;
}

async function preencherDadosCriticas(usuario) {
    let criticas = await buscarCriticasUsuario(usuario);
    setTimeout(() => {
        if (criticas.length == 0) {
            let container = document.getElementById('criticas-usuario');
            container.innerHTML = "<span class='alerta alerta-padrao'> Não há criticas para esse usuario </span>"
        }
        else {
            criticas.forEach((critica) => {
                if (idUsuario == null || usuarioLogado() == idUsuario) {
                    criarCriticaLogado(critica);
                }
                else {
                    criarCriticaHTML(critica);
                }
            });
        }
    }, 1000);
}


async function criarCriticaHTML(critica) {
    let livro = await buscarLivro(critica.codigoLivro.id);

    let container = document.getElementById('criticas-usuario');
    let criticaDiv = `
        <div class='critica'>
            <a class='critica-username' id='username' href="detalhesLivro.html?idLivro=${livro.id}">${livro.titulo}</a>
            <p class='critica-data' id='data'>${critica.data}</p>
            <p class='critica-descricao texto' id='criticaDescricao'>${critica.critica}</p>
        </div>`
    container.innerHTML += criticaDiv;
}

async function criarCriticaLogado(critica) {
    let livro = await buscarLivro(critica.codigoLivro.id);

    let container = document.getElementById('criticas-usuario');
    let criticaDiv = `
        <div class='critica'>
            <a class='critica-username' id='livro${livro.id}' href="detalhesLivro.html?idLivro=${livro.id}">${livro.titulo}</a>
            <p class='critica-data' id='data'>${critica.data}</p>
            <p class='critica-descricao texto' id='criticaDescricao'>${critica.critica}</p>
            <div class='acoes'>
                <button class='btn-icon delete' id='deletar${critica.id}'> 
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                    <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                    <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                    </svg>
                </button>
                <button class='btn-icon edit' id='editar${critica.id}-${livro.id}'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-pencil" viewBox="0 0 16 16">
                    <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z"/>
                    </svg>
                </button>
            </div>
        </div>`
    container.innerHTML += criticaDiv;

    document.querySelectorAll('.delete').forEach(botao => {
        botao.addEventListener('click', () => { deletar(botao.id) })
    })

    document.querySelectorAll('.edit').forEach(botao => {
        botao.addEventListener('click', () => { editar(botao.id) })
    })
}

async function deletar(idCritica) {
    idCritica = idCritica.replace('deletar', '');
    await deletarCritica(idCritica);
    window.location.reload();
}

function editar(idCritica, idLivro) {
    idCritica = idCritica.replace('editar', '');
    let ids = idCritica.split("-");
    window.location.href = "adicionarCritica.html?idLivro=" + ids[1] + "&&idCritica=" + ids[0];
}

