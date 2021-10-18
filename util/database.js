// import fs from 'node:fs';
import camelcaseKeys from 'camelcase-keys';
import dotenvSafe from 'dotenv-safe';
import postgres from 'postgres';
import { extractPositiveCookieValues } from './utilityFunctions';

// // // this line below will Read in the environment variables
// // // in the .env file , making it possible to connect to postgresSQL

dotenvSafe.config();

// the line below connects us to postgresSQL

const sql = postgres();

// Getting all the products from the database!

export async function getProducts() {
  const myProducts = await sql`
  SELECT * FROM products;

  `;

  return myProducts.map((product) => {
    return camelcaseKeys(product);
  });
}

// Getting products to the single product page via product id

export async function getSingleProduct(id) {
  const myProduct = await sql`
  SELECT
    *
  FROM
    products
  WHERE
    id = ${id}
  `;

  return camelcaseKeys(myProduct[0]);
}

// Getting products that would match the product i am getting back from the cookies for my cart items:

export async function getCartProductsFromCookie(cookieIdArray) {
  // When the cart is empty then just return an empty array, This fixed the error when the cart is empty.
  if (cookieIdArray.length === 0) return [];

  const cartProducts = await sql`
  SELECT
    *
  FROM
    products
  WHERE id IN (${cookieIdArray})
  `;
  return cartProducts.map((cartSingleItem) => {
    return camelcaseKeys(cartSingleItem);
  });
}

// Normal function to get the array of the cookie ids
export function getCookieIds(cookieObjects) {
  const cookieIdArrays = [];

  // This function is calling the cookie negative value filter and pass in only positive value.
  const newCookieObjects = extractPositiveCookieValues(cookieObjects);

  newCookieObjects.map((cookieObject) => {
    return cookieIdArrays.push(cookieObject.id);
  });

  return cookieIdArrays;
}

// ################################################
// ################################################
// ################################################
// ################################################

// These are the EXAMPLE OF SQL Functions for the CRUD OPERATIONS

// #### Number One: Deleting a single product
export async function deleteProductById(id) {
  const product = await sql`
  DELETE FROM
    product
  WHERE
    id = ${id}
  RETURNING
    id,
    name,
    title
  `;

  return camelcaseKeys(product[0]);
  // could also write the return : RETURNING *
}

// ##### NUMBER TWO Updating a product info or User

export async function updateProductById(id, { name, title, etc }) {
  const product = await sql`
  UPDATE
    product
  SET
  name = ${name},
  title = ${title},
  every_other_properties = ${etc}
  WHERE
    id = ${id}
  RETURNING
    id,
    name,
    title
  `;

  return camelcaseKeys(product[0]);
}
