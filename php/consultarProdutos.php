<?php
header("Content-Type: application/json");

require_once "funcoes.php";

if ($_SERVER["REQUEST_METHOD"] === "GET") {
    $pdo = efetuarConexao();

    try {
        $stmt = $pdo->prepare("select * from viewProdutos");

        $stmt->execute();

        if ($stmt->rowCount() > 0) {
            echo json_encode(array($stmt->fetchAll(PDO::FETCH_ASSOC)));
        } else {
            echo json_encode(array("erro" => "Não existem produtos cadastrados."));
        }
    } catch (PDOException $e) {
        echo json_encode(array("erro" => $e->getMessage()));
    }
} else {
    http_response_code(405);
    echo json_encode(array("erro" => "Método de requisição não permitido."));
}
