<?php
header("Content-Type: application/json");

require_once "funcoes.php";

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $dados = json_decode(file_get_contents("php://input"), true);

    if (!$dados) {
        http_response_code(400);
        echo json_encode(array("erro" => "Não foi possível enviar/decodificar os dados."));
        exit;
    }

    $id = sanitizarValor($dados["idProduto"]);
    $nome = sanitizarValor($dados["nomeProduto"]);
    $tipo = sanitizarValor($dados["tipoProduto"]);
    $preco = sanitizarValor($dados["precoProduto"]);

    validarId($id);

    if (empty($nome) || strlen($nome) > 30) {
        echo json_encode(array("erro" => "O novo nome do produto é obrigatório e deve conter até 30 caracteres."));
        exit;
    }

    switch ($tipo) {
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
        default:
            echo json_encode(array("erro" => "O novo tipo do produto é obrigatório e deve ser válido. Valores aceitos: \"Aperitivo\", \"Prato Principal\", \"Sobremesa\", \"Bebida\"."));
            exit;
    }

    if (empty($preco) && $preco !== "0" || !is_numeric($preco) || $preco < 1 || $preco > 999.99) {
        echo json_encode(array("erro" => "O novo preço do produto é obrigatório e deve ser válido. Valores aceitos: Números de 1 a 999,99."));
        exit;
    }

    $id = (int) $id;
    $preco = number_format((float) $preco, 2, ".", "");
    $pdo = efetuarConexao();

    verificarProdutoCadastrado($pdo, $nome, $tipo);

    try {
        $stmt = $pdo->prepare("call procEditarProduto(:id, :nome, :tipo, :preco)");

        $stmt->execute(array(":id" => $id, ":nome" => $nome, ":tipo" => $tipo, ":preco" => $preco));
        echo json_encode(array("sucesso" => "Produto editado com sucesso."));
        exit;
    } catch (PDOException $e) {
        echo json_encode(array("erro" => $e->getMessage()));
        exit;
    }
} else {
    http_response_code(405);
    echo json_encode(array("erro" => "Método de requisição não permitido."));
    exit;
}
