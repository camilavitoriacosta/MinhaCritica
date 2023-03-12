import { exibirCabecalho } from "../js/base.js";
import { criarLivro } from "../js/repositorios/livrosRepositorio.js";
import { validarCampos } from "./validadores/validacao.js";

inicializar();


async function inicializar() {
    exibirCabecalho();

    let botao = document.getElementById('cadastro-livro');
    botao.addEventListener('click', () => {
        let dados = document.querySelectorAll(".formulario__adicionar__campo__input");
        if (validarCampos(dados)) {
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
