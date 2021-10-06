import fs from 'node:fs';

console.log(fs);

export const DUUMMY_PRODUCTS = [
  // this product object should have an array of images to display on the detail product page.
  // it should have detail description of the products.
  // it should color for users to choose,
  // it should have quantity for users to choose
  // it should have a button add to cart
  {
    id: '1',
    name: 'Branded Bag One',
    title: 'Product title',
    quantity: 0,
    description: `Our full-grain vegetable-tanned leather Duffle bag uses is unlined and has been designed with a pleated top to allow for easier access. Features include solid brass fixtures, including the compartment zip of the internal pocket. The Duffle comes with contrastleather handles pictured and reinforced leather shoulder strap.

Please note variations in leather colour occur naturally between hide to hide. The leather on the bag will naturally have character and slight imperfections on the leather which we embrace.

Please note that all our goods are made-to-order unless stock already exists in our shop in Melbourne. Lead times can be found in our footer below for leather goods and footwear.`,
    image: 'https://i.imgur.com/h5cWFHC.jpg',
    cost: {
      price: 299,
    },

    fitting: `Can work as a carry on bag for short flights (check with your flight provider) or to accompany you during your day-to-day business.
54cm (length) x 34cm (width) x 34cm (height)`,
    colorChoice: { black: 'black', brown: 'brown', red: 'red' },
  },

  {
    id: '2',
    name: 'Branded Bag Two',
    title: 'Product title',
    quantity: 0,
    description: `Our full-grain vegetable-tanned leather Duffle bag uses is unlined and has been designed with a pleated top to allow for easier access. Features include solid brass fixtures, including the compartment zip of the internal pocket. The Duffle comes with contrastleather handles pictured and reinforced leather shoulder strap.

Please note variations in leather colour occur naturally between hide to hide. The leather on the bag will naturally have character and slight imperfections on the leather which we embrace.

Please note that all our goods are made-to-order unless stock already exists in our shop in Melbourne. Lead times can be found in our footer below for leather goods and footwear.`,
    image: 'https://i.imgur.com/h5cWFHC.jpg',
    cost: {
      price: 199,
    },
    fitting: `Can work as a carry on bag for short flights (check with your flight provider) or to accompany you during your day-to-day business.
54cm (length) x 34cm (width) x 34cm (height)`,
    colorChoice: { black: 'black', brown: 'brown', red: 'red' },
  },
  {
    id: '3',
    name: 'Branded Bag Three',
    title: 'Product title',
    quantity: 0,
    description: `Our full-grain vegetable-tanned leather Duffle bag uses is unlined and has been designed with a pleated top to allow for easier access. Features include solid brass fixtures, including the compartment zip of the internal pocket. The Duffle comes with contrastleather handles pictured and reinforced leather shoulder strap.

Please note variations in leather colour occur naturally between hide to hide. The leather on the bag will naturally have character and slight imperfections on the leather which we embrace.

Please note that all our goods are made-to-order unless stock already exists in our shop in Melbourne. Lead times can be found in our footer below for leather goods and footwear.`,
    image: 'https://i.imgur.com/h5cWFHC.jpg',
    cost: {
      price: 99,
    },
    fitting: `Can work as a carry on bag for short flights (check with your flight provider) or to accompany you during your day-to-day business.
54cm (length) x 34cm (width) x 34cm (height)`,
    colorChoice: { black: 'black', brown: 'brown', red: 'red' },
  },
  {
    id: '4',
    name: 'Branded Bag Four',
    title: 'Product title',
    quantity: 0,
    description: `Our full-grain vegetable-tanned leather Duffle bag uses is unlined and has been designed with a pleated top to allow for easier access. Features include solid brass fixtures, including the compartment zip of the internal pocket. The Duffle comes with contrastleather handles pictured and reinforced leather shoulder strap.

Please note variations in leather colour occur naturally between hide to hide. The leather on the bag will naturally have character and slight imperfections on the leather which we embrace.

Please note that all our goods are made-to-order unless stock already exists in our shop in Melbourne. Lead times can be found in our footer below for leather goods and footwear.`,
    image: 'https://i.imgur.com/oSvYCl9m.jpg',
    cost: {
      price: 170,
    },
    fitting: `Can work as a carry on bag for short flights (check with your flight provider) or to accompany you during your day-to-day business.
54cm (length) x 34cm (width) x 34cm (height)`,
    colorChoice: { black: 'black', brown: 'brown', red: 'red' },
  },
  {
    id: '5',
    name: 'Branded Bag Five',
    title: 'Product title',
    quantity: 0,
    description: `Our full-grain vegetable-tanned leather Duffle bag uses is unlined and has been designed with a pleated top to allow for easier access. Features include solid brass fixtures, including the compartment zip of the internal pocket. The Duffle comes with contrastleather handles pictured and reinforced leather shoulder strap.

Please note variations in leather colour occur naturally between hide to hide. The leather on the bag will naturally have character and slight imperfections on the leather which we embrace.

Please note that all our goods are made-to-order unless stock already exists in our shop in Melbourne. Lead times can be found in our footer below for leather goods and footwear.`,
    image: 'https://i.imgur.com/G3ZWEv4m.jpg',
    cost: {
      price: 139,
    },
    fitting: `Can work as a carry on bag for short flights (check with your flight provider) or to accompany you during your day-to-day business.
54cm (length) x 34cm (width) x 34cm (height)`,
    colorChoice: { black: 'black', brown: 'brown', red: 'red' },
  },
  {
    id: '6',
    name: 'Branded Bag Six',
    title: 'Product title',
    quantity: 0,
    description: `Our full-grain vegetable-tanned leather Duffle bag uses is unlined and has been designed with a pleated top to allow for easier access. Features include solid brass fixtures, including the compartment zip of the internal pocket. The Duffle comes with contrastleather handles pictured and reinforced leather shoulder strap.

Please note variations in leather colour occur naturally between hide to hide. The leather on the bag will naturally have character and slight imperfections on the leather which we embrace.

Please note that all our goods are made-to-order unless stock already exists in our shop in Melbourne. Lead times can be found in our footer below for leather goods and footwear.`,
    image: 'https://i.imgur.com/h5cWFHC.jpg',
    cost: {
      price: 219,
    },
    fitting: `Can work as a carry on bag for short flights (check with your flight provider) or to accompany you during your day-to-day business.
54cm (length) x 34cm (width) x 34cm (height)`,
    colorChoice: { black: 'black', brown: 'brown', red: 'red' },
  },
  {
    id: '7',
    name: 'Branded Bag Six',
    title: 'Product title',
    quantity: 0,
    description: `Our full-grain vegetable-tanned leather Duffle bag uses is unlined and has been designed with a pleated top to allow for easier access. Features include solid brass fixtures, including the compartment zip of the internal pocket. The Duffle comes with contrastleather handles pictured and reinforced leather shoulder strap.

Please note variations in leather colour occur naturally between hide to hide. The leather on the bag will naturally have character and slight imperfections on the leather which we embrace.

Please note that all our goods are made-to-order unless stock already exists in our shop in Melbourne. Lead times can be found in our footer below for leather goods and footwear.`,
    image: 'https://i.imgur.com/h5cWFHC.jpg',
    cost: {
      price: 219,
    },
    fitting: `Can work as a carry on bag for short flights (check with your flight provider) or to accompany you during your day-to-day business.
54cm (length) x 34cm (width) x 34cm (height)`,
    colorChoice: { black: 'black', brown: 'brown', red: 'red' },
  },
  {
    id: '8',
    name: 'Branded Bag Six',
    title: 'Product title',
    quantity: 0,
    description: `Our full-grain vegetable-tanned leather Duffle bag uses is unlined and has been designed with a pleated top to allow for easier access. Features include solid brass fixtures, including the compartment zip of the internal pocket. The Duffle comes with contrastleather handles pictured and reinforced leather shoulder strap.

Please note variations in leather colour occur naturally between hide to hide. The leather on the bag will naturally have character and slight imperfections on the leather which we embrace.

Please note that all our goods are made-to-order unless stock already exists in our shop in Melbourne. Lead times can be found in our footer below for leather goods and footwear.`,
    image: 'https://i.imgur.com/h5cWFHC.jpg',
    cost: {
      price: 219,
    },
    fitting: `Can work as a carry on bag for short flights (check with your flight provider) or to accompany you during your day-to-day business.
54cm (length) x 34cm (width) x 34cm (height)`,
    colorChoice: { black: 'black', brown: 'brown', red: 'red' },
  },
  {
    id: '9',
    name: 'Branded Bag Six',
    title: 'Product title',
    quantity: 0,
    description: `Our full-grain vegetable-tanned leather Duffle bag uses is unlined and has been designed with a pleated top to allow for easier access. Features include solid brass fixtures, including the compartment zip of the internal pocket. The Duffle comes with contrastleather handles pictured and reinforced leather shoulder strap.

Please note variations in leather colour occur naturally between hide to hide. The leather on the bag will naturally have character and slight imperfections on the leather which we embrace.

Please note that all our goods are made-to-order unless stock already exists in our shop in Melbourne. Lead times can be found in our footer below for leather goods and footwear.`,
    image: 'https://i.imgur.com/h5cWFHC.jpg',
    cost: {
      price: 219,
    },
    fitting: `Can work as a carry on bag for short flights (check with your flight provider) or to accompany you during your day-to-day business.
54cm (length) x 34cm (width) x 34cm (height)`,
    colorChoice: { black: 'black', brown: 'brown', red: 'red' },
  },
  {
    id: '10',
    name: 'Branded Bag Six',
    title: 'Product title',
    quantity: 0,
    description: `Our full-grain vegetable-tanned leather Duffle bag uses is unlined and has been designed with a pleated top to allow for easier access. Features include solid brass fixtures, including the compartment zip of the internal pocket. The Duffle comes with contrastleather handles pictured and reinforced leather shoulder strap.

Please note variations in leather colour occur naturally between hide to hide. The leather on the bag will naturally have character and slight imperfections on the leather which we embrace.

Please note that all our goods are made-to-order unless stock already exists in our shop in Melbourne. Lead times can be found in our footer below for leather goods and footwear.`,
    image: 'https://i.imgur.com/h5cWFHC.jpg',
    cost: {
      price: 219,
    },
    fitting: `Can work as a carry on bag for short flights (check with your flight provider) or to accompany you during your day-to-day business.
54cm (length) x 34cm (width) x 34cm (height)`,
    colorChoice: { black: 'black', brown: 'brown', red: 'red' },
  },
];
