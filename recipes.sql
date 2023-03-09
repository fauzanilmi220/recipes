CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR
);
DROP TABLE users;

INSERT INTO users (name) VALUES ('fauzan');

CREATE TABLE category(
    id SERIAL PRIMARY KEY,
    name VARCHAR NOT NULL
);
-- DROP TABLE categories;

INSERT INTO category (name) VALUES('Dessert');

CREATE TABLE recipes(
    id SERIAL,
    title VARCHAR NOT NULL,
    ingredients TEXT NOT NULL,
    photo VARCHAR,
    created_at TIMESTAMP NOT NULL,
    users_id INT REFERENCES users(id),
    category_id INT REFERENCES category(id)
);

ALTER TABLE recipes add deleted_at TIMESTAMP DEFAULT NULL;

INSERT INTO recipes(ingredients,title,photo,users_id,created_at, category_id) VALUES('telur','telur rebus','http://localhost',1,'2023-02-14 14:58:23',2);

SELECT rc.title,rc.ingredients,rc.created_at, cat.id FROM recipes as rc
    JOIN category as cat on rc.category_id = cat.id ;
    --  WHERE recipes.${searchBy} ILIKE '%${search}%' ORDER BY recipes.${sortBy} ${sort};

select * from recipes;


select * from recipes;