const secaoConsultaProdutos = document.querySelector("#secaoConsultaProdutos");
const campoPesquisa = document.querySelector("#pesquisa");
const corpoTabelaProdutos = document.querySelector("#corpoTabelaProdutos");
const secaoEdicaoProduto = document.querySelector("#secaoEdicaoProduto");
const formEdicaoProduto = document.querySelector("#formEdicaoProduto");
const elementoId = document.querySelector("#id");
const campoNovoNome = document.querySelector("#novoNome");
const campoNovoTipo = document.querySelector("#novoTipo");
const campoNovoPreco = document.querySelector("#novoPreco");
const botaoCancelarEdicao = document.querySelector("#botaoCancelarEdicao");

const carregarProdutos = () => {
  const url = "php/consultarProdutos.php";
  const opcoes = { method: "GET" };

  fetch(url, opcoes)
    .then((resposta) => {
      if (!resposta.ok) {
        throw new Error(resposta.statusText);
      }

      return resposta.json();
    })
    .then((dados) => {
      if (dados.hasOwnProperty("erro")) {
        localStorage.setItem("mensagem", dados.erro);
        window.location.href = "index.html";
      } else {
        dados[0].forEach((produto) => {
          const template = document.createElement("template");
          const idProduto = produto.idProduto;
          const nomeProduto = produto.nomeProduto;
          const tipoProduto = produto.tipoProduto;
          const precoProduto = Number(produto.precoProduto).toLocaleString(
            "pt-BR",
            { style: "currency", currency: "BRL" }
          );
          const linhaTabela = `<tr>
                                            <td>${idProduto}</td>
                                            <td>${nomeProduto}</td>
                                            <td>${tipoProduto}</td>
                                            <td>${precoProduto}</td>
                                            <td>
                                                <i class="bi bi-pencil-fill"></i>
                                            </td>
                                            <td>
                                                <i class="bi bi-trash-fill"></i>
                                            </td>
                                         </tr>`;

          template.innerHTML = linhaTabela;

          const clone = template.content.cloneNode(true);
          corpoTabelaProdutos.appendChild(clone);
        });
      }
    })
    .catch((erro) => {
      localStorage.setItem("mensagem", erro);
      window.location.href = "index.html";
    });
};

const pesquisarProdutos = () => {
  const pesquisa = campoPesquisa.value.trim().toLowerCase();
  const containerTabelaProdutos = document.querySelector(
    "#containerTabelaProdutos"
  );
  const linhasTabela = corpoTabelaProdutos.querySelectorAll("tr");
  const semPesquisa = document.querySelector("#semPesquisa");
  let temPesquisa = false;

  if (linhasTabela.length > 0) {
    linhasTabela.forEach((linhaTabela) => {
      const textoLinhaTabela = linhaTabela.innerText.trim().toLowerCase();

      if (textoLinhaTabela.includes(pesquisa)) {
        linhaTabela.style.display = "table-row";
        temPesquisa = true;
      } else {
        linhaTabela.style.display = "none";
      }
    });

    if (!temPesquisa) {
      containerTabelaProdutos.style.display = "none";
      semPesquisa.style.display = "block";
    } else {
      containerTabelaProdutos.style.display = "block";
      semPesquisa.style.display = "none";
    }
  }
};

const prepararEdicao = (iconeEditar) => {
  const linhaTabela = iconeEditar.closest("tr");
  const celulaId = linhaTabela.querySelectorAll("td")[0];
  const celulaNome = linhaTabela.querySelectorAll("td")[1];
  const celulaTipo = linhaTabela.querySelectorAll("td")[2];
  const celulaPreco = linhaTabela.querySelectorAll("td")[3];

  elementoId.value = celulaId.innerText;
  campoNovoNome.value = celulaNome.innerText;

  switch (celulaTipo.innerText) {
    case "Aperitivo":
      campoNovoTipo.value = "aperitivo";
      break;
    case "Prato Principal":
      campoNovoTipo.value = "pratoPrincipal";
      break;
    case "Sobremesa":
      campoNovoTipo.value = "sobremesa";
      break;
    case "Bebida":
      campoNovoTipo.value = "bebida";
  }

  let preco = Number(celulaPreco.innerText.replace("R$", "").replace(",", "."));

  if (!Number.isInteger(preco)) {
    preco = Number(preco).toFixed(2);
  }

  campoNovoPreco.value = preco;
  secaoConsultaProdutos.style.display = "none";
  secaoEdicaoProduto.style.display = "flex";
};

const deletarProduto = (iconeDeletar) => {
  const linhaTabela = iconeDeletar.closest("tr");
  const celulaId = linhaTabela.querySelectorAll("td")[0];
  const dados = { idProduto: celulaId.innerText };
  const url = "php/deletarProduto.php";
  const opcoes = {
    method: "POST",
    header: { "Content-Type": "application/json" },
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
      if (dados.hasOwnProperty("erro")) {
        abrirModal(dados.erro);
      } else {
        linhaTabela.remove();

        if (corpoTabelaProdutos.innerHTML === "") {
          localStorage.setItem("mensagem", dados.sucesso);
          window.location.href = "index.html";
        } else {
          abrirModal(dados.sucesso);
        }
      }
    })
    .catch((erro) => abrirModal(erro));
};

const detectarCliqueTabela = (e) => {
  if (e.target.classList.contains("bi-pencil-fill")) {
    prepararEdicao(e.target);
  }

  if (e.target.classList.contains("bi-trash-fill")) {
    deletarProduto(e.target);
  }
};

const ocultarSecaoEdicaoProduto = () => {
  elementoId.value = "";
  campoNovoNome.value = "";
  campoNovoTipo.value = "";
  campoNovoPreco.value = "";
  secaoEdicaoProduto.style.display = "none";
  secaoConsultaProdutos.style.display = "flex";
};

const editarProduto = (id, novoNome, novoTipo, novoPreco) => {
  const dados = {
    idProduto: id,
    nomeProduto: novoNome,
    tipoProduto: novoTipo,
    precoProduto: novoPreco,
  };
  const url = "php/editarProduto.php";
  const opcoes = {
    method: "POST",
    header: { "Content-Type": "application/json" },
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
      if (dados.hasOwnProperty("erro")) {
        abrirModal(dados.erro);
      } else {
        const linhasTabela = corpoTabelaProdutos.querySelectorAll("tr");

        if (linhasTabela.length > 0) {
          linhasTabela.forEach((linhaTabela) => {
            const celulaId = linhaTabela.querySelectorAll("td")[0];

            if (celulaId.innerText === id) {
              const celulaNome = linhaTabela.querySelectorAll("td")[1];
              const celulaTipo = linhaTabela.querySelectorAll("td")[2];
              const celulaPreco = linhaTabela.querySelectorAll("td")[3];

              celulaNome.innerText = novoNome;

              switch (novoTipo) {
                case "aperitivo":
                  celulaTipo.innerText = "Aperitivo";
                  break;
                case "pratoPrincipal":
                  celulaTipo.innerText = "Prato Principal";
                  break;
                case "sobremesa":
                  celulaTipo.innerText = "Sobremesa";
                  break;
                case "bebida":
                  celulaTipo.innerText = "Bebida";
              }

              celulaPreco.innerText = Number(novoPreco).toLocaleString(
                "pt-BR",
                { style: "currency", currency: "BRL" }
              );
            }
          });

          abrirModal(dados.sucesso);
        }
      }
    })
    .catch((erro) => abrirModal(erro));

  ocultarSecaoEdicaoProduto();
};

const validarFormularioEdicao = (e) => {
  e.preventDefault();

  const id = elementoId.value.trim();
  const novoNome = campoNovoNome.value.trim();
  const novoTipo = campoNovoTipo.value.trim();
  const novoPreco = campoNovoPreco.value.trim();

  if (!id || isNaN(id) || id < 1) {
    abrirModal(
      "O ID do produto é obrigatório e deve ser válido. Valores aceitos: Números a partir de 1."
    );
    ocultarSecaoEdicaoProduto();
    return;
  }

  if (!novoNome || novoNome.length > 30) {
    abrirModal(
      "O novo nome do produto é obrigatório e deve conter até 30 caracteres."
    );
    ocultarSecaoEdicaoProduto();
    return;
  }

  switch (novoTipo) {
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
        'O novo tipo do produto é obrigatório e deve ser válido. Valores aceitos: "Aperitivo", "Prato Principal", "Sobremesa", "Bebida".'
      );
      ocultarSecaoEdicaoProduto();
      return;
  }

  if (!novoPreco || isNaN(novoPreco) || novoPreco < 1 || novoPreco > 999.99) {
    abrirModal(
      "O novo preço do produto é obrigatório e deve ser válido. Valores aceitos: Números de 1 a 999,99."
    );
    ocultarSecaoEdicaoProduto();
    return;
  }

  editarProduto(id, novoNome, novoTipo, novoPreco);
};

document.addEventListener("DOMContentLoaded", carregarProdutos);
campoPesquisa.addEventListener("input", pesquisarProdutos);
corpoTabelaProdutos.addEventListener("click", detectarCliqueTabela);
formEdicaoProduto.addEventListener("submit", validarFormularioEdicao);
botaoCancelarEdicao.addEventListener("click", ocultarSecaoEdicaoProduto);
