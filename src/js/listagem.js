import { adicionarLivro, exibirCabecalho } from "../js/base.js";

exibirCabecalho();

const btnCadastroLivro = document.getElementById("btn-cadastro-livro");

btnCadastroLivro.addEventListener('click', () => {
    adicionarLivro();
})