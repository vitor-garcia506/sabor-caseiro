const iconeMenu = document.querySelector("#iconeMenu");
const fade = document.querySelector("#fade");
const mensagemModal = document.querySelector("#mensagemModal");
const botaoFecharModal = document.querySelector("#botaoFecharModal");

const fecharModal = () => {
  mensagemModal.textContent = "";
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

const alternarNav = (e) => {
  const listaLinksNav = document.querySelector("#listaLinksNav");

  listaLinksNav.classList.toggle("ativo");
  e.target.classList.toggle("bi-list");
  e.target.classList.toggle("bi-x");
};

const abrirModal = (mensagem) => {
  mensagemModal.textContent = mensagem;
  fade.style.display = "flex";
};

document.addEventListener("click", detectarClique);
document.addEventListener("keyup", detectarTecla);
iconeMenu.addEventListener("click", alternarNav);
botaoFecharModal.addEventListener("click", fecharModal);
