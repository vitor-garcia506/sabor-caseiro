const iconeMenu = document.querySelector("#iconeMenu");
const areaModal = document.querySelector("#areaModal");
const botaoFecharModal = document.querySelector("#botaoFecharModal");

window.addEventListener("click", function(e){
    if(e.target === areaModal){
        alternarModal("");
    }
});

window.addEventListener("keyup", function(e){
    if(e.key === "Escape"){
        alternarModal("");
    }
});

iconeMenu.addEventListener("click", function(){
    const areaLinksNavegacao = document.querySelector("#areaLinksNavegacao");
    areaLinksNavegacao.classList.toggle("ativo");
    this.classList.toggle("bi-list");
    this.classList.toggle("bi-x");
});

botaoFecharModal.addEventListener("click", function(){
    alternarModal("");
});

function alternarModal(mensagem){
    const mensagemModal = document.querySelector("#mensagemModal");
    mensagemModal.textContent = mensagem;
    areaModal.classList.toggle("ativo");
}