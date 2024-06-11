<?php 
    session_start();
    require_once "func/funcoes.php";

    if(isset($_REQUEST["id"]) && isset($_REQUEST["destino"])){
        $id = sanitizarValores($_REQUEST["id"] ?? "");
        $destino = sanitizarValores($_REQUEST["destino"] ?? "");
        $validarRedirecionamento = validarRedirecionamento($id, $destino);

        if($validarRedirecionamento === "Sucesso"){
            $_SESSION["id"] = (int) $id;
            header("Location: $destino");
            exit;
        }else{
            $_SESSION["mensagemConclusao"] = $validarRedirecionamento;
            header("Location: consultarProdutos.php");
            exit;
        }
    }
?>