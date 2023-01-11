import { db, auth } from '../firebaseConfig.js';
import { createUserWithEmailAndPassword } from 'https://www.gstatic.com/firebasejs/9.13.0/firebase-auth.js';

import { doc, setDoc, collection } from 'https://www.gstatic.com/firebasejs/9.13.0/firebase-firestore.js';


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