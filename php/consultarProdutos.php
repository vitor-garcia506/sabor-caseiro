<?php
require_once "funcoes.php";

if ($_SERVER["REQUEST_METHOD"] === "GET") {
    $pdo = efetuarConexao();

    try {
        $stmt = $pdo->prepare("select * from viewProdutos");

        $stmt->execute();

        if ($stmt->rowCount() > 0) {
            echo json_encode(array($stmt->fetchAll(PDO::FETCH_ASSOC)));
            exit;
        } else {
            echo json_encode(array("erro" => "Não existem produtos cadastrados."));
            exit;
        }
    } catch (PDOException $e) {
        echo json_encode(array("erro" => $e->getMessage()));
        exit;
    }
} else {
    http_response_code(405);
    echo json_encode(array("erro" => "Método de requisição não permitido."));
    exit;
}