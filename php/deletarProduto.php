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

    validarId($id);

    $pdo = efetuarConexao();

    try {
        $stmt = $pdo->prepare("call procDeletarProduto(:id)");

        $stmt->execute(array(":id" => $id));
        echo json_encode(array("sucesso" => "Produto deletado com sucesso."));
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
