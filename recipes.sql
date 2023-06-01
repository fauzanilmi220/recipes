-- Active: 1677989610185@@149.129.241.190@5432@fauzan01
--USERS
CREATE TABLE users(
    id VARCHAR PRIMARY KEY,
    email VARCHAR NOT NULL,
    password VARCHAR NOT NULL,
    name VARCHAR,
    photo VARCHAR,
    valid INT DEFAULT 0,
    OTP VARCHAR,
    created_at TIMESTAMP,
    deleted_at TIMESTAMP DEFAULT NULL,
    role VARCHAR NOT NULL
);

--RECIPE
CREATE TABLE recipe(
    id SERIAL PRIMARY KEY, 
    name VARCHAR,
    ingredient TEXT,
    photo VARCHAR,
    created_at TIMESTAMP NOT NULL,
    users_id VARCHAR REFERENCES users(id),
    category_id INT REFERENCES category(id),
    deleted_at TIMESTAMP DEFAULT NULL
);

--CATEGORY
CREATE TABLE category(
    id SERIAL PRIMARY KEY, 
    name VARCHAR,
    deleted_at TIMESTAMP DEFAULT NULL
);
