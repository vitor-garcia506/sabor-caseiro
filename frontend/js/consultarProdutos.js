const campoPesquisa = document.querySelector("#campoPesquisa");

campoPesquisa.addEventListener("input", function(){
    const pesquisa = this.value.trim().toLowerCase();
    const tabelaProdutos = document.querySelector("#tabelaProdutos");
    const linhasTabela = document.querySelectorAll("#corpoTabela .linhaTabela");
    const semResultados = document.querySelector("#semResultados");
    let tabelaTemPesquisa = false;

    linhasTabela.forEach(function(linhaTabela){
        const textoLinhaTabela = linhaTabela.textContent.trim().toLowerCase();

        if(textoLinhaTabela.includes(pesquisa)){
            linhaTabela.style.display = "table-row";
            tabelaTemPesquisa = true;
        }else{
            linhaTabela.style.display = "none";
        }
    });

    if(!tabelaTemPesquisa){
        tabelaProdutos.style.display = "none";
        semResultados.style.display = "block";
    }else{
        tabelaProdutos.style.display = "table";
        semResultados.style.display = "none";
    }
});