// Elementos e variáveis
const secaoConsultarProdutos = document.querySelector("#secaoConsultarProdutos")
const elPesquisa = document.querySelector("#pesquisa")
const areaTabelaProdutos = document.querySelector("#areaTabelaProdutos")
const corpoTabelaProdutos = document.querySelector("#corpoTabelaProdutos")
const linhaTabelaProdutos = document.querySelectorAll("#corpoTabelaProdutos tr")
const semPesquisa = document.querySelector("#semPesquisa")
const secaoEditarProduto = document.querySelector("#secaoEditarProduto")
const formEditarProduto = document.querySelector("#formEditarProduto")
const elId = document.querySelector("#id")
const elNovoNome = document.querySelector("#novoNome")
const elNovoPreco = document.querySelector("#novoPreco")
const elNovoTipo = document.querySelector("#novoTipo")

// Funções

// Função que pesquisa um ou mais produtos
function pesquisarProdutos(event){
    const pesquisa = event.target.value.trim().toLowerCase()
    let temPesquisa = false

    if(linhaTabelaProdutos.length > 0){ // Verifica se existem linhas na tabela de produtos
        linhaTabelaProdutos.forEach(function(linhaTabelaProdutos){
            const textoLinhaTabelaProdutos = linhaTabelaProdutos.innerText.trim().toLowerCase()

            if(textoLinhaTabelaProdutos.includes(pesquisa)){ // Verifica se linha da tabela de produtos contém a pesquisa
                linhaTabelaProdutos.style.display = "table-row"
                temPesquisa = true
            }else{
                linhaTabelaProdutos.style.display = "none"
            }
        })

        if(!temPesquisa){ // Verifica se tabela contém a pesquisa
            areaTabelaProdutos.style.display = "none"
            semPesquisa.style.display = "block"
        }else{
            areaTabelaProdutos.style.display = "block"
            semPesquisa.style.display = "none"
        }
    }
}

// Função que prepara a edição de um produto
function prepararEditarProduto(iconeEditarProduto){
    const linhaTabelaProdutos = iconeEditarProduto.closest("tr")
    const celulaId = linhaTabelaProdutos.querySelectorAll("td")[0]
    const celulaNome = linhaTabelaProdutos.querySelectorAll("td")[1]
    const celulaTipo = linhaTabelaProdutos.querySelectorAll("td")[2]
    const celulaPreco = linhaTabelaProdutos.querySelectorAll("td")[3]

    elId.value = celulaId.innerText
    elNovoNome.value = celulaNome.innerText

    let tipo = null

    switch(celulaTipo.innerText){ // Verifica como tipo está formatado
        case "Aperitivo":
            tipo = "aperitivo"
            break
        case "Prato Principal":
            tipo = "pratoPrincipal"
            break
        case "Sobremesa":
            tipo = "sobremesa"
            break
        case "Bebida":
            tipo = "bebida"
            break
        default:
            break
    }

    elNovoTipo.value = tipo
    
    let preco = Number(celulaPreco.innerText.replace("R$", "").replace(",", "."))

    if(!Number.isInteger(preco)){ // Verifica se preço não é um número inteiro
        preco = preco.toFixed(2)
    }

    elNovoPreco.value = preco
    secaoConsultarProdutos.style.display = "none"
    secaoEditarProduto.style.display = "flex"
}

// Função que detecta um clique na tabela de produtos
function detectarCliqueTabProdutos(event){
    if(event.target.classList.contains("bi-pencil-fill")){ // Verifica se elemento clicado é o ícone de editar produto
        prepararEditarProduto(event.target)
    }
}

// Função que valida o formulário
function validarForm(event){
    event.preventDefault()

    const id = elId.value
    const novoNome = elNovoNome.value.trim()
    const novoTipo = elNovoTipo.value.trim()
    const novoPreco = elNovoPreco.value.trim()

    if(!id || isNaN(id) || id < 1){ // Verifica se ID não foi informado ou é inválido
        abrirModal("O ID do produto é obrigatório e deve ser válido. Valores válidos são números a partir de 1.")
        elId.value = ""
        secaoEditarProduto.style.display = "none"
        secaoConsultarProdutos.style.display = "flex"
        return
    }

    if(!novoNome || novoNome.length > 30){ // Verifica se novo nome não foi informado ou se possui mais de 30 caracteres
        abrirModal("O novo nome do produto é obrigatório e deve conter até 30 caracteres.")
        elNovoNome.value = ""
        secaoEditarProduto.style.display = "none"
        secaoConsultarProdutos.style.display = "flex"
        return
    }

    switch(novoTipo){ // Verifica se novo tipo não foi informado ou é inválido
        case "aperitivo":
            break
        case "pratoPrincipal":
            break
        case "sobremesa":
            break
        case "bebida":
            break
        default:
            abrirModal(
                "O novo tipo do produto é obrigatório e deve ser válido. Valores válidos são \"Aperitivo\", \"Prato Principal\", \"Sobremesa\" e \"Bebida\"."
            )
            elNovoTipo.value = ""
            secaoEditarProduto.style.display = "none"
            secaoConsultarProdutos.style.display = "flex"
            return
    }

    if(!novoPreco || isNaN(novoPreco) || novoPreco < 1 || novoPreco > 999.99){ // Verifica se novo preço não foi informado ou se é inválido
        abrirModal("O novo preço do produto é obrigatório e deve ser válido. Valores válidos são números de 1 a 999,99.")
        elNovoPreco.value = ""
        secaoEditarProduto.style.display = "none"
        secaoConsultarProdutos.style.display = "flex"
        return
    }

    elId.value = ""
    elNovoNome.value = ""
    elNovoTipo.value = ""
    elNovoPreco.value = ""
    secaoEditarProduto.style.display = "none"
    secaoConsultarProdutos.style.display = "flex"
}

// Eventos
elPesquisa.addEventListener("input", pesquisarProdutos)
corpoTabelaProdutos.addEventListener("click", detectarCliqueTabProdutos)
formEditarProduto.addEventListener("submit", validarForm)
