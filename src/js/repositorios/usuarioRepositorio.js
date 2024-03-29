import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'https://www.gstatic.com/firebasejs/9.13.0/firebase-auth.js';
import { doc, setDoc, getDoc } from 'https://www.gstatic.com/firebasejs/9.13.0/firebase-firestore.js';
import { db, auth } from '../firebaseConfig.js';
import { criarCookie, resetarCookie } from '../usuarioAutentificacao.js';
import { mostrarAlertaErro } from '../validadores/alerta.js';

// ToDO: Mensagem para email já existe
export function criarAutentificacao(autentificacao) {
    createUserWithEmailAndPassword(auth, autentificacao.email, autentificacao.senha)
        .then((userCredential) => {
            const user = userCredential.user;
            criarUsuario(user.uid, autentificacao);
            return "Usuario criado com sucesso";
        })
        .catch((error) => {
            mostrarMensagemErroAutentificacao(error);
        })
}

function mostrarMensagemErroAutentificacao(error) {
    const erros = [
        { campo: 'email', code: 'auth/email-already-in-use', mensagem: 'Email já esta em uso' },
        { campo: 'email', code: 'auth/invalid-email', mensagem: 'Email inválido' },
        { campo: 'senha', code: 'auth/wrong-password', mensagem: 'Senha inválida' }
    ]
    let mensagem = "Ocorreu um erro inesperado, tente novamente";
    let campo = 'formulario';
    erros.forEach((erro) => {
        if (error.code == erro.code) {
            mensagem = erro.mensagem;
            campo = erro.campo;
        }
    })

    mostrarAlertaErro('alerta-' + campo, mensagem);
}

async function criarUsuario(chave, usuario) {
    let usuarios = doc(db, "usuarios", chave);
    await setDoc(usuarios, {
        username: usuario.username,
        email: usuario.email,
    });
}

export function logar(usuario) {
    signInWithEmailAndPassword(auth, usuario.email, usuario.senha)
        .then((userCredential) => {
            criarCookie(userCredential);
        })
        .catch((error) => {
            mostrarMensagemErroAutentificacao(error);
        })
}

export function logout() {
    signOut(auth)
        .then((userCredential) => {
            resetarCookie()
            console.log(userCredential);
        })
        .catch((error) => {
            console.log(error);
        })
}

export async function obterUsuario(uid) {
    const docRef = doc(db, 'usuarios', uid);

    const docSnap = await getDoc(docRef).then(resultado => {
        return converterUsuarioParaJSON(resultado.id, docRef, resultado.data());
    }).catch(erro => {
        console.log(erro);
    });
    return docSnap;
}

function converterUsuarioParaJSON(id, docRef, documento) {
    return {
        "id": id,
        "email": documento.email,
        "username": documento.username,
        "referencia": docRef
    }
}