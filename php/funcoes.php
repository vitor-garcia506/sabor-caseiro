<?php
function sanitizarValor($valor)
{
    $valor = trim($valor);
    $valor = htmlspecialchars($valor);
    $valor = stripslashes($valor);

    return $valor;
}

function efetuarConexao()
{
    $servidor = "localhost";
    $usuario = "root";
    $senha = "Great450@#";
    $nomeBanco = "saborCaseiro";

    try {
        $pdo = new PDO("mysql:host=$servidor;dbname=$nomeBanco", $usuario, $senha);

        $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        return $pdo;
    } catch (PDOException $e) {
        echo json_encode(array("erro" => $e->getMessage()));
        exit;
    }
}

function verificarProdutoCadastrado($pdo, $nome, $tipo)
{
    try {
        $stmt = $pdo->prepare("call procVerificarProdutoCadastrado(:nome, :tipo)");

        $stmt->execute(array(":nome" => $nome, ":tipo" => $tipo));

        if ($stmt->rowCount() > 0) {
            echo json_encode(array("erro" => "Produto já cadastrado."));
            exit;
        }
    } catch (PDOException $e) {
        echo json_encode(array("erro" => $e->getMessage()));
        exit;
    }
}

function validarId($id)
{
    if (empty($id) && $id !== "0" || !is_numeric($id) || $id < 1) {
        echo json_encode(array("erro" => "O ID do produto é obrigatório e deve ser válido. Valores aceitos: Números a partir de 1."));
        exit;
    }
}