import Cookies from 'js-cookie';

// Function that gets the cookies from the browser
export function getParsedCookie(key) {
  try {
    return JSON.parse(Cookies.get(key));
  } catch (err) {
    return undefined;
  }
}

// function that sets the cookie to the browser
export function setParsedCookie(key, value) {
  Cookies.set(key, JSON.stringify(value));
}
