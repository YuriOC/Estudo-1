import express from "express"; // Importa o Express para construir a aplicação web
import multer from "multer"; // Importa o Multer para lidar com uploads de arquivos
import { listarPosts, postarNovoPost, uploadImagem, atualizarNovoPost } from "../controllers/postsController.js"; // Importa funções de controle para lidar com diferentes rotas
import cors from "cors";

const corsOptions = {
    origin: "http://localhost:8000",
    optionsSuccessStatus: 200
}

// Configura o armazenamento do Multer usando diskStorage
const storage = multer.diskStorage({
    destination: function (req, file, cb) { // Especifica o diretório de destino para arquivos enviados
        cb(null, 'uploads/'); // Define o destino para a pasta 'uploads/' dentro do diretório do projeto
    },
    filename: function (req, file, cb) { // Define como os arquivos enviados serão nomeados
        cb(null, file.originalname); // Mantém o nome original do arquivo
    }
});

// Cria a instância do middleware Multer com o armazenamento configurado
const upload = multer({ storage });

// Define manipuladores de rotas usando uma função de rota central
const routes = (app) => {
    // Middleware para analisar corpos de requisição JSON
    app.use(express.json()); // Permite que a aplicação entenda dados JSON recebidos
    app.use(cors(corsOptions))
    // Rota para obter uma lista de todos os posts
    app.get("/posts", listarPosts); // Delega o tratamento à função de controle 'listarPosts'

    // Rota para criar um novo post
    app.post("/posts", postarNovoPost); // Delega o tratamento à função de controle 'postarNovoPost'

    // Rota para enviar uma imagem
    app.post("/upload", upload.single("imagem"), uploadImagem); // Lidar com o upload de imagem com Multer e delegar o processamento posterior à função de controle 'uploadImagem'
    //  - upload.single("imagem"): Middleware para lidar com um único upload de arquivo com o nome de campo "imagem"
    app.put("/upload/:id", atualizarNovoPost)
};

export default routes;

