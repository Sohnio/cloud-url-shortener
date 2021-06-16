function getShortenUrl(length = 5) {
  let text = '';
  const possible = 'abcdefghijklmnopqrstuvwxyz1234567890';

  for (let i = 0; i < length; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));

  return text;
}

function isValidURL(url) {
  var pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
  '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
  '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
  '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
  '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
  '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
  return !!pattern.test(url);
  }

  module.exports = { getShortenUrl, isValidURL };