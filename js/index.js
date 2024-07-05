const formularioCadastroProduto = document.querySelector(
  "#formularioCadastroProduto"
);
const elementoNome = document.querySelector("#nome");
const elementoTipo = document.querySelector("#tipo");
const elementoPreco = document.querySelector("#preco");

const cadastrarProduto = (nome, tipo, preco) => {
  const dados = { nomeProduto: nome, tipoProduto: tipo, precoProduto: preco };
  const url = "php/cadastrarProduto.php";
  const opcoes = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(dados),
  };

  fetch(url, opcoes)
    .then((resposta) => {
      if (!resposta.ok) {
        throw new Error(resposta.statusText);
      }

      return resposta.json();
    })
    .then((dados) => {
      if (dados.hasOwnProperty("erro") && dados.hasOwnProperty("campo")) {
        abrirModal(dados.erro);

        switch (dados.campo) {
          case "nome":
            elementoNome.value = "";
            break;
          case "tipo":
            elementoTipo.value = "";
            break;
          case "preco":
            elementoPreco.value = "";
        }
      } else if (dados.hasOwnProperty("erro")) {
        abrirModal(dados.erro);

        elementoNome.value = "";
        elementoTipo.value = "";
        elementoPreco.value = "";
      } else {
        localStorage.setItem("mensagem", dados.sucesso);
        window.location.href = "consultarProdutos.html";
      }
    })
    .catch((erro) => abrirModal(erro));
};

const validarFormularioCadastro = (e) => {
  e.preventDefault();

  const nome = elementoNome.value.trim();
  const tipo = elementoTipo.value.trim();
  const preco = elementoPreco.value.trim();

  if (!nome || nome.length > 30) {
    abrirModal(
      "O nome do produto é obrigatório e deve conter até 30 caracteres."
    );
    elementoNome.value = "";
    return;
  }

  switch (tipo) {
    case "aperitivo":
      break;
    case "pratoPrincipal":
      break;
    case "sobremesa":
      break;
    case "bebida":
      break;
    default:
      abrirModal(
        'O tipo do produto é obrigatório e deve ser válido. Valores aceitos: "Aperitivo", "Prato Principal", "Sobremesa", "Bebida".'
      );
      elementoTipo.value = "";
      return;
  }

  if (!preco || isNaN(preco) || preco < 1 || preco > 999.99) {
    abrirModal(
      "O preço do produto é obrigatório e deve ser válido. Valores aceitos: Números de 1 a 999,99."
    );
    elementoPreco.value = "";
    return;
  }

  cadastrarProduto(nome, tipo, preco);
};

formularioCadastroProduto.addEventListener("submit", validarFormularioCadastro);
