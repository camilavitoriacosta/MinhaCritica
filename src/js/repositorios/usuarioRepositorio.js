import { db, auth } from '../firebaseConfig.js';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'https://www.gstatic.com/firebasejs/9.13.0/firebase-auth.js';

import { doc, setDoc } from 'https://www.gstatic.com/firebasejs/9.13.0/firebase-firestore.js';


// ToDO: Mensagem para email já existe
export function criarAutentificacao(autentificacao) {
    createUserWithEmailAndPassword(auth, autentificacao.email, autentificacao.senha)
        .then((userCredential) => {
            const user = userCredential.user;
            criarUsuario(user.uid, autentificacao);
        })
        .catch((error) => {
            console.log(error);
        })
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
            console.log(userCredential);
        })
        .catch((error) => {
            console.log(error);
        })
}

export function logout() {
    console.log(auth);
    signOut(auth)
        .then((userCredential) => {
            console.log(userCredential);
        })
        .catch((error) => {
            console.log(error);
        })
}

export function usuarioLogado() {
    return auth.currentUser;
}