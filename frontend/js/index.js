// Elementos e variáveis
const formCadastrarProduto = document.querySelector("#formCadastrarProduto")
const elNome = document.querySelector("#nome")
const elTipo = document.querySelector("#tipo")
const elPreco = document.querySelector("#preco")

// Funções

// Função que valida o formulário
function validarForm(event){
    event.preventDefault()

    const nome = elNome.value.trim()
    const tipo = elTipo.value.trim()
    const preco = elPreco.value.trim()

    if(!nome || nome.length > 30){ // Verifica se nome não foi informado ou se possui mais de 30 caracteres
        abrirModal("O nome do produto é obrigatório e deve conter até 30 caracteres.")
        elNome.value = ""
        return
    }

    switch(tipo){ // Verifica se tipo não foi informado ou é inválido
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
                "O tipo do produto é obrigatório e deve ser válido. Valores válidos são \"Aperitivo\", \"Prato Principal\", \"Sobremesa\" e \"Bebida\"."
            )
            elTipo.value = ""
            return
    }

    if(!preco || isNaN(preco) || preco < 1 || preco > 999.99){ // Verifica se preço não foi informado ou se é inválido
        abrirModal("O preço do produto é obrigatório e deve ser válido. Valores válidos são números de 1 a 999,99.")
        elPreco.value = ""
        return
    }

    elNome.value = ""
    elTipo.value = ""
    elPreco.value = ""
}

// Eventos
formCadastrarProduto.addEventListener("submit", validarForm)