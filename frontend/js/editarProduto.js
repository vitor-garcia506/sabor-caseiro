const formEditProduto = document.querySelector("#formEditProduto");

const validarForm = (e) => {
  e.preventDefault();

  const elNovoNome = document.querySelector("#novoNome");
  const elNovoTipo = document.querySelector("#novoTipo");
  const elNovoPreco = document.querySelector("#novoPreco");
  const novoNome = elNovoNome.value.trim();
  const novoTipo = elNovoTipo.value.trim();
  const novoPreco = elNovoPreco.value.trim();

  if (!novoNome) {
    abrirModal("O novo nome do produto é obrigatório.");
    elNovoNome.value = "";
    return;
  }

  if (novoNome.length > 30) {
    abrirModal("O novo nome do produto só pode conter até 30 caracteres.");
    elNovoNome.value = "";
    return;
  }

  if (!novoTipo) {
    abrirModal("O novo tipo do produto é obrigatório.");
    elNovoTipo.value = "";
    return;
  }

  if (!novoPreco) {
    abrirModal("O novo preço do produto é obrigatório.");
    elNovoPreco.value = "";
    return;
  }

  if (isNaN(novoPreco)) {
    abrirModal("O novo preço do produto deve ser um número.");
    elNovoPreco.value = "";
    return;
  }

  if (novoPreco < 1 || novoPreco > 999.99) {
    abrirModal("O novo preço do produto deve estar entre 1 e 999,99.");
    elNovoPreco.value = "";
    return;
  }
};

formEditProduto.addEventListener("submit", validarForm);
