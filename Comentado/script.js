// Captura o formulário pelo ID
const form = document.getElementById("form");

// Captura a lista onde os dados cadastrados serão exibidos
const lista = document.getElementById("clima");

// Tenta recuperar os dados já cadastrados do localStorage. 
// Se não houver, inicia com um array vazio.
let cadastro = JSON.parse(localStorage.getItem("cadastro")) || [];

// Função para renderizar as informações cadastradas na tela
function renderInformacoes() {
  // Limpa a lista antes de re-renderizar
  lista.innerHTML = "";

  // Percorre todos os itens do array `cadastro` e os exibe
  cadastro.forEach((item, index) => {
    // Cria um elemento <li> para cada cadastro
    const li = document.createElement("li");

    // Define o conteúdo HTML do <li> com os dados do usuário
    li.innerHTML = `
      <strong>${item.nome}</strong><br>
      Sobrenome: ${item.sobrenome}<br>
      Email: ${item.email}<br>
      Senha: ${item.senha}<br>
      <button onclick="editar(${index})">Editar</button>
      <button onclick="remover(${index})">Remover</button>
    `;

    // Adiciona o <li> à lista
    lista.appendChild(li);
  });
}

// Adiciona um listener para quando o formulário for enviado
form.addEventListener("submit", function (e) {
  // Evita que a página recarregue ao enviar o formulário
  e.preventDefault();

  // Cria um novo objeto com os dados inseridos pelo usuário
  const novaInformacao = {
    nome: form["user"].value,
    sobrenome: form["sobrenome"].value,
    email: form["email"].value,
    senha: form["senha"].value,
    confirmarSenha: form["confirmar-senha"].value,
  };

  // Valida se as senhas coincidem
  if (novaInformacao.senha !== novaInformacao.confirmarSenha) {
    alert("As senhas não coincidem!");
    return;
  }

  // Pergunta ao usuário se ele deseja confirmar o envio
  const confirmacao = confirm("Deseja prosseguir com o cadastro ou editar as informações?");
  
  // Se o usuário optar por editar, os campos são mantidos no formulário
  if (!confirmacao) {
    form["user"].value = novaInformacao.nome;
    form["sobrenome"].value = novaInformacao.sobrenome;
    form["email"].value = novaInformacao.email;
    form["senha"].value = novaInformacao.senha;
    form["confirmar-senha"].value = novaInformacao.confirmarSenha;
    return;
  }

  // Se confirmado, adiciona a nova informação ao array de cadastro
  cadastro.push(novaInformacao);

  // Salva o array atualizado no localStorage
  localStorage.setItem("cadastro", JSON.stringify(cadastro));

  // Limpa os campos do formulário
  form.reset();

  // Re-renderiza a lista de informações
  renderInformacoes();
});

// Função para remover um item do cadastro
function remover(index) {
  // Remove o item da posição informada
  cadastro.splice(index, 1);

  // Atualiza o localStorage com o novo array
  localStorage.setItem("cadastro", JSON.stringify(cadastro));

  // Atualiza a exibição dos dados
  renderInformacoes();
}

// Função para editar um item já cadastrado
function editar(index) {
  // Recupera os dados do item selecionado
  const informacao = cadastro[index];

  // Preenche os campos do formulário com os dados do item
  form["user"].value = informacao.nome;
  form["sobrenome"].value = informacao.sobrenome;
  form["email"].value = informacao.email;
  form["senha"].value = informacao.senha;
  form["confirmar-senha"].value = informacao.senha;

  // Remove o item da lista (ele será re-inserido após edição)
  cadastro.splice(index, 1);

  // Atualiza o localStorage
  localStorage.setItem("cadastro", JSON.stringify(cadastro));

  // Atualiza a exibição
  renderInformacoes();
}

// Chama a função ao carregar a página para exibir os dados existentes
renderInformacoes();
