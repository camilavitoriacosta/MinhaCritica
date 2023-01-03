import { doc, getDoc, setDoc, query, collection, getDocs, orderBy, startAt, endAt, where } from 'https://www.gstatic.com/firebasejs/9.13.0/firebase-firestore.js';

import { inicializarFirebase } from '../firebaseConfig.js';

const db = inicializarFirebase();

export async function buscarTodos() {
    const querySnapshot = await getDocs(collection(db, "livros"));
    const livros = [];
    querySnapshot.forEach((doc) => {
        livros.push(converterLivroParaJSON(doc.id, doc.data()));
    });

    return livros;
}

export async function buscarLivro(id) {
    const docRef = doc(db, 'livros', id);
    const docSnap = await getDoc(docRef).then(resultado => {
        return converterLivroParaJSON(resultado.id, resultado.data());
    }).catch(erro => {
        console.log(erro);
    });
    return docSnap;
}

/* 
Exemplo chamada criarLivro
criarLivro(
    {
        "titulo": documento.titulo,
        "genero": documento.genero,
        "quantidadePaginas": documento.quantidadePaginas,
        "autor": documento.autor,
        "sinopse": documento.sinopse,
        "banner": documento.banner,
    }
    )
*/
export async function criarLivro(livro) {
    const livros = doc(collection(db, "livros"));
    await setDoc(livros, livro);
}

function converterLivroParaJSON(id, documento) {
    return {
        "id": id,
        "titulo": documento.titulo,
        "genero": documento.genero,
        "quantidadePaginas": documento.quantidadePaginas,
        "autor": documento.autor,
        "sinopse": documento.sinopse,
        "banner": documento.banner,
    }
}



export async function buscarReferenciaLivro(idLivro) {
    return doc(db, 'livros', idLivro);
}