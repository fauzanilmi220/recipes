CREATE TABLE users (
    id INT PRIMARY KEY,
    name VARCHAR,
    email VARCHAR
);

INSERT INTO users VALUES (3, 'ojan', 'ojan@gmail.com');

CREATE TABLE categories(
    id_Cat VARCHAR PRIMARY KEY,
    category VARCHAR
);

INSERT INTO categories VALUES('CAT3','Desert');

CREATE TABLE recipes(
    id_Recipe INT PRIMARY KEY,
    title VARCHAR NOT NULL,
    ingredients VARCHAR NOT NULL,
    photo VARCHAR,
    created_at TIMESTAMP NOT NULL,
    id_Cat VARCHAR REFERENCES categories(id_Cat)
);
--  DROP TABLE recipes;
INSERT INTO recipes VALUES(3,'mie','mie goreng','http://localhost','2023-03-06 14:58:23','CAT1');

SELECT rc.id_recipe,rc.title,rc.ingredients,rc.photo,rc.created_at,c.id_cat,c.category FROM recipes as rc
join categories as c on rc.id_cat = c.id_cat ;

 SELECT rc.id_recipe,rc.title,rc.ingredients,ca.category FROM recipes as rc 
 JOIN categories as ca ON rc.id_Cat=ca.id_Cat ;

select * from recipes;
SELECT rc.title,rc.ingredients,rc.created_at, cat.category FROM recipes as rc
JOIN categories as cat on rc.id_cat = cat.id_cat
WHERE rc.title ILIKE 'telur' ORDER BY rc.id_cat ASC;

select * from recipes;