export const myProducts = [
  {
    name: 'Branded Leather Bag1',
    title: 'his Product is loving',
    quantity: 0,
    description: `dscr`,
    image: 'https://i.imgur.com/SfoXrDf.png',

    price: 299,

    fitting: `ft`,
    colorChoice: '',
  },

  {
    id: '2',
    name: 'Branded Leather Bag2',
    title: 'his Product is loving',
    quantity: 0,
    description: `dscr`,
    image: 'https://i.imgur.com/7yAhadt.png',

    price: 199,

    fitting: `ft`,
    colorChoice: '',
  },
  {
    id: '3',
    name: 'Branded Leather Bag3',
    title: 'his Product is loving',
    quantity: 0,
    description: `dscr`,
    image: 'https://i.imgur.com/9LC4JGH.png',

    price: 99,

    fitting: `ft`,
    colorChoice: '',
  },
  {
    id: '4',
    name: 'Branded Leather Bag4',
    title: 'his Product is loving',
    quantity: 0,
    description: `dscr`,
    image: 'hhttps://i.imgur.com/8AEg0fK.png',

    price: 170,

    fitting: `ft`,
    colorChoice: '',
  },
  {
    id: '5',
    name: 'Branded Leather Bag5',
    title: 'his Product is loving',
    quantity: 0,
    description: `dscr`,
    image: 'hhttps://i.imgur.com/uecVpza.png',

    price: 139,

    fitting: `ft`,
    colorChoice: '',
  },
  {
    id: '6',
    name: 'Branded Leather Bag6',
    title: 'his Product is loving',
    quantity: 0,
    description: `dscr`,
    image: 'https://i.imgur.com/fOVozwX.png',

    price: 219,

    fitting: `ft`,
    colorChoice: '',
  },
  {
    id: '7',
    name: 'Branded Leather Bag7',
    title: 'his Product is loving',
    quantity: 0,
    description: `dscr`,
    image: 'https://i.imgur.com/O4wEyHF.png',

    price: 254,

    fitting: `ft`,
    colorChoice: '',
  },
  {
    id: '8',
    name: 'Branded Leather Bag8',
    title: 'his Product is loving',
    quantity: 0,
    description: `dscr`,
    image: 'https://i.imgur.com/1KSVLo5.png',

    price: 292,

    fitting: `ft`,
    colorChoice: '',
  },
  {
    id: '9',
    name: 'Branded Leather Bag9',
    title: 'his Product is loving',
    quantity: 0,
    description: `dscr`,
    image: 'https://i.imgur.com/tIiIiHu.png',

    price: 419,

    fitting: `ft`,
    colorChoice: '',
  },
  {
    id: '10',
    name: 'Branded Leather Bag10',
    title: 'This Product is loving',
    quantity: 0,
    description: `dscr`,
    image: 'https://i.imgur.com/lsDvh17.png',

    price: 319,

    fitting: `ft`,
    colorChoice: '',
  },
  {
    id: '11',
    name: 'Branded Leather Bag11',
    title: 'This Product is loving',
    quantity: 0,
    description: `dscr`,
    image: 'https://i.imgur.com/7OiZowP.png',

    price: 319,

    fitting: `ft`,
    colorChoice: '',
  },
  {
    id: '12',
    name: 'Branded Leather Bag12',
    title: 'This Product is loving',
    quantity: 0,
    description: `dscr`,
    image: 'https://i.imgur.com/DmE4HTK.png',

    price: 319,

    fitting: `ft`,
    colorChoice: '',
  },
];

// inserting the products into the table using a loop over the array.
exports.up = async function up(sql) {
  console.log('Inserting Products to the table...');
  for (const product of myProducts) {
    await sql`
			INSERT INTO products
			  (name, title, quantity, description, price, fitting, color_choice, image)
			VALUES
			  (${product.name}, ${product.title}, ${product.quantity}, ${product.description}, ${product.price}, ${product.fitting}, ${product.colorChoice}, ${product.image});

	`;
  }

  // Alternative syntax
  // await sql`
  // INSERT INTO products ${sql(products, 'name', 'title', ETC)}
  // `
};

// Creating the migration to remove the products.
exports.down = async function down(sql) {
  console.log('Deleting Products to the table...');
  for (const product of myProducts) {
    await sql`
			DELETE FROM
			  products
			WHERE
			  name = ${product.name} AND title = ${product.title} AND quantity = ${product.quantity} AND description = ${product.description} AND price = ${product.price} AND fitting = ${product.fitting} AND color-choice = ${product.colorChoice} AND image = ${product.image};

	`;
  }
};

/*

In other to make some correction to the table then we need to create another new migration and alter the data like below

// inserting the products into the table using a loop over the array.
exports.up = async function up(sql) {
  console.log('Inserting Products to the table...');
  for (const product of myProducts) {
    await sql`
	ALTER TABLE products
	RENAME COLUMN name TO newName;

	`;
	}
};

// Creating the migration to remove the products.
exports.down = async function down(sql) {
  console.log('Deleting Products to the table...');
  for (const product of myProducts) {
    await sql`
	ALTER TABLE products
	RENAME COLUMN newName TO name;

	`;
  }
};




*/
