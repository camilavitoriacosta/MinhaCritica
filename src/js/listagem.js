import { adicionarLivro } from "../js/base.js";

const btnCadastroLivro = document.getElementById("btn-cadastro-livro");

btnCadastroLivro.addEventListener('click', () => {
    adicionarLivro();
})