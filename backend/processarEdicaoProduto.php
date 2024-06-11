<?php 
    session_start();
    require_once "func/funcoes.php";

    if(isset($_SESSION["nome"]) && isset($_SESSION["tipo"]) && isset($_SESSION["preco"])){
        $id = $_SESSION["id"];
        $nome = $_SESSION["nome"];
        $tipo = formatarTipo($_SESSION["tipo"]);
        $preco = formatarPreco($_SESSION["preco"]);
        unset($_SESSION["nome"]);
        unset($_SESSION["tipo"]);
        unset($_SESSION["preco"]);
        $servidor = "localhost";
        $usuario = "root";
        $senha = "";
        $nomeBanco = "saborCaseiro";
        $conectarBanco = conectarBanco($servidor, $usuario, $senha, $nomeBanco);

        if(is_object($conectarBanco)){
            $verificarCadastroProduto = verificarCadastroProduto($conectarBanco, $nome, $tipo);

            if($verificarCadastroProduto === "Não está cadastrado"){
                try{
                    $stmt = $conectarBanco->prepare("CALL editarProduto(?, ?, ?, ?)");
                    $stmt->execute(array($nome, $tipo, $preco, $id));
                    $conectarBanco = null;
                    unset($_SESSION["id"]);
                    $_SESSION["mensagemConclusao"] = "Produto editado com sucesso.";
                    header("Location: consultarProdutos.php");
                    exit;
                }catch(PDOException $e){
                    error_log("Erro ao editar produto: " . $e->getMessage(), 0);
                    $conectarBanco = null;
                    $_SESSION["mensagemConclusao"] = "Erro ao editar produto.";
                    header("Location: editarProduto.php");
                    exit;
                }
            }elseif($verificarCadastroProduto === "Está cadastrado"){
                $conectarBanco = null;
                $_SESSION["mensagemConclusao"] = "Produto já cadastrado.";
                header("Location: editarProduto.php");
                exit;
            }else{
                $conectarBanco = null;
                $_SESSION["mensagemConclusao"] = $verificarCadastroProduto;
                header("Location: editarProduto.php");
                exit;
            }
        }else{
            unset($_SESSION["id"]);
            $_SESSION["mensagemConclusao"] = $conectarBanco;
            header("Location: index.php");
            exit;
        }
    }else{
        unset($_SESSION["id"]);
        $_SESSION["mensagemConclusao"] = "Erro ao enviar os dados.";
        header("Location: index.php");
        exit;
    }
?>