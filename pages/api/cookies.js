import Cookies from 'js-cookie';

// Make a simulation for
export default function handler(req, res) {
  if (req.method === 'PUT') {
    let getACookies;
    try {
      getACookies = JSON.parse(Cookies.get(req.body.cookieKey));
    } catch (err) {
      return err;
    }

    return getACookies;
  }

  if (req.method === 'POST') {
    const setTheCookies = Cookies.set(
      req.body.cookieKey,
      JSON.stringify(req.body.cookieValue),
    );
    return setTheCookies;
  }
  return res.status(200).json({ message: 'Cookie Success!' });
}
