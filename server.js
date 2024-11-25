// Importando as dependências necessárias
import express from "express";
import routes from "./src/routes/postsRoutes.js";

// Criando uma instância do Express para iniciar o servidor
const app = express();
app.use(express.static("uploads"))
routes(app);



// Iniciando o servidor na porta 3000
app.listen(3000, () => {
    console.log("Servidor escutando na porta 3000");
});



