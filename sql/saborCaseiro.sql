drop database if exists saborCaseiro;
create database saborCaseiro;
use saborCaseiro;

drop table if exists produtos;
create table produtos (
    id int unsigned auto_increment not null,
    nome varchar(30) not null,
    tipo enum("Aperitivo", "Prato Principal", "Sobremesa", "Bebida") not null,
    preco decimal(5, 2) not null check (preco >= 1 and preco <= 999.99),
    primary key (id)
);

drop view if exists viewProdutos;
create view viewProdutos as
select
    id as idProduto,
    nome as nomeProduto,
    tipo as tipoProduto,
    preco as precoProduto
from produtos;

delimiter //

drop procedure if exists procCadastrarProduto //
create procedure procCadastrarProduto (
    in procNome varchar(30),
    in procTipo enum("Aperitivo", "Prato Principal", "Sobremesa", "Bebida"),
    in procPreco decimal(5, 2)
)
begin
    insert into produtos (nome, tipo, preco) values (procNome, procTipo, procPreco);
end //

drop procedure if exists procVerificarProdutoCadastrado //
create procedure procVerificarProdutoCadastrado (
    in procNome varchar(30),
    in procTipo enum("Aperitivo", "Prato Principal", "Sobremesa", "Bebida")
)
begin
    select nome as nomeProduto, tipo as tipoProduto
    from produtos
    where nome = procNome and tipo = procTipo;
end //

drop procedure if exists procEditarProduto //
create procedure procEditarProduto (
    in procId int,
    in procNome varchar(30),
    in procTipo enum("Aperitivo", "Prato Principal", "Sobremesa", "Bebida")
)
begin
    update produtos
    set nome = procNome, tipo = procTipo, preco = preco
    where id = procId;
end //

drop procedure if exists procDeletarProduto //
create procedure procDeletarProduto (
    in procId int
)
begin
    delete from produtos where id = procId;
end //

delimiter ;