// let idArrays = [];

// cartInside.map((cartinit) => {
//   return idArrays.push(cartinit.id);
// });

export function extractPositiveCookieValues(CookieObject) {
  const filteredShoppingCartCookies = CookieObject.filter((filteredCookie) => {
    return filteredCookie.quantityCount >= 1;
  });

  return filteredShoppingCartCookies;
}
