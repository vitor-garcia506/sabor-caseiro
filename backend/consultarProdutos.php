<?php 
    session_start();
    $mensagemConclusao = $classeAtivo = "";

    if(isset($_SESSION["mensagemConclusao"])){
        $mensagemConclusao = $_SESSION["mensagemConclusao"];
        $classeAtivo = "class=\"ativo\"";
        unset($_SESSION["mensagemConclusao"]);
    }
?>
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Sabor Caseiro - Consulte os Produtos</title>
    <link rel="stylesheet" href="css/principal.css">
    <link rel="stylesheet" href="css/consultarProdutos.css">
    <link rel="shortcut icon" href="img/favicon.ico" type="image/x-icon">
    <script src="js/principal.js" defer></script>
    <script src="js/consultarProdutos.js" defer></script>
</head>
<body> 
    <?php require_once "templates/cabecalho.php"; ?> 
    <nav class="navegacao">
        <div id="areaLinksNavegacao">
            <a href="index.php" class="linkNavegacao">
                <i class="bi bi-plus-square"></i> Cadastrar Produto
            </a>
        </div>
        <i class="bi bi-list" id="iconeMenu"></i>
    </nav>
    <main class="conteudoPrincipal">
        <h2 class="tituloConteudoPrincipal">
            Consulte os Produtos <i class="bi bi-search"></i>
        </h2>
        <div class="areaEntradaDados">
            <label for="campoPesquisa" class="rotulo">Pesquisar:</label>
            <input type="search" id="campoPesquisa" class="campoEntradaDados" placeholder="Informe o nome, tipo ou preço do produto">
        </div>
        <div class="areaTabelaProdutos">
            <?php require_once "templates/tabelaProdutos.php"; ?>
            <p id="semResultados">Sem resultados.</p>
        </div>
    </main>
    <div id="areaModal" <?php echo $classeAtivo; ?>>
        <div class="modal">
            <p id="mensagemModal">
                <?php echo $mensagemConclusao; ?>
            </p>
            <button type="button" id="botaoFecharModal">
                Fechar <i class="bi bi-x-square"></i>
            </button>
        </div>
    </div>
    <?php require_once "templates/rodape.php"; ?>
</body>
</html>