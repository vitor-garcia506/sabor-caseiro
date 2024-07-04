// Elementos e variáveis
const fundoModal = document.querySelector("#fundoModal")
const mensagemModal = document.querySelector("#mensagemModal")
const botaoFecharModal = document.querySelector("#botaoFecharModal")
const elDataAtual = document.querySelector("#dataAtual")

// Funções

// Função que define a data atual no rodapé do site
function definirDataAtual(){
    const dataAtual = new Date()
    const anoAtual = dataAtual.getFullYear()

    elDataAtual.innerText = anoAtual
}

// Função que fecha o modal
function fecharModal(){
    mensagemModal.innerText = ""
    fundoModal.style.display = "none"
}

// Função que detecta um clique na tela
function detectarClique(event){
    if(event.target === fundoModal){ // Verifica se clique foi dado no fundo do modal
        fecharModal()
    }
}

// Função que detecta se uma tecla foi pressionada
function detectarTecla(event){
    if(event.key === "Escape"){ // Verifica se tecla pressionada foi "Esc"
        fecharModal()
    }
}

// Função que abre o modal
function abrirModal(mensagem){
    mensagemModal.innerText = mensagem
    fundoModal.style.display = "flex"
}

// Eventos
document.addEventListener("DOMContentLoaded", definirDataAtual)
document.addEventListener("click", detectarClique)
document.addEventListener("keyup", detectarTecla)
botaoFecharModal.addEventListener("click", fecharModal)