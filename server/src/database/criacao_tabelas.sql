--A criação das tabelas no formato sql puro se caso precisar

create table points (
	id integer primary key,
	image varchar(255),
	nome varchar(100) not null,
	email varchar(100) not null,
	whatsapp varchar(25) not null,
	latitude decimal(20,0) not null,--Analisar ao certo o formato da latitude
	longitude decimal(20,0) not null,--Analisar ao certo o formato da longitude
	city varchar(100),
	uf char(2)
);

create table items (
	id integer primary key,
	image varchar(255),
	title varchar(100) not null
);

create table point_items (
	id integer primary key,
	point_id integer not null,
	item_id integer not null,
	FOREIGN KEY (point_id) REFERENCES points(id),
	FOREIGN KEY (item_id) REFERENCES items(id)
);