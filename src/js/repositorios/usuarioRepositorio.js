import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'https://www.gstatic.com/firebasejs/9.13.0/firebase-auth.js';
import { doc, setDoc, getDoc } from 'https://www.gstatic.com/firebasejs/9.13.0/firebase-firestore.js';
import { db, auth } from '../firebaseConfig.js';
import { criarCookie } from '../auth-guard.js';

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
            criarCookie(userCredential);
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

export async function obterUsuario(uid) {
    console.log(uid);
    const docRef = doc(db, 'usuarios', uid);
    console.log(docRef);

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
        "email": documento.banner,
        "username": documento.username,
        "referencia": docRef
    }
}

