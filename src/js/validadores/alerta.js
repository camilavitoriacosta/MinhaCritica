export function mostrarAlertaErro(idElemento, mensagem) {
    mostrarAlerta(idElemento, 'alerta-erro', mensagem);
}

export function esconderAlertaErro(idElemento){
    esconderAlerta(idElemento, 'alerta-erro')
}

export function mostrarAlertaPadrao(idElemento, mensagem) {
    mostrarAlerta(idElemento, 'alerta-padrao', mensagem);
}

function mostrarAlerta(idElemento, classeDeAlerta, mensagem) {
    let alerta = document.getElementById(idElemento);
    alerta.style.display = "inline-block";
    alerta.classList.add(classeDeAlerta);
    alerta.textContent = mensagem;
}

function esconderAlerta(idElemento, classeDeAlerta) {
    let alerta = document.getElementById(idElemento);
    alerta.style.display = "none";
    alerta.classList.remove(classeDeAlerta);
    alerta.textContent = "";
}