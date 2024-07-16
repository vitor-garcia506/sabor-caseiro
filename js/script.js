const fade = document.querySelector("#fade");
const secaoModal = document.querySelector("#secaoModal");
const mensagemModal = document.querySelector("#mensagemModal");
const botaoFecharModal = document.querySelector("#botaoFecharModal");

const abrirModal = (mensagem) => {
  mensagemModal.innerText = mensagem;
  fade.style.opacity = "1";
  fade.style.pointerEvents = "all";
  secaoModal.style.top = "50%";
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

const ocultarFade = (e) => {
  e.currentTarget.removeEventListener("transitionend", ocultarFade);
  fade.style.opacity = "0";
  fade.style.pointerEvents = "none";
};

const fecharModal = () => {
  secaoModal.style.top = "-100%";
  secaoModal.addEventListener("transitionend", ocultarFade);
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

window.addEventListener("load", exibirMensagem);
window.addEventListener("load", definirDataAtual);
document.addEventListener("click", detectarClique);
document.addEventListener("keyup", detectarTecla);
botaoFecharModal.addEventListener("click", fecharModal);
