// 1 - Importar o express
const express = require("express");

// 2 - Criar o servidor
const servidor = express();
// 3 - Definir de uma rota neste servidor
// endereço, método, função callback(a ação que o servidor vai fazer)
servidor.get('/usuarios', (req, res) => {
    console.log("chegou uma requisição");
    // res.send("Quero lasanha");
    return res.sendFile(__dirname + "/views/index.html")
})
// 4 - Por o servidor no modo "aguardando requisição"
servidor.listen(3000);
