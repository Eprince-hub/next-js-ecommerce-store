export function itemPrices(products) {
  const itemsPrice = products.reduce(
    (a, product) => a + product.price * product.quantity,
    0,
  );
  return itemsPrice;
}
