import 'dotenv/config';
import { ObjectId } from "mongodb";
import conectarAoBanco from "../config/dbConfig.js";

// Estabelecendo a conexão com o banco de dados MongoDB
const conexao = await conectarAoBanco(process.env.STRING_CONEXAO);

// Função assíncrona para obter todos os posts do banco de dados
export async function getTodosPosts() {
    // Selecionando o banco de dados e a coleção de posts
    const db = conexao.db("imersao-instabytes");
    const colecao = db.collection("posts");
    // Executando uma consulta para encontrar todos os posts e retornando os resultados
    return colecao.find().toArray();
}

export async function criarPost(novoPost) {
        const db = conexao.db("imersao-instabytes");
        const colecao = db.collection("posts");
        return colecao.insertOne(novoPost)
}

export async function atualizarPost(id, novoPost) {
    const db = conexao.db("imersao-instabytes");
    const colecao = db.collection("posts");
    const objID = ObjectId.createFromHexString(id);
    return colecao.updateOne({_id: new ObjectId(objID)}, {$set:novoPost})
}
