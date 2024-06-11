<?php 
    session_start();
    require_once "func/funcoes.php";
    $nome = $tipo = $preco = "";
    $aperitivoSelecionado = $pratoPrincipalSelecionado = $sobremesaSelecionado = $bebidaSelecionado = "";
    $mensagemConclusao = $classeAtivo = "";

    if(isset($_REQUEST["cadastrarProduto"])){
        $nome = sanitizarValores($_REQUEST["nome"] ?? "");
        $tipo = sanitizarValores($_REQUEST["tipo"] ?? "");
        $preco = sanitizarValores($_REQUEST["preco"] ?? "");
        $validarDados = validarDados($nome, $tipo, $preco);

        if($validarDados[0] === "Sucesso"){
            $_SESSION["nome"] = $nome;
            $_SESSION["tipo"] = $tipo;
            $_SESSION["preco"] = $preco;
            header("Location: processarCadastroProduto.php");
            exit;
        }else{
            $mensagemConclusao = $validarDados[0];
            $classeAtivo = "class=\"ativo\"";

            switch($validarDados[1]){
                case "nome":
                    $nome = "";
                    break;
                case "tipo":
                    $tipo = "";
                    break;
                case "preco":
                    $preco = "";
                    break;
            }
            
            $tipoSelecionado = selecionarTipo($tipo);
            $aperitivoSelecionado = $tipoSelecionado["aperitivo"];
            $pratoPrincipalSelecionado = $tipoSelecionado["pratoPrincipal"];
            $sobremesaSelecionado = $tipoSelecionado["sobremesa"];
            $bebidaSelecionado = $tipoSelecionado["bebida"];
        }
    }

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
    <title>Sabor Caseiro - Início</title>
    <link rel="stylesheet" href="css/principal.css">
    <link rel="stylesheet" href="css/formularios.css">
    <link rel="shortcut icon" href="img/favicon.ico" type="image/x-icon">
    <script src="js/principal.js" defer></script>
    <script src="js/validarFormularios.js" defer></script>
</head>
<body>
    <?php require_once "templates/cabecalho.php"; ?>
    <nav class="navegacao">
        <div id="areaLinksNavegacao">
            <a href="consultarProdutos.php" class="linkNavegacao">
                <i class="bi bi-search"></i> Consultar Produtos
            </a>
        </div>
        <i class="bi bi-list" id="iconeMenu"></i>
    </nav>
    <main class="conteudoPrincipal">
        <h2 class="tituloConteudoPrincipal">
            Cadastre um Produto <i class="bi bi-plus-square"></i>
        </h2>
        <form action="<?php echo htmlspecialchars($_SERVER["PHP_SELF"]); ?>" method="post" id="formulario">
            <div class="areaEntradaDados">
                <label for="campoNome" class="rotulo">
                    Nome: <span class="campoObrigatorio">*</span>
                </label>
                <input type="text" name="nome" id="campoNome" class="campoEntradaDados" placeholder="Informe o nome do produto" value="<?php echo $nome; ?>" maxlength="30" required>
            </div>
            <div class="areaEntradaDados">
                <label for="campoTipo" class="rotulo">
                    Tipo: <span class="campoObrigatorio">*</span>
                </label>
                <select name="tipo" id="campoTipo" class="campoEntradaDados" required>
                    <option value="" class="opcaoTipo">Selecione uma opção</option>
                    <option value="aperitivo" class="opcaoTipo" <?php echo $aperitivoSelecionado; ?>>Aperitivo</option>
                    <option value="pratoPrincipal" class="opcaoTipo" <?php echo $pratoPrincipalSelecionado; ?>>Prato Principal</option>
                    <option value="sobremesa" class="opcaoTipo" <?php echo $sobremesaSelecionado; ?>>Sobremesa</option>
                    <option value="bebida" class="opcaoTipo" <?php echo $bebidaSelecionado; ?>>Bebida</option>
                </select>
            </div>
            <div class="areaEntradaDados">
                <label for="campoPreco" class="rotulo">
                    Preço: <span class="campoObrigatorio">*</span>
                </label>
                <input type="number" name="preco" id="campoPreco" class="campoEntradaDados" placeholder="Informe o preço do produto" <?php echo $preco; ?> min="1" max="999.99" step=".01" required>
            </div>
            <input type="hidden" name="cadastrarProduto">
            <button type="submit" class="botaoEnvio">
                Cadastrar <i class="bi bi-plus-square"></i>
            </button>
        </form>
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