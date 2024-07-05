drop database if exists saborcaseiro;
create database saborcaseiro;
use saborcaseiro;

drop table if exists produtos;
create table produtos (
    id int unsigned auto_increment not null,
    nome varchar(30) not null,
    tipo enum("Aperitivo", "Prato Principal", "Sobremesa", "Bebida") not null,
    preco decimal(5, 2) not null check (preco >= 1 and preco <= 999.99),
    primary key (id)
);

drop view if exists viewprodutos;
create view viewprodutos as
select
    id as idproduto,
    nome as nomeproduto,
    tipo as tipoproduto,
    preco as precoproduto
from produtos;

delimiter //

drop procedure if exists proccadastrarproduto //
create procedure proccadastrarproduto (
    in procnome varchar(30),
    in proctipo enum("Aperitivo", "Prato Principal", "Sobremesa", "Bebida"),
    in procpreco decimal(5, 2)
)
begin
    insert into produtos (nome, tipo, preco) values (procnome, proctipo, procpreco);
end //

drop procedure if exists procverificarprodutocadastrado //
create procedure procverificarprodutocadastrado (
    in procnome varchar(30),
    in proctipo enum("Aperitivo", "Prato Principal", "Sobremesa", "Bebida")
)
begin
    select nome as nomeproduto, tipo as tipoproduto
    from produtos
    where nome = procnome and tipo = proctipo;
end //

drop procedure if exists proceditarproduto //
create procedure proceditarproduto (
    in procid int,
    in procnome varchar(30),
    in proctipo enum("Aperitivo", "Prato Principal", "Sobremesa", "Bebida")
)
begin
    update produtos
    set nome = procnome, tipo = proctipo, preco = preco
    where id = procid;
end //

drop procedure if exists procdeletarproduto //
create procedure procdeletarproduto (
    in procid int
)
begin
    delete from produtos where id = procid;
end //

delimiter ;