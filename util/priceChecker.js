export function calculateTotalPrice(arrayOfProductObjects) {
  // make a variable and assign the iteration of the array of the product objects using reduce
  const allPrices = arrayOfProductObjects.reduce((acc, currProduct) => {
    // destructuring the price and quantity property of each product on every iteration
    const { price, quantity } = currProduct;

    // calculating the total price and using parse float to
    const totalPrice = price * quantity;

    return acc + totalPrice;
  }, 0);

  return allPrices.toFixed(2);
}

// process notes for my future self!

/*
  function calculatePrice(arrayOfObjs) {
    const allPrices = arrayOfObjs.reduce((acc, currProduct) => {
      // destructuring the price and quantity property of each product on every iteration
      const { price, quantity } = currProduct;

      // calculating the total price and using parse float to
      const totalPrice = price * quantity;

      return acc + totalPrice;
    }, 0);

    return allPrices.toFixed(2);
  }
 */
