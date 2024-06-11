<?php 
    require_once "func/funcoes.php";
    $sevidor = "localhost";
    $usuario = "root";
    $senha = "";
    $nomeBanco = "saborCaseiro";
    $conectarBanco = conectarBanco($sevidor, $usuario, $senha, $nomeBanco);

    if(is_object($conectarBanco)){
        $stmt = $conectarBanco->prepare("SELECT * FROM viewProdutos");
        $stmt->execute();

        if($stmt->rowCount() === 0){
            $_SESSION["mensagemConclusao"] = "Não existem produtos cadastrados.";
            header("Location: index.php");
            exit;
        }
    }else{
        $_SESSION["mensagemConclusao"] = $conectarBanco;
        header("Location: index.php");
        exit;
    }
?>
    <table id="tabelaProdutos">
        <thead class="cabecalhoTabela">
            <tr class="linhaTabela">
                <th class="tituloTabela">Nome</th>
                <th class="tituloTabela">Tipo</th>
                <th class="tituloTabela">Preço</th>
                <th class="tituloTabela">Editar</th>
                <th class="tituloTabela">Deletar</th>
            </tr>
        </thead>
        <tbody id="corpoTabela">
<?php 
    while($linha = $stmt->fetch()):
        $id = $linha["idProduto"];
        $nome = $linha["nomeProduto"];
        $tipo = $linha["tipoProduto"];
        $preco = "R$ " . number_format($linha["precoProduto"], 2, ",", ".");
        $urlEditarProduto = "definirSessaoId.php?id=$id&destino=editarProduto.php";
        $urlDeletarProduto = "definirSessaoId.php?id=$id&destino=processarDelecaoProduto.php";
?>
            <tr class="linhaTabela">
                <td class="dadoTabela">
                    <?php echo $nome; ?>
                </td>
                <td class="dadoTabela">
                    <?php echo $tipo; ?>
                </td>
                <td class="dadoTabela">
                    <?php echo $preco; ?>
                </td>
                <td class="dadoTabela">
                    <a href="<?php echo $urlEditarProduto; ?>" class="linkEditarProduto">
                        <i class="bi bi-pencil-fill"></i>
                    </a>
                </td>
                <td class="dadoTabela">
                    <a href="<?php echo $urlDeletarProduto; ?>" class="linkDeletarProduto">
                        <i class="bi bi-trash-fill"></i>
                    </a>
                </td>
            </tr>
<?php 
    endwhile;
?>
        </tbody>
    </table>
