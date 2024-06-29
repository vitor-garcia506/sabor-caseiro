const formCadProduto = document.querySelector("#formCadProduto");

const validarForm = (e) => {
  e.preventDefault();

  const elNome = document.querySelector("#nome");
  const elTipo = document.querySelector("#tipo");
  const elPreco = document.querySelector("#preco");
  const nome = elNome.value.trim();
  const tipo = elTipo.value.trim();
  const preco = elPreco.value.trim();

  if (!nome) {
    abrirModal("O nome do produto é obrigatório.");
    elNome.value = "";
    return;
  }

  if (nome.length > 30) {
    abrirModal("O nome do produto só pode conter até 30 caracteres.");
    elNome.value = "";
    return;
  }

  if (!tipo) {
    abrirModal("O tipo do produto é obrigatório.");
    elTipo.value = "";
    return;
  }

  if (!preco) {
    abrirModal("O preço do produto é obrigatório.");
    elPreco.value = "";
    return;
  }

  if (isNaN(preco)) {
    abrirModal("O preço do produto deve ser um número.");
    elPreco.value = "";
    return;
  }

  if (preco < 1 || preco > 999.99) {
    abrirModal("O preço do produto deve estar entre 1 e 999,99.");
    elPreco.value = "";
    return;
  }
};

formCadProduto.addEventListener("submit", validarForm);
