import { doc, collection, query, where, getDocs, getDoc, setDoc, updateDoc, deleteDoc } from 'https://www.gstatic.com/firebasejs/9.13.0/firebase-firestore.js';

import { db } from '../firebaseConfig.js'


export async function buscarCriticasLivro(idLivro) {
    let livro = doc(db, 'livros', idLivro);
    const q = query(collection(db, "criticas"), where("codigoLivro", "==", livro));

    const querySnapshot = await getDocs(q);

    let criticasLivro = [];
    querySnapshot.forEach((doc) => {
        criticasLivro.push(converterCriticaParaJSON(doc.id, doc.data()))
    });

    return criticasLivro;
}

export async function buscarCritica(id) {
    const docRef = doc(db, 'criticas', id);
    const docSnap = await getDoc(docRef).then(resultado => {
        return converterCriticaParaJSON(resultado.id, resultado.data());
    }).catch(erro => {
        console.log(erro);
    });
    return docSnap;
}

/* Exemplo chamada criarCritica() 
criarCritica(
    {
        "codigoLivro": doc(db, 'livros', "zAe2KrUkM7T3XlZJNW3F"),
        "critica": "Adorei",
        "data": "04/11/2022",
        "username": "Flor",
    }
)
*/

export async function criarCritica(critica) {
    const criticas = doc(collection(db, "criticas"));
    await setDoc(criticas, critica);
}


/* Exemplo chamada editarCritica: 
obs: pode se passar como segundo parametro os campos que vão ser modificados, não precisa passar todos
editarCritica("7fMhTx5PzFDESWpFVAbu", {
    "critica": "Muito legal!"
})
*/
export async function editarCritica(idCritica, critica) {
    const criticaRef = doc(db, "criticas", idCritica);
    await updateDoc(criticaRef, critica);
}

// deletarCritica("cPLLx3r8ck9SpT9dep07");
export async function deletarCritica(idCritica) {
    await deleteDoc(doc(db, "criticas", idCritica));
}

function converterCriticaParaJSON(id, documento) {
    return {
        "id": id,
        "codigoLivro": documento.codigoLivro,
        "critica": documento.critica,
        "data": documento.data,
        "username": documento.username,
    }
}