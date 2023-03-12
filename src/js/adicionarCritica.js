import { exibirCabecalho } from "../js/base.js";
import { criarCritica, editarCritica, buscarCritica } from "../js/repositorios/criticasRepositorio.js";
import { buscarLivro, buscarReferenciaLivro } from "../js/repositorios/livrosRepositorio.js";
import { obterUsuarioLogado } from "./usuarioAutentificacao.js";
import { mostrarAlertaErro, esconderAlertaErro } from "./validadores/alerta.js";
import { campoVazio } from "./validadores/validacao.js";

inicializar();


async function inicializar() {
    exibirCabecalho();
    let idLivro = obterIdLivro();
    let idCritica = obterIdCritica();

    let livro = await buscarLivro(idLivro);
    document.getElementById('livro-atual').textContent = livro.titulo;

    if (idCritica != null) {
        let critica = await buscarCritica(idCritica);
        document.getElementById('critica').textContent = critica.critica;
    }

    const btnEnviar = document.getElementById("cadastro-critica");
    btnEnviar.addEventListener('click', async function () {
        let dadosCritica;
        let critica = document.getElementById('critica').value.trim();

        if (validacao(critica)) {
            let date = obterData();
            let codigoLivro = await buscarReferenciaLivro(idLivro);

            dadosCritica = {
                "critica": critica,
                "data": date,
                "codigoLivro": codigoLivro,
                "usuario": (await obterUsuarioLogado()).referencia
            }

            if (idCritica != null) {
                await editarCritica(idCritica, dadosCritica);
            }
            else {
                await criarCritica(dadosCritica);
            }
            setTimeout(window.location.href = "detalhesLivro.html?idLivro=" + idLivro, 500);
        }
    });
}

function obterIdLivro() {
    // Get idLivro in url
    // example url: http://127.0.0.1:5500/templates/detalhesLivro.html?idLivro=zAe2KrUkM7T3XlZJNW3F
    const urlParams = new URLSearchParams(window.location.search);
    const idLivro = urlParams.get('idLivro')
    return idLivro;
}

function obterIdCritica() {
    // Get idLivro in url
    // example url: http://127.0.0.1:5500/templates/adicionarCritica.html?idLivro=zAe2KrUkM7T3XlZJNW3F&&idCritica=XbapO3v3BElWfIIsA4Fh
    const urlParams = new URLSearchParams(window.location.search);
    const idCritica = urlParams.get('idCritica')
    return idCritica;
}

function validacao(critica) {
    let valido = campoVazio(critica);
    if(!valido){
        mostrarAlertaErro("alerta-descricao-critica", "Preencha esse campo");
    }
    else{
        esconderAlertaErro("alerta-descricao-critica");
    }
    return valido;
}


function obterData() {
    let data = new Date();
    let dia = String(data.getDate()).padStart(2, '0');
    let mes = String(data.getMonth() + 1).padStart(2, '0');
    let ano = data.getFullYear();
    return dia + '/' + mes + '/' + ano;
}