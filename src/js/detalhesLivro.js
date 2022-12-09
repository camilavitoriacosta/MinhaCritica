import { adicionarCritica, exibirCabecalho } from "../js/base.js";

exibirCabecalho();

const btnCadastroCritica = document.getElementById("adicionarCritica");

btnCadastroCritica.addEventListener('click', () => {
    adicionarCritica();
})