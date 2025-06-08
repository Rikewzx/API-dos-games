document.querySelector('#src').addEventListener('submit', async (event) => {//criamos uma funçao assincrona para
  event.preventDefault();//poder usar o await e tambem usamos o prevenDefault para nao reiniciar o formulario

  const valor = document.getElementById('valor_input').value;//pegamos o valor do input

  if (!valor) {
    return showAlert("É necessário um Jogo");//checamos que se o usuario não digitar nada colocamos uma mensagem 
  }//é necessario um jogo

  const resposta = await fetch(`/api/jogos?busca=${encodeURIComponent(valor)}`); //aqui esparamos o fetch traxer os 
  const dados = await resposta.json();//resultados e transformamos e json

  const personagem = dados.results.find(person => person.name.toLowerCase().includes(valor.toLowerCase()));
  //tentamos encontrar o jogo usando o find e usamos person.name porque name é como esta na API para achar o nome
  //colocamos tudo em toLowerCaser para não ter preucupaçao na hora de não achar um jogo por letra minuscula o ma

  if (!personagem) {
    return showAlert("Jogo não registrado na API");//se o jogo não constar na api retornamos um alert jogo nao contem

  }

  atualizarpersonagens({
    Name: personagem.name,
    Imagem: personagem.background_image,
    Genero: personagem.genres.map(i => i.name).join(', ') || 'Gênero não informado',
    Notas: personagem.rating,
    NotasMax: personagem.rating_top,
    Lancamento: personagem.released
      ? new Date(personagem.released).toLocaleDateString("pt-BR")
      : 'Data não informada',
  });
});

function atualizarpersonagens(resp) {
  document.querySelector('.container-cards').classList.add('show');
  document.querySelector('#title_persona').innerHTML = `${resp.Name}`;
  document.querySelector('#img-persona').setAttribute('src', resp.Imagem);
  document.querySelector('#genero_gm').innerHTML = `${resp.Genero}`;
  document.querySelector('#lanca_gm').innerHTML = `${resp.Lancamento}`;
  document.querySelector('#nota_gm').innerHTML = `${resp.Notas}/${resp.NotasMax}`;
}

function showAlert(msg) {
  document.querySelector('#alert').innerHTML = msg;

setTimeout(()=>{
  document.querySelector('#alert').innerHTML = ""
},2000)
}

 

