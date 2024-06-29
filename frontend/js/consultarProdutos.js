const formPesqProdutos = document.querySelector("#formPesqProdutos");

const mostrarLinhas = (linhasTabela) => {
  linhasTabela.forEach((linhaTabela) => {
    linhaTabela.style.display = "table-row";
  });
};

const pesquisarTarefas = (e) => {
  e.preventDefault();

  const elPesquisa = document.querySelector("#pesquisa");
  const linhasTabela = document.querySelectorAll("#corpoTabela tr");
  const pesquisa = elPesquisa.value.trim().toLowerCase();
  let encontrouPesquisa = false;

  if (linhasTabela.length > 0) {
    if (!pesquisa) {
      abrirModal("A pesquisa é obrigatória.");
      mostrarLinhas(linhasTabela);
      elPesquisa.value = "";
      return;
    }

    if (pesquisa.length > 30) {
      abrirModal("A pesquisa não deve conter mais de 30 caracteres.");
      mostrarLinhas(linhasTabela);
      elPesquisa.value = "";
      return;
    }

    linhasTabela.forEach((linhaTabela) => {
      const textoLinhaTabela = linhaTabela.textContent.trim().toLowerCase();

      if (textoLinhaTabela.indexOf(pesquisa) !== -1) {
        linhaTabela.style.display = "table-row";
        encontrouPesquisa = true;
      } else {
        linhaTabela.style.display = "none";
      }
    });

    if (!encontrouPesquisa) {
      abrirModal("Não foi possível encontrar sua pesquisa.");
      mostrarLinhas(linhasTabela);
      elPesquisa.value = "";
    }
  }
};

formPesqProdutos.addEventListener("submit", pesquisarTarefas);
