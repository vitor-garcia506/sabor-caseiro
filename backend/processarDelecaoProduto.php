<?php 
    session_start();
    require_once "func/funcoes.php";
    $id = $_SESSION["id"];
    $servidor = "localhost";
    $usuario = "root";
    $senha = "";
    $nomeBanco = "saborCaseiro";
    $conectarBanco = conectarBanco($servidor, $usuario, $senha, $nomeBanco);

    if(is_object($conectarBanco)){
        try{
            $stmt = $conectarBanco->prepare("CALL deletarProduto(?)");
            $stmt->execute(array($id));
            unset($_SESSION["id"]);
            $_SESSION["mensagemConclusao"] = "Produto deletado com sucesso.";
            header("Location: index.php");
            exit;
        }catch(PDOException $e){
            error_log("Erro ao deletar produto: " . $e->getMessage(), 0);
            unset($_SESSION["id"]);
            $_SESSION["mensagemConclusao"] = "Erro ao deletar produto.";
            header("Location: index.php");
            exit;
        }
    }else{
        unset($_SESSION["id"]);
        $_SESSION["mensagemConclusao"] = $conectarBanco;
        header("Location: index.php");
        exit;
    }
?>