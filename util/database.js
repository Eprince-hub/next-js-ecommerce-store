// import fs from 'node:fs';
import camelcaseKeys from 'camelcase-keys';
import dotenvSafe from 'dotenv-safe';
import postgres from 'postgres';

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

  cookieObjects.map((cookieObject) => {
    return cookieIdArrays.push(cookieObject.id);
  });

  return cookieIdArrays;
}

// export const myProducts = [
//   // this product object should have an array of images to display on the detail product page.
//   // it should have detail description of the products.
//   // it should color for users to choose,
//   // it should have quantity for users to choose
//   // it should have a button add to cart
//   {
//     id: '1',
//     name: 'Branded Leather Bag1',
//     title: 'Product title',
//     quantity: 0,
//     description: `Our full-grain vegetable-tanned leather Duffle bag uses is unlined and has been designed with a pleated top to allow for easier access. Features include solid brass fixtures, including the compartment zip of the internal pocket. The Duffle comes with contrastleather handles pictured and reinforced leather shoulder strap.

// Please note variations in leather colour occur naturally between hide to hide. The leather on the bag will naturally have character and slight imperfections on the leather which we embrace.

// Please note that all our goods are made-to-order unless stock already exists in our shop in Melbourne. Lead times can be found in our footer below for leather goods and footwear.`,
//     image: 'https://i.imgur.com/h5cWFHC.jpg',

//     price: 299.56,

//     fitting: `Can work as a carry on bag for short flights (check with your flight provider) or to accompany you during your day-to-day business.
// 54cm (length) x 34cm (width) x 34cm (height)`,
//     colorChoice: '',
//   },

//   {
//     id: '2',
//     name: 'Branded Leather Bag2',
//     title: 'Product title',
//     quantity: 0,
//     description: `Our full-grain vegetable-tanned leather Duffle bag uses is unlined and has been designed with a pleated top to allow for easier access. Features include solid brass fixtures, including the compartment zip of the internal pocket. The Duffle comes with contrastleather handles pictured and reinforced leather shoulder strap.

// Please note variations in leather colour occur naturally between hide to hide. The leather on the bag will naturally have character and slight imperfections on the leather which we embrace.

// Please note that all our goods are made-to-order unless stock already exists in our shop in Melbourne. Lead times can be found in our footer below for leather goods and footwear.`,
//     image: 'https://i.imgur.com/h5cWFHC.jpg',

//     price: 199.56,

//     fitting: `Can work as a carry on bag for short flights (check with your flight provider) or to accompany you during your day-to-day business.
// 54cm (length) x 34cm (width) x 34cm (height)`,
//     colorChoice: '',
//   },
//   {
//     id: '3',
//     name: 'Branded Leather Bag3',
//     title: 'Product title',
//     quantity: 0,
//     description: `Our full-grain vegetable-tanned leather Duffle bag uses is unlined and has been designed with a pleated top to allow for easier access. Features include solid brass fixtures, including the compartment zip of the internal pocket. The Duffle comes with contrastleather handles pictured and reinforced leather shoulder strap.

// Please note variations in leather colour occur naturally between hide to hide. The leather on the bag will naturally have character and slight imperfections on the leather which we embrace.

// Please note that all our goods are made-to-order unless stock already exists in our shop in Melbourne. Lead times can be found in our footer below for leather goods and footwear.`,
//     image: 'https://i.imgur.com/h5cWFHC.jpg',

//     price: 99.56,

//     fitting: `Can work as a carry on bag for short flights (check with your flight provider) or to accompany you during your day-to-day business.
// 54cm (length) x 34cm (width) x 34cm (height)`,
//     colorChoice: '',
//   },
//   {
//     id: '4',
//     name: 'Branded Leather Bag4',
//     title: 'Product title',
//     quantity: 0,
//     description: `Our full-grain vegetable-tanned leather Duffle bag uses is unlined and has been designed with a pleated top to allow for easier access. Features include solid brass fixtures, including the compartment zip of the internal pocket. The Duffle comes with contrastleather handles pictured and reinforced leather shoulder strap.

// Please note variations in leather colour occur naturally between hide to hide. The leather on the bag will naturally have character and slight imperfections on the leather which we embrace.

// Please note that all our goods are made-to-order unless stock already exists in our shop in Melbourne. Lead times can be found in our footer below for leather goods and footwear.`,
//     image: 'https://i.imgur.com/oSvYCl9m.jpg',

//     price: 170.56,

//     fitting: `Can work as a carry on bag for short flights (check with your flight provider) or to accompany you during your day-to-day business.
// 54cm (length) x 34cm (width) x 34cm (height)`,
//     colorChoice: '',
//   },
//   {
//     id: '5',
//     name: 'Branded Leather Bag5',
//     title: 'Product title',
//     quantity: 0,
//     description: `Our full-grain vegetable-tanned leather Duffle bag uses is unlined and has been designed with a pleated top to allow for easier access. Features include solid brass fixtures, including the compartment zip of the internal pocket. The Duffle comes with contrastleather handles pictured and reinforced leather shoulder strap.

// Please note variations in leather colour occur naturally between hide to hide. The leather on the bag will naturally have character and slight imperfections on the leather which we embrace.

// Please note that all our goods are made-to-order unless stock already exists in our shop in Melbourne. Lead times can be found in our footer below for leather goods and footwear.`,
//     image: 'https://i.imgur.com/G3ZWEv4m.jpg',

//     price: 139.56,

//     fitting: `Can work as a carry on bag for short flights (check with your flight provider) or to accompany you during your day-to-day business.
// 54cm (length) x 34cm (width) x 34cm (height)`,
//     colorChoice: '',
//   },
//   {
//     id: '6',
//     name: 'Branded Leather Bag6',
//     title: 'Product title',
//     quantity: 0,
//     description: `Our full-grain vegetable-tanned leather Duffle bag uses is unlined and has been designed with a pleated top to allow for easier access. Features include solid brass fixtures, including the compartment zip of the internal pocket. The Duffle comes with contrastleather handles pictured and reinforced leather shoulder strap.

// Please note variations in leather colour occur naturally between hide to hide. The leather on the bag will naturally have character and slight imperfections on the leather which we embrace.

// Please note that all our goods are made-to-order unless stock already exists in our shop in Melbourne. Lead times can be found in our footer below for leather goods and footwear.`,
//     image: 'https://i.imgur.com/h5cWFHC.jpg',

//     price: 219.56,

//     fitting: `Can work as a carry on bag for short flights (check with your flight provider) or to accompany you during your day-to-day business.
// 54cm (length) x 34cm (width) x 34cm (height)`,
//     colorChoice: '',
//   },
//   {
//     id: '7',
//     name: 'Branded Leather Bag7',
//     title: 'Product title',
//     quantity: 0,
//     description: `Our full-grain vegetable-tanned leather Duffle bag uses is unlined and has been designed with a pleated top to allow for easier access. Features include solid brass fixtures, including the compartment zip of the internal pocket. The Duffle comes with contrastleather handles pictured and reinforced leather shoulder strap.

// Please note variations in leather colour occur naturally between hide to hide. The leather on the bag will naturally have character and slight imperfections on the leather which we embrace.

// Please note that all our goods are made-to-order unless stock already exists in our shop in Melbourne. Lead times can be found in our footer below for leather goods and footwear.`,
//     image: 'https://i.imgur.com/h5cWFHC.jpg',

//     price: 219.56,

//     fitting: `Can work as a carry on bag for short flights (check with your flight provider) or to accompany you during your day-to-day business.
// 54cm (length) x 34cm (width) x 34cm (height)`,
//     colorChoice: '',
//   },
//   {
//     id: '8',
//     name: 'Branded Leather Bag8',
//     title: 'Product title',
//     quantity: 0,
//     description: `Our full-grain vegetable-tanned leather Duffle bag uses is unlined and has been designed with a pleated top to allow for easier access. Features include solid brass fixtures, including the compartment zip of the internal pocket. The Duffle comes with contrastleather handles pictured and reinforced leather shoulder strap.

// Please note variations in leather colour occur naturally between hide to hide. The leather on the bag will naturally have character and slight imperfections on the leather which we embrace.

// Please note that all our goods are made-to-order unless stock already exists in our shop in Melbourne. Lead times can be found in our footer below for leather goods and footwear.`,
//     image: 'https://i.imgur.com/h5cWFHC.jpg',

//     price: 219.56,

//     fitting: `Can work as a carry on bag for short flights (check with your flight provider) or to accompany you during your day-to-day business.
// 54cm (length) x 34cm (width) x 34cm (height)`,
//     colorChoice: '',
//   },
//   {
//     id: '9',
//     name: 'Branded Leather Bag9',
//     title: 'Product title',
//     quantity: 0,
//     description: `Our full-grain vegetable-tanned leather Duffle bag uses is unlined and has been designed with a pleated top to allow for easier access. Features include solid brass fixtures, including the compartment zip of the internal pocket. The Duffle comes with contrastleather handles pictured and reinforced leather shoulder strap.

// Please note variations in leather colour occur naturally between hide to hide. The leather on the bag will naturally have character and slight imperfections on the leather which we embrace.

// Please note that all our goods are made-to-order unless stock already exists in our shop in Melbourne. Lead times can be found in our footer below for leather goods and footwear.`,
//     image: 'https://i.imgur.com/h5cWFHC.jpg',

//     price: 219.56,

//     fitting: `Can work as a carry on bag for short flights (check with your flight provider) or to accompany you during your day-to-day business.
// 54cm (length) x 34cm (width) x 34cm (height)`,
//     colorChoice: '',
//   },
//   {
//     id: '10',
//     name: 'Branded Leather Bag10',
//     title: 'This Product is loving',
//     quantity: 0,
//     description: `Our full-grain vegetable-tanned leather Duffle bag uses is unlined and has been designed with a pleated top to allow for easier access. Features include solid brass fixtures, including the compartment zip of the internal pocket. The Duffle comes with contrastleather handles pictured and reinforced leather shoulder strap.

// Please note variations in leather colour occur naturally between hide to hide. The leather on the bag will naturally have character and slight imperfections on the leather which we embrace.

// Please note that all our goods are made-to-order unless stock already exists in our shop in Melbourne. Lead times can be found in our footer below for leather goods and footwear.`,
//     image: 'https://i.imgur.com/h5cWFHC.jpg',

//     price: 219.56,

//     fitting: `Can work as a carry on bag for short flights (check with your flight provider) or to accompany you during your day-to-day business.
// 54cm (length) x 34cm (width) x 34cm (height)`,
//     colorChoice: '',
//   },
// ];

// KEYWORDS
// dscr = description
// ft = fitting
// '' = colorChoice
