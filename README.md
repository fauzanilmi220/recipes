<h1 align="center">Food Recipe API</h1>
<div align="center">
  <img src='https://user-images.githubusercontent.com/126861853/244944772-c5b36b83-404c-441b-b6ad-fbcd416cd213.png' width="150" height="150" />
</div>

## Table of Contents
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li><a href="#requirements">Requirements</a></li>
    <li><a href="#installation-and-usage-steps">Installation and Usage Steps</a></li>
    <li><a href="#api-route">API Route</a></li>
    <li><a href="#related-project">Related Project</a></li>
  </ol>
</details>

## RECIPES
Backend API for Recipes designed to exchange and discover recipes for cooking any Dishes. It enables us to share our recipes with detailed ingredient and cooking instructions. This API is built with <a href="https://expressjs.com">ExpressJs</a> which is a simple and flexible web application framework that uses <a href="https://nodejs.org/en/about/">NodeJs<a/>.<br>

### BUILT

This app was built with:

- [Node.js](https://nodejs.org/en/)
- [Express.js](https://expressjs.com/)
- [JSON Web Tokens](https://jwt.io/)
- [PostgreSQL](https://www.postgresql.org/)

## Requirements
1. <a href="https://nodejs.org/en/">Node Js</a>
2. <a href="https://www.postman.com/downloads/">Postman</a>
3. Database (<a href="https://www.postgresql.org/download/">PostgreSQL</a>)
4. <a href="https://cloudinary.com">Cloudinary</a>

## Installation Steps
1. Clone this repo to your project directory
```
git clone https://github.com/fauzanilmi220/recipes.git
```
2. Open your project directory 

3. Run command 'npm install' to download the package on this API
```
npm install
```
4. Make Cloudinary account to get cloud storage for recipe photo

5. Turn on your server like Xampp for localhost

6. Create database in your database

7. Make new file in your project directory with name '.env' and copy this code to that file :
```
DB_USER= //Your DB user
DB_HOST=//Your DB host
DB_NAME= //Your DB name
DB_PASS= // Your DB pass
DB_PORT=// Ur DB port

JWT_KEY= //Your JWT key (Random Number)

EMAIL_NAME= //Your Admin Email
EMAIL_PASSWORD= //Your Admin Email Password

PHOTO_NAME= //Your Cloudinary CLoud Name
PHOTO_KEY= //Your Cloudinary API Key
PHOTO_SECRET= //Your Cloudinary API Secret
```
