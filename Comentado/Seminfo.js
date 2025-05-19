// Captura o formulário pelo ID
const form = document.getElementById("form");

// Captura a lista onde os dados cadastrados serão exibidos
const lista = document.getElementById("clima");

// Recupera os dados já cadastrados do localStorage, ou inicia com array vazio
let cadastro = JSON.parse(localStorage.getItem("cadastro")) || [];

// Função para renderizar as informações cadastradas na tela
function renderInformacoes() {
  // Limpa a lista antes de re-renderizar
  lista.innerHTML = "";

  // Percorre todos os itens do array cadastro
  cadastro.forEach((item, index) => {
    const li = document.createElement("li");

    li.innerHTML = `
      <strong>${item.nome}</strong><br>
      Sobrenome: ${item.sobrenome}<br>
      Email: ${item.email}<br>
      Senha: ${item.senha}<br>
      Informações: ${item.informacoes}<br>
      <button onclick="editar(${index})">Editar</button>
      <button onclick="remover(${index})">Remover</button>
    `;

    lista.appendChild(li);
  });
}

// Evento ao enviar formulário
form.addEventListener("submit", function (e) {
  e.preventDefault();

  const novaInformacao = {
    nome: form["user"].value,
    sobrenome: form["sobrenome"].value,
    email: form["email"].value,
    senha: form["senha"].value,
    confirmarSenha: form["confirmar-senha"].value,
    informacoes: "Informações"  // Campo extra que você pediu
  };

  // Valida senhas
  if (novaInformacao.senha !== novaInformacao.confirmarSenha) {
    alert("As senhas não coincidem!");
    return;
  }

  // Confirmação do usuário
  const confirmacao = confirm("Deseja prosseguir com o cadastro ou editar as informações?");

  if (!confirmacao) {
    form["user"].value = novaInformacao.nome;
    form["sobrenome"].value = novaInformacao.sobrenome;
    form["email"].value = novaInformacao.email;
    form["senha"].value = novaInformacao.senha;
    form["confirmar-senha"].value = novaInformacao.confirmarSenha;
    return;
  }

  cadastro.push(novaInformacao);

  localStorage.setItem("cadastro", JSON.stringify(cadastro));

  form.reset();

  renderInformacoes();
});

// Remove item
function remover(index) {
  cadastro.splice(index, 1);
  localStorage.setItem("cadastro", JSON.stringify(cadastro));
  renderInformacoes();
}

// Edita item
function editar(index) {
  const informacao = cadastro[index];
  form["user"].value = informacao.nome;
  form["sobrenome"].value = informacao.sobrenome;
  form["email"].value = informacao.email;
  form["senha"].value = informacao.senha;
  form["confirmar-senha"].value = informacao.senha;

  cadastro.splice(index, 1);
  localStorage.setItem("cadastro", JSON.stringify(cadastro));
  renderInformacoes();
}

// Chama ao carregar a página
renderInformacoes();
