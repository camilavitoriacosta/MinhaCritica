import { db, auth } from '../firebaseConfig.js';
import { createUserWithEmailAndPassword } from 'https://www.gstatic.com/firebasejs/9.13.0/firebase-auth.js';

import { doc, setDoc, collection } from 'https://www.gstatic.com/firebasejs/9.0.0/firebase-firestore.js';


// ToDO: Mensagem para email já existe
export function criarAutentificacao(autentificacao) {
    // createUserWithEmailAndPassword(auth, autentificacao.email, autentificacao.senha)
    //     .then((userCredential) => {
    // const user = userCredential.user;
    const uid = "a9xrgITQBEPUl2IaiJnGuOqhXvX2";
    criarUsuario(uid, autentificacao);
    // })
    // .catch((error) => {
    //   console.log(error);
    // })
}

async function criarUsuario(chave, usuario) {
    const usuarios = doc(collection(db, "usuarios"), chave);
    await setDoc(usuarios, {
        username: usuario.username,
        email: usuario.email,
    });
}