const fade = document.querySelector("#fade");
const mensagemModal = document.querySelector("#mensagemModal");
const botaoFecharModal = document.querySelector("#botaoFecharModal");

const abrirModal = (mensagem) => {
  mensagemModal.innerText = mensagem;
  fade.style.display = "flex";
};

const exibirMensagem = () => {
  const mensagem = localStorage.getItem("mensagem");

  if (mensagem) {
    abrirModal(mensagem);
    localStorage.removeItem("mensagem");
  }
};

const definirDataAtual = () => {
  const elementoDataAtual = document.querySelector("#dataAtual");
  const dataAtual = new Date();
  const anoAtual = dataAtual.getFullYear();

  elementoDataAtual.innerText = anoAtual;
};

const fecharModal = () => {
  mensagemModal.innerText = "";
  fade.style.display = "none";
};

const detectarClique = (e) => {
  if (e.target === fade) {
    fecharModal();
  }
};

const detectarTecla = (e) => {
  if (e.key === "Escape") {
    fecharModal();
  }
};

document.addEventListener("DOMContentLoaded", exibirMensagem);
document.addEventListener("DOMContentLoaded", definirDataAtual);
document.addEventListener("click", detectarClique);
document.addEventListener("keyup", detectarTecla);
botaoFecharModal.addEventListener("click", fecharModal);
