const formulario = document.querySelector("#formulario");

formulario.addEventListener("submit", function(e){
    e.preventDefault();
    const campoNome = document.querySelector("#campoNome");
    const campoTipo = document.querySelector("#campoTipo");
    const campoPreco = document.querySelector("#campoPreco");
    const nome = campoNome.value.trim();
    const preco = campoPreco.value.trim();

    if(!nome){
        alternarModal("O nome do produto é obrigatório.");
        return;
    }

    if(nome.length > 30){
        alternarModal("O nome do produto deve ter até 30 caracteres.");
        campoNome.value = "";
        return;
    }

    if(campoTipo.selectedIndex === 0){
        alternarModal("Selecione o tipo do produto.");
        return;
    }

    if(!preco){
        alternarModal("O preço do produto é obrigatório.");
        return;
    }

    if(isNaN(preco)){
        alternarModal("O preço do produto deve ser um número.");
        campoPreco.value = "";
        return;
    }

    if(preco < 1 || preco > 999.99){
        alternarModal("O preço do produto deve estar entre 1 e 999,99.");
        campoPreco.value = "";
        return;
    }

    formulario.submit();
});