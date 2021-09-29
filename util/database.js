import fs from 'node:fs';

console.log(fs);

export const DUUMMY_PRODUCTS = [
  // this product object should have an array of images to display on the detail product page.
  // it should have detail description of the products.
  // it should color for users to choose,
  // it should have quantity for users to choose
  // it should have a button add to cart
  {
    id: 'pr1',
    name: 'Branded Bag One',
    title: 'Product title',
    description: 'Wonderful product1',
    image: 'https://i.imgur.com/b7yABh7m.jpg',
    cost: {
      price: 299,
      currency: 'euro',
    },
  },

  {
    id: 'pr2',
    name: 'Branded Bag Two',
    title: 'Product title',
    description: 'Wonderful product2',
    image: 'https://i.imgur.com/l2rJ9qmm.jpg',
    cost: {
      price: 199,
      currency: 'euro',
    },
  },
  {
    id: 'pr3',
    name: 'Branded Bag Three',
    title: 'Product title',
    description: 'Wonderful product3',
    image: 'https://i.imgur.com/OZyR1U9m.jpg',
    cost: {
      price: 99,
      currency: 'euro',
    },
  },
  {
    id: 'pr4',
    name: 'Branded Bag Four',
    title: 'Product title',
    description: 'Wonderful product4',
    image: 'https://i.imgur.com/oSvYCl9m.jpg',
    cost: {
      price: 170,
      currency: 'euro',
    },
  },
  {
    id: 'pr5',
    name: 'Branded Bag Five',
    title: 'Product title',
    description: 'Wonderful product5',
    image: 'https://i.imgur.com/G3ZWEv4m.jpg',
    cost: {
      price: 139,
      currency: 'euro',
    },
  },
  {
    id: 'pr6',
    name: 'Branded Bag Six',
    title: 'Product title',
    description: 'Wonderful product6',
    image: 'https://i.imgur.com/h5cWFHCm.jpg',
    cost: {
      price: 219,
      currency: 'euro',
    },
  },
];
