import { exibirCabecalho } from "../js/base.js";
import { criarLivro } from "../js/repositorios/livrosRepositorio.js";

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
        if (dado.value == "") {
            let alerta = document.getElementById("alerta-" + dado.name);
            alerta.classList.add("alerta-erro");
            alerta.innerHTML = "Preencha o campo";
            valido.push(false);
        }
    });
    console.log(valido);
    return !valido.includes(false);
}