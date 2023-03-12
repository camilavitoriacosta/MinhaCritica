import { exibirCabecalho } from "../js/base.js";
import { criarLivro } from "../js/repositorios/livrosRepositorio.js";
import { mostrarAlertaErro, esconderAlertaErro } from "./validadores/alerta.js";
import { campoVazio } from "./validadores/validacao.js";

inicializar();


async function inicializar() {
    exibirCabecalho();

    let botao = document.getElementById('cadastro-livro');
    botao.addEventListener('click', () => {
        if (validarDados()) {
            let dadosLivro = {
                "titulo": document.getElementById('titulo').value,
                "genero": document.getElementById('genero').value,
                "quantidadePaginas": document.getElementById('quantidadePaginas').value,
                "autor": document.getElementById('autor').value,
                "sinopse": document.getElementById('sinopse').value,
                "banner": document.getElementById('banner').value
            }

            criarLivro(dadosLivro);
        }
    });
}

function validarDados() {
    let valido = [];
    const dadosLivro = document.querySelectorAll(".formulario__adicionar__campo__input");
    dadosLivro.forEach(dado => {
        if (campoVazio(dado.value)) {
            mostrarAlertaErro("alerta-" + dado.name, "Preencha o campo");
            valido.push(false);
        } else {
            esconderAlertaErro("alerta-" + dado.name);
        }
    });
    return !valido.includes(false);
}