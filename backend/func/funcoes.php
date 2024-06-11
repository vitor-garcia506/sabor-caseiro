<?php 
    function sanitizarValores($valor){
        $valor = trim($valor);
        $valor = htmlspecialchars($valor);
        $valor = stripslashes($valor);
        return $valor;
    }

    function validarDados($nome, $tipo, $preco){
        if(empty($nome)){
            return array("O nome do produto é obrigatório.", null);
        }

        if(strlen($nome) > 30){
            return array("O nome do produto deve ter até 30 caracteres.", "nome");
        }

        if(empty($tipo)){
            return array("Selecione o tipo do produto.", "tipo");
        }

        if(empty($preco) && $preco !== "0"){
            return array("O preço do produto é obrigatório.", null);
        }

        if(!is_numeric($preco)){
            return array("O preço do produto deve ser um número.", "preco");
        }

        if($preco < 1 || $preco > 999.99){
            return array("O preço do produto deve estar entre 1 e 999,99.", "preco");
        }

        return array("Sucesso", null);
    }

    function selecionarTipo($tipo){
        $tipos = array("aperitivo" => "", "pratoPrincipal" => "", "sobremesa" => "", "bebida" => "");

        switch($tipo){
            case "aperitivo":
            case "Aperitivo":
                $tipos["aperitivo"] = "selected";
                break;
            case "pratoPrincipal":
            case "Prato Principal":
                $tipos["pratoPrincipal"] = "selected";
                break;
            case "sobremesa":
            case "Sobremesa":
                $tipos["sobremesa"] = "selected";
                break;
            case "bebida":
            case "Bebida":
                $tipos["bebida"] = "selected";
                break;
        }

        return $tipos;
    }

    function formatarTipo($tipo){
        switch($tipo){
            case "aperitivo":
                $tipo = "Aperitivo";
                break;
            case "pratoPrincipal":
                $tipo = "Prato Principal";
                break;
            case "sobremesa":
                $tipo = "Sobremesa";
                break;
            case "bebida":
                $tipo = "Bebida";
                break;
        }

        return $tipo;
    }

    function formatarPreco($preco){
        return (float) str_replace(",", "", number_format($preco, 2));
    }

    function conectarBanco($servidor, $usuario, $senha, $nomeBanco){
        try{
            $conexao = new PDO("mysql:host=$servidor;dbname=$nomeBanco", $usuario, $senha);
            $conexao->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            return $conexao;
        }catch(PDOException $e){
            error_log("Erro de conexão com o banco: " . $e->getMessage(), 0);
            return "Erro de conexão com o banco.";
        }
    }

    function verificarCadastroProduto($conexao, $nome, $tipo){
        try{
            $stmt = $conexao->prepare("CALL verificarCadastroProduto(?, ?)");
            $stmt->execute(array($nome, $tipo));

            if($stmt->rowCount() > 0){
                return "Está cadastrado";
            }else{
                return "Não está cadastrado";
            }
        }catch(PDOException $e){
            error_log("Erro ao verificar cadastro do produto: " . $e->getMessage(), 0);
            return "Erro ao verificar cadastro do produto.";
        }
    }

    function validarRedirecionamento($id, $destino){
        if(empty($id) || !is_numeric($id) || $id < 1){
            return "Produto inexistente.";
        }

        if(empty($destino)){
            return "Destino inexistente.";
        }

        return "Sucesso";
    }
?>