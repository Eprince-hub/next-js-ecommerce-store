// let idArrays = [];

// cartInside.map((cartinit) => {
//   return idArrays.push(cartinit.id);
// });

// extracts the positive value from the cookies in case the value is edited from the browser
export function extractPositiveCookieValues(CookieObject) {
  const filteredShoppingCartCookies = CookieObject.filter((filteredCookie) => {
    return filteredCookie.quantityCount >= 1;
  });

  return filteredShoppingCartCookies;
}

// set the local storage for the quantity
export function setQuantityLocalStorage(itemToSet) {
  if (typeof window !== 'undefined') {
    localStorage.setItem(
      'cartItemsQuantity',

      JSON.stringify(itemToSet.length),
    );
  }
}
