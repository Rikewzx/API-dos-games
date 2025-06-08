require('dotenv').config(); //carrega os arquivos do .ENV
const express = require('express');// frameork para carregar o serve 
const path = require('path');// serve para montar as rotas até os aequivos 

const app = express(); // executa o express 

app.use(express.static('public'));//Diz que tudo que estiver na pasta public pode ser acessado pelo usuario tipo js html css.


app.get('/', (req, res) => {//req é o pedido que o servido faz e o res é a resposta que o servidor dá
  res.sendFile(path.join(__dirname, 'public', 'index.html'));//res.sendfile envia o arquivo html 
});//do path em diante ele mostra e busca o arquivo html para mostrar

app.get('/api/jogos', async (req, res) => { //qunado um usuario busco um jogo ele busca nessa rota 
  const termo = req.query.busca; //pega oque foi buscado

  if (!termo) { //se a variavel termo tiver vazio o usuario não digitou nada 
    return res.status(400).json({ erro: 'É necessário informar um jogo.' });
  }
                                                                                                                                                  
  const key = process.env.KEY_API;// chave da url escondida pelo arquivo .ENV 
const url = `https://api.rawg.io/api/games?key=${key}&search=${encodeURIComponent(termo)}&ordering=-added`;


  try {
    const response = await fetch(url);
    const dados = await response.json();
    res.json(dados);
  } catch (error) {
    res.status(500).json({ erro: 'Erro ao buscar dados na API' });
  }
});

const PORT = process.env.PORT || 3000;// porta padrao que esta rodando o servidor 
app.listen(PORT, () => console.log(`Servidor rodando em http://localhost:${PORT}`));
 //inicia o servidor e mostra onde esta rodando 
