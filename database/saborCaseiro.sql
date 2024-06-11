DROP DATABASE IF EXISTS saborCaseiro;
CREATE DATABASE saborCaseiro;
USE saborCaseiro;

DROP TABLE IF EXISTS produtos;
CREATE TABLE produtos(
    id INT AUTO_INCREMENT,
    nome VARCHAR(30) NOT NULL,
    tipo ENUM("Aperitivo", "Prato Principal", "Sobremesa", "Bebida") NOT NULL,
    preco DECIMAL(5,2) NOT NULL,
    PRIMARY KEY(id)
);

DROP VIEW IF EXISTS viewProdutos;
CREATE VIEW viewProdutos AS
SELECT id AS idProduto, nome AS nomeProduto, tipo AS tipoProduto, preco AS precoProduto
FROM produtos;

DELIMITER //

DROP PROCEDURE IF EXISTS cadastrarProduto //
CREATE PROCEDURE cadastrarProduto(IN pNome VARCHAR(30), IN pTipo ENUM("Aperitivo", "Prato Principal", "Sobremesa", "Bebida"), IN pPreco DECIMAL(5,2))
BEGIN
    INSERT INTO produtos(nome, tipo, preco) VALUES(pNome, pTipo, pPreco);
END //

DROP PROCEDURE IF EXISTS verificarCadastroProduto //
CREATE PROCEDURE verificarCadastroProduto(IN pNome VARCHAR(30), IN pTipo ENUM("Aperitivo", "Prato Principal", "Sobremesa", "Bebida"))
BEGIN
    SELECT nome AS nomeProduto, tipo AS tipoProduto
    FROM produtos
    WHERE nome = pNome AND tipo = pTipo;
END //

DROP PROCEDURE IF EXISTS consultarProduto //
CREATE PROCEDURE consultarProduto(IN pId INT)
BEGIN
    SELECT nome AS nomeProduto, tipo AS tipoProduto, preco AS precoProduto
    FROM produtos
    WHERE id = pId;
END //

DROP PROCEDURE IF EXISTS editarProduto //
CREATE PROCEDURE editarProduto(IN pNome VARCHAR(30), IN pTipo ENUM("Aperitivo", "Prato Principal", "Sobremesa", "Bebida"), IN pPreco DECIMAL(5,2), IN pId INT)
BEGIN
    UPDATE produtos
    SET nome = pNome, tipo = pTipo, preco = pPreco
    WHERE id = pId;
END //

DROP PROCEDURE IF EXISTS deletarProduto //
CREATE PROCEDURE deletarProduto(IN pId INT)
BEGIN
    DELETE FROM produtos WHERE id = pId;
END //

DELIMITER ;